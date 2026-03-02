import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface PrequalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const PrequalContext = createContext<PrequalContextValue>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function PrequalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return (
    <PrequalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </PrequalContext.Provider>
  );
}

export function usePrequal() {
  return useContext(PrequalContext);
}
