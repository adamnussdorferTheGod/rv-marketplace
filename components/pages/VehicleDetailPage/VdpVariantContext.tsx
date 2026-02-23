import { createContext, useContext, useState, type ReactNode } from 'react';

type VdpVariant = 'option-1' | 'option-2';

interface VdpVariantContextValue {
  variant: VdpVariant;
  setVariant: (v: VdpVariant) => void;
}

const VdpVariantContext = createContext<VdpVariantContextValue>({
  variant: 'option-1',
  setVariant: () => {},
});

export function VdpVariantProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<VdpVariant>('option-1');
  return (
    <VdpVariantContext.Provider value={{ variant, setVariant }}>
      {children}
    </VdpVariantContext.Provider>
  );
}

export function useVdpVariant() {
  return useContext(VdpVariantContext);
}
