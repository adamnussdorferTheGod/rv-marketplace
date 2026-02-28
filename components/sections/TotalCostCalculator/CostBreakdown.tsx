import type { SalesTaxResult, DmvFeeResult, FeeItem } from '../../../app/src/data/stateTaxTypes';
import type { DealerFeeDefaults } from './dealerFeeDefaults';
import EditableFeeRow from './EditableFeeRow';
import styles from './CostBreakdown.module.css';

interface CostBreakdownProps {
  listingPrice: number;
  taxResult: SalesTaxResult;
  dmvResult: DmvFeeResult;
  dealerFees: DealerFeeDefaults;
  outTheDoorTotal: number;
  stateName: string;
  onDealerFeeChange?: (feeKey: 'docFee' | 'prepFee' | 'adminFee', value: number) => void;
  docFeeCap?: number | null;
}

function formatCurrency(value: number): string {
  return value.toLocaleString('en-US');
}

export default function CostBreakdown({
  listingPrice,
  taxResult,
  dmvResult,
  dealerFees,
  outTheDoorTotal,
  onDealerFeeChange,
  docFeeCap,
}: CostBreakdownProps) {
  return (
    <div className={styles.breakdown}>
      {/* -- Purchase Price -- */}
      <div className={styles.sectionBlock}>
        <h3 className={styles.sectionTitle}>Purchase Price</h3>
        <div className={styles.lineItem}>
          <span>Listing price</span>
          <span>${formatCurrency(listingPrice)}</span>
        </div>
      </div>

      {/* -- Taxes -- */}
      <div className={styles.sectionBlock}>
        <h3 className={styles.sectionTitle}>Taxes</h3>
        {taxResult.stateTax > 0 && (
          <div className={styles.lineItem}>
            <span>State sales tax</span>
            <span>${formatCurrency(taxResult.stateTax)}</span>
          </div>
        )}
        {taxResult.localTax > 0 && (
          <div className={styles.lineItem}>
            <span>Local tax (est.)</span>
            <span>${formatCurrency(taxResult.localTax)}</span>
          </div>
        )}
        {taxResult.totalTax === 0 && (
          <div className={styles.lineItem}>
            <span>No sales tax</span>
            <span>$0</span>
          </div>
        )}
        {taxResult.notes.length > 0 && (
          <p className={styles.lineNote}>{taxResult.notes[0]}</p>
        )}
        <div className={styles.subtotalRow}>
          <span>Tax subtotal</span>
          <span>${formatCurrency(taxResult.totalTax)}</span>
        </div>
      </div>

      {/* -- DMV Fees -- */}
      <div className={styles.sectionBlock}>
        <h3 className={styles.sectionTitle}>DMV Fees</h3>
        <div className={styles.lineItem}>
          <span>Title fee</span>
          <span>${formatCurrency(dmvResult.titleFee)}</span>
        </div>
        <div className={styles.lineItem}>
          <span>Registration fee</span>
          <span>${formatCurrency(dmvResult.registrationFee)}</span>
        </div>
        {dmvResult.plateFee > 0 && (
          <div className={styles.lineItem}>
            <span>Plate/tab fee</span>
            <span>${formatCurrency(dmvResult.plateFee)}</span>
          </div>
        )}
        {dmvResult.emissionsInspectionFee > 0 && (
          <div className={styles.lineItem}>
            <span>Emissions inspection</span>
            <span>${formatCurrency(dmvResult.emissionsInspectionFee)}</span>
          </div>
        )}
        {dmvResult.otherFees.map((fee: FeeItem) => (
          <div key={fee.name} className={styles.lineItem}>
            <span>{fee.name}</span>
            <span>${formatCurrency(fee.amount)}</span>
          </div>
        ))}
        {dmvResult.notes.length > 0 && (
          <p className={styles.lineNote}>{dmvResult.notes[0]}</p>
        )}
        <div className={styles.subtotalRow}>
          <span>DMV subtotal</span>
          <span>${formatCurrency(dmvResult.totalDmvFees)}</span>
        </div>
      </div>

      {/* -- Dealer Fees -- */}
      <div className={styles.sectionBlock}>
        <h3 className={styles.sectionTitle}>Dealer Fees</h3>
        <p className={styles.editHint}>Click any fee to edit</p>
        <EditableFeeRow label="Doc fee" value={dealerFees.docFee} onChange={(v) => onDealerFeeChange?.('docFee', v)} max={docFeeCap} />
        <EditableFeeRow label="Prep fee" value={dealerFees.prepFee} onChange={(v) => onDealerFeeChange?.('prepFee', v)} />
        <EditableFeeRow label="Admin fee" value={dealerFees.adminFee} onChange={(v) => onDealerFeeChange?.('adminFee', v)} />
        <div className={styles.subtotalRow}>
          <span>Dealer fee subtotal</span>
          <span>${formatCurrency(dealerFees.totalDealerFees)}</span>
        </div>
      </div>

      {/* -- Grand Total -- */}
      <div className={styles.grandTotalBlock}>
        <div className={styles.grandTotalRow}>
          <span>Estimated out-the-door total</span>
          <span>${formatCurrency(outTheDoorTotal)}</span>
        </div>
      </div>

      {/* -- Legal Disclaimer -- */}
      <p className={styles.disclaimer}>
        Cost estimates are calculated using publicly available state tax rates and are for informational purposes only. Actual costs may vary based on local tax jurisdictions, dealer-specific fees, and registration requirements. Contact the dealer for a final price quote.
      </p>
    </div>
  );
}
