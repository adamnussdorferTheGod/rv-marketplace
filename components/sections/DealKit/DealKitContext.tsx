import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  type ReactNode,
} from 'react';
import type { DealKitData } from '../../../app/src/data/dealKitTypes';
import { sampleDealKit } from '../../../app/src/data/sampleDealKit';

type DealKitStep =
  | 'idle'
  | 'auth-gate'
  | 'loading'
  | 'ready';

interface DealKitContextValue {
  step: DealKitStep;
  isOverlayOpen: boolean;
  isAuthenticated: boolean;
  data: DealKitData | null;
  loadingStep: number;
  activeSection: string;
  checkedItems: Set<string>;
  openDealKit: () => void;
  authenticate: () => void;
  closeDealKit: () => void;
  setActiveSection: (id: string) => void;
  toggleChecklistItem: (id: string) => void;
}

const DealKitContext = createContext<DealKitContextValue | null>(null);

const LOADING_STEPS = [
  'Analyzing market data...',
  'Comparing similar listings...',
  'Calculating offer range...',
  'Building inspection checklist...',
  'Generating negotiation points...',
  'Estimating ownership costs...',
  'Finalizing your deal kit...',
];

const LOADING_STEP_DURATION = 500; // ms per step

interface DealKitProviderProps {
  children: ReactNode;
}

export function DealKitProvider({ children }: DealKitProviderProps) {
  const [step, setStep] = useState<DealKitStep>('idle');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState<DealKitData | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [activeSection, setActiveSection] = useState('deal-score');
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  // Body scroll lock
  const isOverlayOpen = step === 'loading' || step === 'ready';
  useEffect(() => {
    if (isOverlayOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOverlayOpen]);

  // Loading animation sequence
  useEffect(() => {
    if (step !== 'loading') return;

    if (loadingStep >= LOADING_STEPS.length) {
      setData(sampleDealKit);
      setStep('ready');
      return;
    }

    const timer = setTimeout(() => {
      setLoadingStep((s) => s + 1);
    }, LOADING_STEP_DURATION);

    return () => clearTimeout(timer);
  }, [step, loadingStep]);

  const openDealKit = useCallback(() => {
    if (isAuthenticated) {
      setLoadingStep(0);
      setStep('loading');
    } else {
      setStep('auth-gate');
    }
  }, [isAuthenticated]);

  const authenticate = useCallback(() => {
    setIsAuthenticated(true);
    setLoadingStep(0);
    setStep('loading');
  }, []);

  const closeDealKit = useCallback(() => {
    setStep('idle');
  }, []);

  const toggleChecklistItem = useCallback((id: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const value = useMemo<DealKitContextValue>(
    () => ({
      step,
      isOverlayOpen,
      isAuthenticated,
      data,
      loadingStep,
      activeSection,
      checkedItems,
      openDealKit,
      authenticate,
      closeDealKit,
      setActiveSection,
      toggleChecklistItem,
    }),
    [
      step,
      isOverlayOpen,
      isAuthenticated,
      data,
      loadingStep,
      activeSection,
      checkedItems,
      openDealKit,
      authenticate,
      closeDealKit,
      toggleChecklistItem,
    ],
  );

  return (
    <DealKitContext.Provider value={value}>{children}</DealKitContext.Provider>
  );
}

export { LOADING_STEPS };

export function useDealKit(): DealKitContextValue {
  const ctx = useContext(DealKitContext);
  if (!ctx) {
    throw new Error('useDealKit must be used within a DealKitProvider');
  }
  return ctx;
}
