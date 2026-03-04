import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import type { ListingData } from '../../../app/src/data/types';
import type { FilterCriteria, SRPListing } from '../../../app/src/data/srpTypes';
import type { TowVehicle } from '../../../app/src/data/towTypes';
import type { ConversationMessage, AiModeContextValue, PanelMode } from './types';
import { generateAiResponse } from './mockAiService';
import { isClaudeAvailable, generateClaudeResponse } from './claudeService';
import { generateInitialPrompts, generateFollowUpPrompts } from './generatePrompts';
import type { SearchContext } from '../../../app/src/data/srpAssistantService';
import { mockSrpAssistantService, classifyQuery } from '../../../app/src/data/srpAssistantService';
import { generateSrpChips, advanceChipHistory, mapAssistantCategoryToChipCategory, INITIAL_CHIP_HISTORY } from '../../../app/src/data/srpAssistantChips';
import type { ChipHistory, ChipEngineInput } from '../../../app/src/data/srpAssistantChips';

const AiModeContext = createContext<AiModeContextValue | null>(null);

interface AiModeProviderProps {
  listing?: ListingData;
  searchContext?: SearchContext;
  filters?: FilterCriteria;
  towVehicle?: TowVehicle | null;
  listings?: SRPListing[];
  children: ReactNode;
}

let messageIdCounter = 0;
function nextId(): string {
  return `msg-${++messageIdCounter}-${Date.now()}`;
}

