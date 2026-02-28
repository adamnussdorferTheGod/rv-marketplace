import { useState, useEffect } from 'react';
import Icon from '@components/ui/Icon/Icon';
import type { SalesTaxResult, DmvFeeResult, FeeItem } from '../../../app/src/data/stateTaxTypes';
import type { DealerFeeDefaults } from './dealerFeeDefaults';
import EditableFeeRow from './EditableFeeRow';
import TradeInSection from './TradeInSection';
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
  tradeInEnabled: boolean;
  onTradeInToggle: (enabled: boolean) => void;
  onTradeInValueChange: (value: number) => void;
  tradeInValue: number;
  tradeInCredit: boolean;
  tradeInCreditNote: string | null;
  taxSavings: number;
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
  stateName,
  onDealerFeeChange,
  docFeeCap,
  tradeInEnabled,
  onTradeInToggle,
  onTradeInValueChange,
  tradeInValue,
  tradeInCredit,
  tradeInCreditNote,
  taxSavings,
}: CostBreakdownProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const toggleSection = (key: string) => {
    if (isMobile) {
      setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  return (
    <div className={styles.breakdown}>
      {/* -- Purchase Price -- */}
      <div className={styles.sectionBlock}>
        <button
          className={styles.sectionHeader}
          onClick={() => toggleSection('purchase')}
          aria-expanded={!isMobile || !!openSections.purchase}
        >
          <h3 className={styles.sectionTitle}>Purchase Price</h3>
          {isMobile && <span className={styles.sectionSubtotal}>${formatCurrency(listingPrice)}</span>}
          {isMobile && <Icon name="expand_more" size={16} className={openSections.purchase ? styles.chevronOpen : ''} />}
        </button>
        {(!isMobile || openSections.purchase) && (
          <div className={styles.sectionContent}>
            <div className={styles.lineItem}>
              <span>Listing price</span>
              <span>${formatCurrency(listingPrice)}</span>
            </div>
          </div>
        )}
      </div>

      {/* -- Taxes -- */}
      <div className={styles.sectionBlock}>
        <button
          className={styles.sectionHeader}
          onClick={() => toggleSection('taxes')}
          aria-expanded={!isMobile || !!openSections.taxes}
        >
          <h3 className={styles.sectionTitle}>Taxes</h3>
          {isMobile && <span className={styles.sectionSubtotal}>${formatCurrency(taxResult.totalTax)}</span>}
          {isMobile && <Icon name="expand_more" size={16} className={openSections.taxes ? styles.chevronOpen : ''} />}
        </button>
        {(!isMobile || openSections.taxes) && (
          <div className={styles.sectionContent}>
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
        )}
      </div>

      {/* -- DMV Fees -- */}
      <div className={styles.sectionBlock}>
        <button
          className={styles.sectionHeader}
          onClick={() => toggleSection('dmv')}
          aria-expanded={!isMobile || !!openSections.dmv}
        >
          <h3 className={styles.sectionTitle}>DMV Fees</h3>
          {isMobile && <span className={styles.sectionSubtotal}>${formatCurrency(dmvResult.totalDmvFees)}</span>}
          {isMobile && <Icon name="expand_more" size={16} className={openSections.dmv ? styles.chevronOpen : ''} />}
        </button>
        {(!isMobile || openSections.dmv) && (
          <div className={styles.sectionContent}>
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
        )}
      </div>

      {/* -- Dealer Fees -- */}
      <div className={styles.sectionBlock}>
        <button
          className={styles.sectionHeader}
          onClick={() => toggleSection('dealer')}
          aria-expanded={!isMobile || !!openSections.dealer}
        >
          <h3 className={styles.sectionTitle}>Dealer Fees</h3>
          {isMobile && <span className={styles.sectionSubtotal}>${formatCurrency(dealerFees.totalDealerFees)}</span>}
          {isMobile && <Icon name="expand_more" size={16} className={openSections.dealer ? styles.chevronOpen : ''} />}
        </button>
        {(!isMobile || openSections.dealer) && (
          <div className={styles.sectionContent}>
            <p className={styles.editHint}>Click any fee to edit</p>
            <EditableFeeRow label="Doc fee" value={dealerFees.docFee} onChange={(v) => onDealerFeeChange?.('docFee', v)} max={docFeeCap} />
            <EditableFeeRow label="Prep fee" value={dealerFees.prepFee} onChange={(v) => onDealerFeeChange?.('prepFee', v)} />
            <EditableFeeRow label="Admin fee" value={dealerFees.adminFee} onChange={(v) => onDealerFeeChange?.('adminFee', v)} />
            <div className={styles.subtotalRow}>
              <span>Dealer fee subtotal</span>
              <span>${formatCurrency(dealerFees.totalDealerFees)}</span>
            </div>
          </div>
        )}
      </div>

      {/* -- Trade-In -- */}
      <TradeInSection
        tradeInEnabled={tradeInEnabled}
        onToggle={onTradeInToggle}
        onValueChange={onTradeInValueChange}
        tradeInCredit={tradeInCredit}
        tradeInCreditNote={tradeInCreditNote}
        stateName={stateName}
        taxSavings={taxSavings}
      />

      {/* -- Grand Total -- */}
      <div className={styles.grandTotalBlock}>
        {tradeInEnabled && tradeInValue > 0 && (
          <div className={styles.tradeInDeduction}>
            <span>Trade-in deduction</span>
            <span>-${formatCurrency(tradeInValue)}</span>
          </div>
        )}
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
