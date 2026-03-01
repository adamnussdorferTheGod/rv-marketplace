import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  type ReactNode,
} from 'react';
import type { TowVehicle } from '../../../app/src/data/towTypes';

interface TowVehicleContextValue {
  savedVehicle: TowVehicle | null;
  isModalOpen: boolean;
  hasTowPackage: boolean;
  hasWDH: boolean;
  towFilterEnabled: boolean;
  openSetupModal: () => void;
  closeSetupModal: () => void;
  saveVehicle: (vehicle: TowVehicle) => void;
  clearVehicle: () => void;
  setHasTowPackage: (v: boolean) => void;
  setHasWDH: (v: boolean) => void;
  setTowFilterEnabled: (v: boolean) => void;
}

const TowVehicleContext = createContext<TowVehicleContextValue | null>(null);

interface TowVehicleProviderProps {
  children: ReactNode;
}

export function TowVehicleProvider({ children }: TowVehicleProviderProps) {
  const [savedVehicle, setSavedVehicle] = useState<TowVehicle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasTowPackage, setHasTowPackageState] = useState(false);
  const [hasWDH, setHasWDHState] = useState(false);
  const [towFilterEnabled, setTowFilterEnabledState] = useState(false);

  // Body scroll lock when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const openSetupModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeSetupModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const saveVehicle = useCallback((vehicle: TowVehicle) => {
    setSavedVehicle(vehicle);
    setIsModalOpen(false);
  }, []);

  const clearVehicle = useCallback(() => {
    setSavedVehicle(null);
  }, []);

  const setHasTowPackage = useCallback((v: boolean) => {
    setHasTowPackageState(v);
  }, []);

  const setHasWDH = useCallback((v: boolean) => {
    setHasWDHState(v);
  }, []);

  const setTowFilterEnabled = useCallback((v: boolean) => {
    setTowFilterEnabledState(v);
  }, []);

  const value = useMemo<TowVehicleContextValue>(
    () => ({
      savedVehicle,
      isModalOpen,
      hasTowPackage,
      hasWDH,
      towFilterEnabled,
      openSetupModal,
      closeSetupModal,
      saveVehicle,
      clearVehicle,
      setHasTowPackage,
      setHasWDH,
      setTowFilterEnabled,
    }),
    [
      savedVehicle,
      isModalOpen,
      hasTowPackage,
      hasWDH,
      towFilterEnabled,
      openSetupModal,
      closeSetupModal,
      saveVehicle,
      clearVehicle,
      setHasTowPackage,
      setHasWDH,
      setTowFilterEnabled,
    ],
  );

  return (
    <TowVehicleContext.Provider value={value}>
      {children}
    </TowVehicleContext.Provider>
  );
}

export function useTowVehicle(): TowVehicleContextValue {
  const ctx = useContext(TowVehicleContext);
  if (!ctx) {
    throw new Error('useTowVehicle must be used within a TowVehicleProvider');
  }
  return ctx;
}
