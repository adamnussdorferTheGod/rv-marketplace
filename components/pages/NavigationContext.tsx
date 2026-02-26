import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Destination } from '../../app/src/data/lifestyleTypes';

type PageState =
  | { type: 'vdp' }
  | { type: 'destination-detail'; destination: Destination };

interface NavigationContextValue {
  currentPage: PageState;
  navigateToDestination: (dest: Destination) => void;
  navigateBack: () => void;
}

const NavigationContext = createContext<NavigationContextValue>({
  currentPage: { type: 'vdp' },
  navigateToDestination: () => {},
  navigateBack: () => {},
});

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageState>({ type: 'vdp' });

  const navigateToDestination = useCallback((dest: Destination) => {
    setCurrentPage({ type: 'destination-detail', destination: dest });
    window.scrollTo({ top: 0 });
    window.history.pushState({ page: 'destination', destId: dest.id }, '', `#destination/${dest.id}`);
  }, []);

  const navigateBack = useCallback(() => {
    setCurrentPage({ type: 'vdp' });
    window.history.pushState(null, '', window.location.pathname);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage({ type: 'vdp' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <NavigationContext.Provider value={{ currentPage, navigateToDestination, navigateBack }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
