import { useState, useMemo } from 'react';
import Icon from '@components/ui/Icon/Icon';
import { getStateTaxFees, STATE_LIST } from '../../../app/src/data/stateTaxDatabase';
import { calculateSalesTax, calculateDmvFees } from '../../../app/src/data/stateTaxCalculations';
import { calculateFinancingSummary, CREDIT_TIERS, DEFAULT_TERM, DEFAULT_CREDIT_TIER } from '../../../app/src/data/financingCalculations';
import { getDealerFeeDefaults, type DealerFeeDefaults } from './dealerFeeDefaults';
import { getInsuranceEstimate } from './insuranceEstimates';
import { getStateTips } from './stateTipEngine';
import AnimatedValue from './AnimatedValue';
import CostBreakdown from './CostBreakdown';
import InsuranceEstimate from './InsuranceEstimate';
import StateTips from './StateTips';
import FinancingSection from './FinancingSection';
import styles from './TotalCostCalculator.module.css';

interface TotalCostCalculatorProps {
  currentPrice: number;
  location: string;
  gvwr?: number;
  rvType?: string;
}

function formatCurrency(value: number): string {
  return value.toLocaleString('en-US');
}

function extractStateCode(location: string): string {
  const parts = location.split(', ');
  const last = parts[parts.length - 1]?.trim();
  return last && last.length === 2 ? last.toUpperCase() : 'FL';
}

