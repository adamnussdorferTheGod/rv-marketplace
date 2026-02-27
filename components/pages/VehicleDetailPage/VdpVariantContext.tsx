import { createContext, useContext, type ReactNode } from 'react';

type VdpVariant = 'option-2';

interface VdpVariantContextValue {
  variant: VdpVariant;
}

const VdpVariantContext = createContext<VdpVariantContextValue>({
  variant: 'option-2',
});

export function VdpVariantProvider({ children }: { children: ReactNode }) {
  return (
    <VdpVariantContext.Provider value={{ variant: 'option-2' }}>
      {children}
    </VdpVariantContext.Provider>
  );
}

export function useVdpVariant() {
  return useContext(VdpVariantContext);
}
