export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface AiModeState {
  isOpen: boolean;
  messages: ConversationMessage[];
  exchangeCount: number;
  isAuthenticated: boolean;
  isLoading: boolean;
  suggestedPrompts: string[];
}

export interface AiModeActions {
  openPanel: () => void;
  closePanel: () => void;
  sendMessage: (content: string) => void;
  authenticate: () => void;
}

export type AiModeContextValue = AiModeState & AiModeActions;