export default function TotalCostCalculator({
  currentPrice,
  location,
  gvwr,
  rvType,
}: TotalCostCalculatorProps) {
  const defaultState = extractStateCode(location);
  const [selectedState, setSelectedState] = useState(defaultState);
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [dealerFeeOverrides, setDealerFeeOverrides] = useState<Partial<Record<'docFee' | 'prepFee' | 'adminFee', number>>>({});
  const [tradeInEnabled, setTradeInEnabled] = useState(false);
  const [tradeInValue, setTradeInValue] = useState(0);

  // Financing state (lifted up so monthly teaser always uses real PMT)
  const [downPayment, setDownPayment] = useState(0);
  const [selectedTermMonths, setSelectedTermMonths] = useState(DEFAULT_TERM);
  const [selectedTierId, setSelectedTierId] = useState(DEFAULT_CREDIT_TIER);
  const [manualApr, setManualApr] = useState('');
  const [isManualApr, setIsManualApr] = useState(false);

  const computed = useMemo(() => {
    const stateData = getStateTaxFees(selectedState);

    // Derive effective APR
    const parsedManualApr = parseFloat(manualApr);
    const effectiveApr = isManualApr && !Number.isNaN(parsedManualApr) && parsedManualApr > 0
      ? parsedManualApr
      : (CREDIT_TIERS.find(t => t.id === selectedTierId)?.apr ?? 7.49);

    const insuranceEstimate = getInsuranceEstimate(rvType ?? 'travel-trailer', currentPrice);

    if (!stateData) {
      const fallbackFinancing = calculateFinancingSummary({
        outTheDoorTotal: currentPrice,
        downPayment,
        annualRate: effectiveApr,
        termMonths: selectedTermMonths,
      });
      return {
        stateData: null,
        taxResult: null,
        dmvResult: null,
        dealerFees: null,
        totalTaxAndFees: 0,
        outTheDoorTotal: currentPrice,
        monthlyPayment: Math.round(fallbackFinancing.monthlyPayment),
        taxSavings: 0,
        financingSummary: fallbackFinancing,
        insuranceEstimate,
        stateTips: [] as ReturnType<typeof getStateTips>,
      };
    }

    const effectiveTradeIn = tradeInEnabled ? tradeInValue : 0;
    const taxResult = calculateSalesTax(stateData, { listingPrice: currentPrice, tradeInValue: effectiveTradeIn });
    const dmvResult = calculateDmvFees(stateData, { listingPrice: currentPrice, gvwr });
    const baseFees = getDealerFeeDefaults(rvType ?? 'travel-trailer', stateData.docFeeCap);

    const docFee = dealerFeeOverrides.docFee ?? baseFees.docFee;
    const prepFee = dealerFeeOverrides.prepFee ?? baseFees.prepFee;
    const adminFee = dealerFeeOverrides.adminFee ?? baseFees.adminFee;
    const clampedDocFee = stateData.docFeeCap != null ? Math.min(docFee, stateData.docFeeCap) : docFee;
    const dealerFees: DealerFeeDefaults = {
      docFee: clampedDocFee,
      prepFee,
      adminFee,
      totalDealerFees: clampedDocFee + prepFee + adminFee,
    };

    // Tax savings from trade-in credit
    const taxWithoutTradeIn = calculateSalesTax(stateData, { listingPrice: currentPrice, tradeInValue: 0 });
    const taxSavings = stateData.tradeInCredit ? Math.max(0, taxWithoutTradeIn.totalTax - taxResult.totalTax) : 0;

    const fees = taxResult.totalTax + dmvResult.totalDmvFees + dealerFees.totalDealerFees;
    const total = currentPrice + fees - effectiveTradeIn;

    // Real PMT-based financing summary
    const financingSummary = calculateFinancingSummary({
      outTheDoorTotal: total,
      downPayment,
      annualRate: effectiveApr,
      termMonths: selectedTermMonths,
    });

    const monthly = Math.round(financingSummary.monthlyPayment);
    const stateTips = getStateTips(stateData, currentPrice);

    return { stateData, taxResult, dmvResult, dealerFees, totalTaxAndFees: fees, outTheDoorTotal: total, monthlyPayment: monthly, taxSavings, financingSummary, insuranceEstimate, stateTips };
  }, [selectedState, currentPrice, gvwr, rvType, dealerFeeOverrides, tradeInEnabled, tradeInValue, downPayment, selectedTermMonths, selectedTierId, manualApr, isManualApr]);

  const { stateData, taxResult, dmvResult, dealerFees, totalTaxAndFees, outTheDoorTotal, monthlyPayment, taxSavings, financingSummary, insuranceEstimate, stateTips } = computed;

  const handleDealerFeeChange = (feeKey: 'docFee' | 'prepFee' | 'adminFee', value: number) => {
    setDealerFeeOverrides(prev => ({ ...prev, [feeKey]: value }));
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Estimated total cost</h2>

      {/* State selector row */}
      <div className={styles.stateRow}>
        <label className={styles.stateLabel}>Based on registering in</label>
        <select
          value={selectedState}
          onChange={(e) => { setSelectedState(e.target.value); setDealerFeeOverrides({}); setTradeInEnabled(false); setTradeInValue(0); }}
          className={styles.stateSelect}
        >
          {STATE_LIST.map((s) => (
            <option key={s.code} value={s.code}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* State-specific tips */}
      <StateTips tips={stateTips} />

      {/* Summary bar */}
      <div className={styles.summaryCard}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Listing price</span>
          <span className={styles.summaryValue}>${formatCurrency(currentPrice)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Est. tax & fees</span>
          <span className={styles.summaryValue}>+<AnimatedValue value={totalTaxAndFees} /></span>
        </div>
        {tradeInEnabled && tradeInValue > 0 && (
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Trade-in value</span>
            <span className={styles.tradeInValue}>-${formatCurrency(tradeInValue)}</span>
          </div>
        )}
        <div className={styles.summaryDivider} />
        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Out-the-door total</span>
          <span className={styles.totalValue}><AnimatedValue value={outTheDoorTotal} /></span>
        </div>
        <p className={styles.monthlyTeaser}>Est. <AnimatedValue value={monthlyPayment} />/mo*</p>
        <p className={styles.financingNote}>* Based on your financing terms below</p>
      </div>

      {/* Breakdown toggle */}
      <button
        className={styles.breakdownToggle}
        onClick={() => setBreakdownOpen(!breakdownOpen)}
      >
        <span>{breakdownOpen ? 'Hide breakdown' : 'See full breakdown'}</span>
        <Icon name="expand_more" size={20} className={breakdownOpen ? styles.iconRotated : ''} />
      </button>

      {/* Itemized cost breakdown */}
      {breakdownOpen && taxResult && dmvResult && dealerFees && (
        <>
          <CostBreakdown
            listingPrice={currentPrice}
            taxResult={taxResult}
            dmvResult={dmvResult}
            dealerFees={dealerFees}
            outTheDoorTotal={outTheDoorTotal}
            stateName={stateData?.stateName ?? selectedState}
            onDealerFeeChange={handleDealerFeeChange}
            docFeeCap={stateData?.docFeeCap ?? null}
            tradeInEnabled={tradeInEnabled}
            onTradeInToggle={setTradeInEnabled}
            onTradeInValueChange={setTradeInValue}
            tradeInValue={tradeInValue}
            tradeInCredit={stateData?.tradeInCredit ?? true}
            tradeInCreditNote={stateData?.tradeInCreditNote ?? null}
            taxSavings={taxSavings}
          />
          <FinancingSection
            outTheDoorTotal={outTheDoorTotal}
            listingPrice={currentPrice}
            downPayment={downPayment}
            onDownPaymentChange={setDownPayment}
            selectedTermMonths={selectedTermMonths}
            onTermChange={setSelectedTermMonths}
            selectedTierId={selectedTierId}
            onTierChange={setSelectedTierId}
            manualApr={manualApr}
            onManualAprChange={setManualApr}
            isManualApr={isManualApr}
            onManualAprToggle={setIsManualApr}
            financingSummary={financingSummary}
          />
          <InsuranceEstimate estimate={insuranceEstimate} />
        </>
      )}
    </div>
  );
}
