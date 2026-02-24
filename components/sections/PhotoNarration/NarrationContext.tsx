import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { PhotoNarration, GapAnalysis, NarrationData, ListingNarrations } from '../../../app/src/data/types';

interface NarrationContextValue {
  isEnabled: boolean;
  currentPhotoIndex: number;
  narrations: PhotoNarration[];
  gapAnalysis: GapAnalysis;
  isLoading: boolean;
  mobileSheetExpanded: boolean;
  toggleNarration: () => void;
  setCurrentPhoto: (index: number) => void;
  setMobileSheetExpanded: (expanded: boolean) => void;
  getCurrentNarration: () => NarrationData | null;
}

const NarrationContext = createContext<NarrationContextValue | null>(null);

const STORAGE_KEY = 'rv-narration-enabled';

interface NarrationProviderProps {
  narrations: ListingNarrations;
  children: ReactNode;
}

export function NarrationProvider({ narrations, children }: NarrationProviderProps) {
  const [isEnabled, setIsEnabled] = useState(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored === null ? true : stored === 'true';
    } catch {
      return true;
    }
  });
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [mobileSheetExpanded, setMobileSheetExpanded] = useState(false);

  const toggleNarration = useCallback(() => {
    setIsEnabled((prev) => {
      const next = !prev;
      try {
        sessionStorage.setItem(STORAGE_KEY, String(next));
      } catch { /* ignore */ }
      return next;
    });
  }, []);

  const setCurrentPhoto = useCallback((index: number) => {
    setCurrentPhotoIndex(index);
    setMobileSheetExpanded(false);
  }, []);

  const getCurrentNarration = useCallback((): NarrationData | null => {
    const photo = narrations.photos[currentPhotoIndex];
    return photo?.narration ?? null;
  }, [narrations.photos, currentPhotoIndex]);

  const value = useMemo<NarrationContextValue>(
    () => ({
      isEnabled,
      currentPhotoIndex,
      narrations: narrations.photos,
      gapAnalysis: narrations.gap_analysis,
      isLoading: false,
      mobileSheetExpanded,
      toggleNarration,
      setCurrentPhoto,
      setMobileSheetExpanded,
      getCurrentNarration,
    }),
    [
      isEnabled,
      currentPhotoIndex,
      narrations.photos,
      narrations.gap_analysis,
      mobileSheetExpanded,
      toggleNarration,
      setCurrentPhoto,
      setMobileSheetExpanded,
      getCurrentNarration,
    ],
  );

  return (
    <NarrationContext.Provider value={value}>{children}</NarrationContext.Provider>
  );
}

export function useNarration(): NarrationContextValue {
  const ctx = useContext(NarrationContext);
  if (!ctx) {
    throw new Error('useNarration must be used within a NarrationProvider');
  }
  return ctx;
}
