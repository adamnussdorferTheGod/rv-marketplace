import type { AssistantCategory, SearchContext } from './srpAssistantService';

// ---- Chip context ----

export interface ChipContext {
  state: 'initial' | 'followUp' | 'terminal';
  lastCategory: AssistantCategory | null;
  turnCount: number;
}

export const INITIAL_CHIP_CONTEXT: ChipContext = {
  state: 'initial',
  lastCategory: null,
  turnCount: 0,
};

// ---- Chip transitions ----

const CHIP_TRANSITIONS: Record<AssistantCategory, {
  followUp: string[];
  terminal: string[];
}> = {
  'market-overview': {
    followUp: ['How do prices compare by type?', 'Show me the best deals', 'What about price trends?', 'Which makes are most popular?'],
    terminal: ['Any other insights?', 'Tell me more about this market'],
  },
  'price-analysis': {
    followUp: ['Compare prices by year', 'Show best-value listings', 'How does this compare to other markets?', 'What drives these prices?'],
    terminal: ['What else should I know?', 'Tell me about the market overall'],
  },
  'type-comparison': {
    followUp: ['Which type holds value best?', 'Show deals in each category', 'Compare prices for these types', 'What about towing requirements?'],
    terminal: ['Any other comparisons?', 'Show me the overall market'],
  },
  'deal-quality': {
    followUp: ['What makes these deals stand out?', 'Are prices trending in my favor?', 'Show me similar listings', 'Compare deals by type'],
    terminal: ['What else is worth knowing?', 'Tell me about this market'],
  },
  recommendation: {
    followUp: ['How do these compare on price?', 'Show me the best deals', 'What about newer models?', 'Compare top makes'],
    terminal: ['Anything else I should know?', 'Give me a market overview'],
  },
};

// ---- Chip generation ----

export function generateSrpChips(
  searchContext: SearchContext,
  chipContext: ChipContext,
): string[] {
  // Terminal state
  if (chipContext.state === 'terminal' && chipContext.lastCategory !== null) {
    const transitions = CHIP_TRANSITIONS[chipContext.lastCategory];
    const chips = [...transitions.terminal, 'Start a new question'];
    return chips.slice(0, 4);
  }

  // Follow-up state
  if (chipContext.state === 'followUp' && chipContext.lastCategory !== null) {
    const transitions = CHIP_TRANSITIONS[chipContext.lastCategory];
    return transitions.followUp.slice(0, 5);
  }

  // Initial state (default)
  const chips: string[] = ["What's the market like?"];

  if (searchContext.dealBreakdown.great > 0) {
    chips.push(`Show me the ${searchContext.dealBreakdown.great} great deals`);
  }

  if (searchContext.activeRvType) {
    chips.push(`How do ${searchContext.activeRvType} prices compare?`);
  } else {
    chips.push('Compare prices by type');
  }

  chips.push('Are prices trending up or down?');

  if (searchContext.topMakes.length > 0) {
    chips.push(`Why is ${searchContext.topMakes[0]} popular here?`);
  }

  return chips.slice(0, 5);
}

// ---- State machine ----

export function advanceChipContext(
  current: ChipContext,
  category: AssistantCategory,
): ChipContext {
  return {
    state: current.turnCount >= 3 ? 'terminal' : 'followUp',
    lastCategory: category,
    turnCount: current.turnCount + 1,
  };
}
