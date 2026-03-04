import type { SRPListing } from '../../../app/src/data/srpTypes';

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  listings?: SRPListing[];
}

export type PanelMode = 'default' | 'fitcheck' | 'plan' | 'srp-assistant';

export interface AiModeState {
  isOpen: boolean;
  panelMode: PanelMode;
  discoveryMode: boolean;
  messages: ConversationMessage[];
  exchangeCount: number;
  isAuthenticated: boolean;
  isLoading: boolean;
  suggestedPrompts: string[];
}

export interface AiModeActions {
  openPanel: (mode?: PanelMode, discovery?: boolean) => void;
  closePanel: () => void;
  sendMessage: (content: string) => void;
  authenticate: () => void;
}

export type AiModeContextValue = AiModeState & AiModeActions;
