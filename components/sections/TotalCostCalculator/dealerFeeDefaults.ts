// ─── Dealer fee defaults by RV type ──────────────────────────────────
//
// Industry-average dealer fees for different RV categories.
// Doc fee is clamped to the state-specific cap when applicable.

export interface DealerFeeDefaults {
  docFee: number;
  prepFee: number;
  adminFee: number;
  totalDealerFees: number;
}

interface FeeTable {
  docFee: number;
  prepFee: number;
  adminFee: number;
}

const FEE_BY_RV_TYPE: Record<string, FeeTable> = {
  'travel-trailer': { docFee: 499, prepFee: 795, adminFee: 199 },
  'fifth-wheel':    { docFee: 599, prepFee: 995, adminFee: 199 },
  'class-a':        { docFee: 799, prepFee: 1495, adminFee: 299 },
  'class-b':        { docFee: 599, prepFee: 995, adminFee: 199 },
  'class-c':        { docFee: 699, prepFee: 1195, adminFee: 199 },
  'pop-up':         { docFee: 399, prepFee: 495, adminFee: 149 },
  'truck-camper':   { docFee: 399, prepFee: 495, adminFee: 149 },
};

const DEFAULT_FEES: FeeTable = { docFee: 499, prepFee: 795, adminFee: 199 };

/**
 * Get dealer fee defaults for a given RV type, applying state doc fee cap.
 *
 * @param rvType - RV category key (e.g. 'travel-trailer', 'class-a')
 * @param stateDocFeeCap - State-mandated doc fee cap, or null if uncapped
 */
export function getDealerFeeDefaults(
  rvType: string,
  stateDocFeeCap: number | null,
): DealerFeeDefaults {
  const base = FEE_BY_RV_TYPE[rvType] ?? DEFAULT_FEES;

  const docFee = stateDocFeeCap != null
    ? Math.min(base.docFee, stateDocFeeCap)
    : base.docFee;

  const { prepFee, adminFee } = base;
  const totalDealerFees = docFee + prepFee + adminFee;

  return { docFee, prepFee, adminFee, totalDealerFees };
}
