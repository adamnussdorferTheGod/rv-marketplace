import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import type { ListingData } from '../../../app/src/data/types';
import type { ConversationMessage, AiModeContextValue, PanelMode } from './types';
import { generateAiResponse } from './mockAiService';
import { isClaudeAvailable, generateClaudeResponse } from './claudeService';
import { generateInitialPrompts, generateFollowUpPrompts } from './generatePrompts';

const AiModeContext = createContext<AiModeContextValue | null>(null);

interface AiModeProviderProps {
  listing: ListingData;
  children: ReactNode;
}

let messageIdCounter = 0;
function nextId(): string {
  return `msg-${++messageIdCounter}-${Date.now()}`;
}

export function AiModeProvider({ listing, children }: AiModeProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [panelMode, setPanelModeState] = useState<PanelMode>('default');
  const panelModeRef = useRef<PanelMode>(panelMode);
  const setPanelMode = useCallback((mode: PanelMode) => {
    panelModeRef.current = mode;
    setPanelModeState(mode);
  }, []);
  const [threadMap, setThreadMap] = useState<Record<PanelMode, {
    messages: ConversationMessage[];
    exchangeCount: number;
    suggestedPrompts: string[];
  }>>({
    default: { messages: [], exchangeCount: 0, suggestedPrompts: generateInitialPrompts(listing) },
    fitcheck: { messages: [], exchangeCount: 0, suggestedPrompts: generateInitialPrompts(listing) },
    plan: { messages: [], exchangeCount: 0, suggestedPrompts: generateInitialPrompts(listing) },
  });
  const threadMapRef = useRef(threadMap);
  threadMapRef.current = threadMap;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const thread = threadMap[panelMode];
  const messages = thread.messages;
  const exchangeCount = thread.exchangeCount;
  const suggestedPrompts = thread.suggestedPrompts;

  const openPanel = useCallback((mode?: PanelMode) => {
    if (mode && typeof mode === 'string') setPanelMode(mode);
    setIsOpen(true);
  }, [setPanelMode]);
  const closePanel = useCallback(() => setIsOpen(false), []);
  const authenticate = useCallback(() => setIsAuthenticated(true), []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (isLoading) return;
      const mode = panelModeRef.current;
      const currentThread = threadMapRef.current[mode];
      if (currentThread.exchangeCount >= 2 && !isAuthenticated) return;

      const userMsg: ConversationMessage = {
        id: nextId(),
        role: 'user',
        content,
        timestamp: Date.now(),
      };

      setThreadMap((prev) => ({
        ...prev,
        [mode]: { ...prev[mode], messages: [...prev[mode].messages, userMsg], suggestedPrompts: [] },
      }));
      setIsLoading(true);

      try {
        const history = [...currentThread.messages, userMsg];
        let response: string;
        if (isClaudeAvailable()) {
          try {
            response = await generateClaudeResponse(listing, content, history, mode);
            console.log('[AiMode] Claude response received');
          } catch (err) {
            console.warn('[AiMode] Claude failed, falling back to mock:', err);
            response = await generateAiResponse(listing, content, history);
          }
        } else {
          console.log('[AiMode] No API key, using mock service');
          response = await generateAiResponse(listing, content, history);
        }

        const assistantMsg: ConversationMessage = {
          id: nextId(),
          role: 'assistant',
          content: response,
          timestamp: Date.now(),
        };

        setThreadMap((prev) => ({
          ...prev,
          [mode]: {
            ...prev[mode],
            messages: [...prev[mode].messages, assistantMsg],
            exchangeCount: prev[mode].exchangeCount + 1,
            suggestedPrompts: generateFollowUpPrompts(response, listing, mode),
          },
        }));
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, isAuthenticated, listing],
  );

  const value = useMemo<AiModeContextValue>(
    () => ({
      isOpen,
      panelMode,
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
