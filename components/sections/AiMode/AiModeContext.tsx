import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { ListingData } from '../../../app/src/data/types';
import type { ConversationMessage, AiModeContextValue } from './types';
import { generateAiResponse } from './mockAiService';
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
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [exchangeCount, setExchangeCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>(() =>
    generateInitialPrompts(listing),
  );

  const openPanel = useCallback(() => setIsOpen(true), []);
  const closePanel = useCallback(() => setIsOpen(false), []);
  const authenticate = useCallback(() => setIsAuthenticated(true), []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (isLoading) return;
      if (exchangeCount >= 2 && !isAuthenticated) return;

      const userMsg: ConversationMessage = {
        id: nextId(),
        role: 'user',
        content,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setSuggestedPrompts([]);
      setIsLoading(true);

      try {
        const response = await generateAiResponse(listing, content, [
          ...messages,
          userMsg,
        ]);

        const assistantMsg: ConversationMessage = {
          id: nextId(),
          role: 'assistant',
          content: response,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
        setExchangeCount((c) => c + 1);
        setSuggestedPrompts(generateFollowUpPrompts(response, listing));
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, exchangeCount, isAuthenticated, listing, messages],
  );

  const value = useMemo<AiModeContextValue>(
    () => ({
      isOpen,
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
