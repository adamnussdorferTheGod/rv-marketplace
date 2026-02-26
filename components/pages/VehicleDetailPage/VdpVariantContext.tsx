import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

type VdpVariant = 'option-1' | 'option-2';

interface VdpVariantContextValue {
  variant: VdpVariant;
  setVariant: (v: VdpVariant) => void;
}

const VdpVariantContext = createContext<VdpVariantContextValue>({
  variant: 'option-1',
  setVariant: () => {},
});

function parseVariant(value: string | null): VdpVariant {
  return value === 'option-2' ? 'option-2' : 'option-1';
}

export function VdpVariantProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [variant, setVariantState] = useState<VdpVariant>(() => parseVariant(searchParams.get('variant')));

  useEffect(() => {
    setVariantState(parseVariant(searchParams.get('variant')));
  }, [searchParams]);

  function setVariant(v: VdpVariant) {
    setVariantState(v);
    setSearchParams((prev) => {
      if (v === 'option-1') {
        prev.delete('variant');
      } else {
        prev.set('variant', v);
      }
      return prev;
    }, { replace: true });
  }

  return (
    <VdpVariantContext.Provider value={{ variant, setVariant }}>
      {children}
    </VdpVariantContext.Provider>
  );
}

export function useVdpVariant() {
  return useContext(VdpVariantContext);
}
