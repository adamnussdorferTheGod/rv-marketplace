export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export type PanelMode = 'default' | 'fitcheck' | 'plan';

export interface AiModeState {
  isOpen: boolean;
  panelMode: PanelMode;
  messages: ConversationMessage[];
  exchangeCount: number;
  isAuthenticated: boolean;
  isLoading: boolean;
  suggestedPrompts: string[];
}

export interface AiModeActions {
  openPanel: (mode?: PanelMode) => void;
  closePanel: () => void;
  sendMessage: (content: string) => void;
  authenticate: () => void;
}

export type AiModeContextValue = AiModeState & AiModeActions;