export function AiModeProvider({ listing, searchContext, filters, towVehicle, listings, children }: AiModeProviderProps) {
  // Read from URL hash so state survives component remounts (AnimatePresence/StrictMode)
  const [isOpen, setIsOpen] = useState(() => {
    const h = typeof window !== 'undefined' ? window.location.hash : '';
    return h.startsWith('#ai=') || h === '#aiOpen';
  });
  const [discoveryMode, setDiscoveryMode] = useState(() => {
    const h = typeof window !== 'undefined' ? window.location.hash : '';
    return h.startsWith('#ai=') || h === '#aiOpen';
  });
  const [panelMode, setPanelModeState] = useState<PanelMode>(() => {
    const h = typeof window !== 'undefined' ? window.location.hash : '';
    return (h.startsWith('#ai=') || h === '#aiOpen') ? 'srp-assistant' : 'default';
  });
  const panelModeRef = useRef<PanelMode>(panelMode);
  const setPanelMode = useCallback((mode: PanelMode) => {
    panelModeRef.current = mode;
    setPanelModeState(mode);
  }, []);
  const searchContextRef = useRef(searchContext);
  searchContextRef.current = searchContext;
  const filtersRef = useRef(filters);
  filtersRef.current = filters;
  const towVehicleRef = useRef(towVehicle);
  towVehicleRef.current = towVehicle;
  const listingsRef = useRef(listings);
  listingsRef.current = listings;
  const [srpChipHistory, setSrpChipHistory] = useState<ChipHistory>(INITIAL_CHIP_HISTORY);
  const srpChipHistoryRef = useRef(srpChipHistory);
  srpChipHistoryRef.current = srpChipHistory;
  const [threadMap, setThreadMap] = useState<Record<PanelMode, {
    messages: ConversationMessage[];
    exchangeCount: number;
    suggestedPrompts: string[];
  }>>(() => {
    // Pre-populate srp-assistant thread with user message from hash
    const h = typeof window !== 'undefined' ? window.location.hash : '';
    const m = h.match(/^#ai=(.+)$/);
    const chipMsg: ConversationMessage[] = m ? [{
      id: `msg-chip-${Date.now()}`,
      role: 'user',
      content: decodeURIComponent(m[1]),
      timestamp: Date.now(),
    }] : [];
    return {
      default: { messages: [], exchangeCount: 0, suggestedPrompts: generateInitialPrompts(listing) },
      fitcheck: { messages: [], exchangeCount: 0, suggestedPrompts: generateInitialPrompts(listing) },
      plan: { messages: [], exchangeCount: 0, suggestedPrompts: generateInitialPrompts(listing) },
      'srp-assistant': { messages: chipMsg, exchangeCount: 0, suggestedPrompts: [] },
    };
  });
  const threadMapRef = useRef(threadMap);
  threadMapRef.current = threadMap;

  // Build ChipEngineInput for srp-assistant chips
  const buildChipInput = useCallback((): ChipEngineInput | null => {
    const sc = searchContextRef.current;
    if (!sc) return null;
    return {
      search: sc,
      filters: filtersRef.current ?? {
        keyword: '', rvTypes: [], makes: [], models: [],
        priceMin: null, priceMax: null, yearMin: null, yearMax: null,
        condition: 'all', zipCode: '', radiusMiles: 150,
        lengthMin: null, lengthMax: null, floorPlans: [],
        sleepingCapacity: null, fuelTypes: [], grossVehicleWeightMax: null,
      },
      towVehicle: towVehicleRef.current ?? null,
      listings: listingsRef.current ?? [],
    };
  }, []);

  // Update srp-assistant initial prompts when searchContext arrives
  useEffect(() => {
    if (!searchContext) return;
    const chipInput = buildChipInput();
    if (!chipInput) return;
    setThreadMap((prev) => {
      const srpThread = prev['srp-assistant'];
      if (srpThread.messages.length > 0) return prev;
      return {
        ...prev,
        'srp-assistant': {
          ...srpThread,
          suggestedPrompts: generateSrpChips(chipInput, INITIAL_CHIP_HISTORY),
        },
      };
    });
  }, [searchContext, filters, towVehicle, listings, buildChipInput]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const thread = threadMap[panelMode];
  const messages = thread.messages;
  const exchangeCount = thread.exchangeCount;
  const suggestedPrompts = thread.suggestedPrompts;

  const openPanel = useCallback((mode?: PanelMode, discovery?: boolean) => {
    if (mode && typeof mode === 'string') setPanelMode(mode);
    setDiscoveryMode(!!discovery);
    setIsOpen(true);
  }, [setPanelMode]);
  const closePanel = useCallback(() => {
    setIsOpen(false);
    setDiscoveryMode(false);
  }, []);
  const authenticate = useCallback(() => setIsAuthenticated(true), []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (isLoading) return;
      const mode = panelModeRef.current;
      const currentThread = threadMapRef.current[mode];
      if (currentThread.exchangeCount >= 2 && !isAuthenticated) return;

      // Skip adding user message if it's already the last message (pre-populated from hash)
      const lastMsg = currentThread.messages[currentThread.messages.length - 1];
      const alreadyAdded = lastMsg?.role === 'user' && lastMsg.content === content;

      const userMsg: ConversationMessage = alreadyAdded ? lastMsg : {
        id: nextId(),
        role: 'user',
        content,
        timestamp: Date.now(),
      };

      if (!alreadyAdded) {
        setThreadMap((prev) => ({
          ...prev,
          [mode]: { ...prev[mode], messages: [...prev[mode].messages, userMsg], suggestedPrompts: [] },
        }));
      }
      setIsLoading(true);

      try {
        const history = alreadyAdded ? currentThread.messages : [...currentThread.messages, userMsg];
        let response: string;
        let followUpPrompts: string[];
        let recommendedListings: import('../../../app/src/data/srpTypes').SRPListing[] | undefined;

        if (mode === 'srp-assistant' && searchContextRef.current) {
          const srpResponse = await mockSrpAssistantService(content, searchContextRef.current, listingsRef.current ?? []);
          response = srpResponse.content;
          if (srpResponse.type === 'text' && srpResponse.recommendedListings) {
            recommendedListings = srpResponse.recommendedListings;
          }
          const assistantCategory = classifyQuery(content);
          const chipCategory = mapAssistantCategoryToChipCategory(assistantCategory);
          const newHistory = advanceChipHistory(srpChipHistoryRef.current, chipCategory);
          setSrpChipHistory(newHistory);
          srpChipHistoryRef.current = newHistory;
          const chipInput = buildChipInput();
          followUpPrompts = chipInput ? generateSrpChips(chipInput, newHistory) : [];
        } else if (isClaudeAvailable()) {
          try {
            response = await generateClaudeResponse(listing, content, history, mode);
            console.log('[AiMode] Claude response received');
          } catch (err) {
            console.warn('[AiMode] Claude failed, falling back to mock:', err);
            response = await generateAiResponse(listing, content, history);
          }
          followUpPrompts = generateFollowUpPrompts(response, listing, mode);
        } else {
          console.log('[AiMode] No API key, using mock service');
          response = await generateAiResponse(listing, content, history);
          followUpPrompts = generateFollowUpPrompts(response, listing, mode);
        }

        const assistantMsg: ConversationMessage = {
          id: nextId(),
          role: 'assistant',
          content: response,
          timestamp: Date.now(),
          ...(recommendedListings && recommendedListings.length > 0 && { listings: recommendedListings }),
        };

        setThreadMap((prev) => ({
          ...prev,
          [mode]: {
            ...prev[mode],
            messages: [...prev[mode].messages, assistantMsg],
            exchangeCount: prev[mode].exchangeCount + 1,
            suggestedPrompts: followUpPrompts,
          },
        }));
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, isAuthenticated, listing, buildChipInput],
  );

  const value = useMemo<AiModeContextValue>(
    () => ({
      isOpen,
      panelMode,
      discoveryMode,
      messages,
      exchangeCount,
      isAuthenticated,
      isLoading,
      suggestedPrompts,
      openPanel,
      closePanel,
      sendMessage,
      authenticate,
    }),
    [
      isOpen,
      panelMode,
      discoveryMode,
      messages,
      exchangeCount,
      isAuthenticated,
      isLoading,
      suggestedPrompts,
      openPanel,
      closePanel,
      sendMessage,
      authenticate,
    ],
  );

  return (
    <AiModeContext.Provider value={value}>{children}</AiModeContext.Provider>
  );
}

export function useAiMode(): AiModeContextValue {
  const ctx = useContext(AiModeContext);
  if (!ctx) {
    throw new Error('useAiMode must be used within an AiModeProvider');
  }
  return ctx;
}
