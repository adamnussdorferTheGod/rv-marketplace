// Walk-In Deal Kit types

export type DealScore = 'great' | 'good' | 'fair' | 'poor';
export type RiskLevel = 'red' | 'yellow' | 'green';
export type ChecklistCategory = 'exterior' | 'interior' | 'mechanical' | 'systems' | 'documents';

export interface DealScoreData {
  score: number; // 0-100
  label: DealScore;
  summary: string;
  marketComparison: {
    label: string;
    value: string;
  }[];
}

export interface OfferTier {
  label: string;
  amount: number;
  description: string;
}

export interface OfferRangeData {
  opening: OfferTier;
  target: OfferTier;
  walkAway: OfferTier;
  listPrice: number;
  rationale: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  detail: string;
  category: ChecklistCategory;
  isModelSpecific: boolean;
}

export interface QuestionCard {
  id: string;
  question: string;
  rationale: string;
}

export interface NegotiationPoint {
  id: string;
  point: string;
  context: string;
}

export interface CostItem {
  label: string;
  annualCost: string;
  note?: string;
}

export interface CostOfOwnershipData {
  items: CostItem[];
  depreciationNote: string;
  totalAnnual: string;
}

export interface RedFlagCard {
  id: string;
  title: string;
  detail: string;
  level: RiskLevel;
}

export interface DealKitData {
  vehicleTitle: string;
  generatedAt: string;
  dealScore: DealScoreData;
  offerRange: OfferRangeData;
  inspectionChecklist: ChecklistItem[];
  questions: QuestionCard[];
  negotiationPoints: NegotiationPoint[];
  costOfOwnership: CostOfOwnershipData;
  redFlags: RedFlagCard[];
}

export interface DealKitSection {
  id: string;
  label: string;
  icon: string;
}

export const DEAL_KIT_SECTIONS: DealKitSection[] = [
  { id: 'deal-score', label: 'Deal Score', icon: 'gauge' },
  { id: 'offer-range', label: 'Offer Range', icon: 'tag' },
  { id: 'inspection', label: 'Inspection', icon: 'clipboard' },
  { id: 'questions', label: 'Questions', icon: 'help_outline' },
  { id: 'negotiation', label: 'Negotiation', icon: 'handshake' },
  { id: 'cost', label: 'Cost of Ownership', icon: 'chart' },
  { id: 'red-flags', label: 'Red Flags', icon: 'flag' },
];
