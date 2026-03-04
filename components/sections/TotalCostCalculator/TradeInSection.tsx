import { useState, useEffect, useCallback } from 'react';
import {
  estimateTradeInValue,
  TRADE_IN_YEARS,
  TRADE_IN_MAKES,
  TRADE_IN_CONDITIONS,
  type TradeInSelection,
  type TradeInEstimate,
} from './tradeInEstimator';
import CashOfferModal from './CashOfferModal';
import styles from './TradeInSection.module.css';

interface TradeInSectionProps {
  tradeInEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  onValueChange: (value: number) => void;
  tradeInCredit: boolean;
  tradeInCreditNote: string | null;
  stateName: string;
  taxSavings: number;
}

function formatCurrency(value: number): string {
  return value.toLocaleString('en-US');
}

const CONDITION_LABELS: Record<string, string> = {
  excellent: 'Excellent',
  good: 'Good',
  fair: 'Fair',
  poor: 'Poor',
};

export default function TradeInSection({
  tradeInEnabled,
  onToggle,
  onValueChange,
  tradeInCredit,
  tradeInCreditNote,
  stateName,
  taxSavings,
}: TradeInSectionProps) {
  const [selection, setSelection] = useState<TradeInSelection>({
    year: null,
    make: null,
    model: null,
    condition: null,
  });
  const [manualOverride, setManualOverride] = useState('');
  const [isOverriding, setIsOverriding] = useState(false);
  const [cashOfferOpen, setCashOfferOpen] = useState(false);

  const estimate = estimateTradeInValue(selection);

  // Compute effective value and notify parent
  const getEffectiveValue = useCallback((): number => {
    if (manualOverride) {
      const parsed = parseInt(manualOverride.replace(/\D/g, ''), 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
    if (estimate) return estimate.mid;
    return 0;
  }, [manualOverride, estimate]);

  useEffect(() => {
    if (tradeInEnabled) {
      onValueChange(getEffectiveValue());
    }
  }, [tradeInEnabled, getEffectiveValue, onValueChange]);

  const handleSelectionChange = (field: keyof TradeInSelection, value: string) => {
    setSelection(prev => {
      const next = { ...prev };
      if (field === 'year') {
        next.year = value ? parseInt(value, 10) : null;
      } else if (field === 'condition') {
        next.condition = value ? (value as TradeInSelection['condition']) : null;
      } else {
        (next as Record<string, unknown>)[field] = value || null;
      }
      return next;
    });
  };

  const handleManualInput = (rawValue: string) => {
    const digits = rawValue.replace(/\D/g, '');
    setManualOverride(digits);
  };

  const handleClearOverride = () => {
    setManualOverride('');
    setIsOverriding(false);
  };

  const effectiveValue = getEffectiveValue();
  const parsedOverride = manualOverride ? parseInt(manualOverride.replace(/\D/g, ''), 10) : 0;
  const hasValidOverride = !isNaN(parsedOverride) && parsedOverride > 0 && manualOverride !== '';

  return (
    <div className={styles.tradeInSection}>
      {/* Toggle row */}
      <div className={styles.toggleRow}>
        <span className={styles.toggleLabel}>Trade-In</span>
        <div className={styles.toggleGroup}>
          <button
            type="button"
            className={`${styles.toggleBtn} ${tradeInEnabled ? styles.active : ''}`}
            onClick={() => onToggle(true)}
          >
            Yes
          </button>
          <button
            type="button"
            className={`${styles.toggleBtn} ${!tradeInEnabled ? styles.active : ''}`}
            onClick={() => onToggle(false)}
          >
            No
          </button>
        </div>
      </div>

      {/* Selector section (when enabled) */}
      {tradeInEnabled && (
        <>
          <div className={styles.selectorGrid}>
            <select
              value={selection.year ?? ''}
              onChange={(e) => handleSelectionChange('year', e.target.value)}
              className={styles.selector}
            >
              <option value="">Year</option>
              {TRADE_IN_YEARS.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            <select
              value={selection.make ?? ''}
              onChange={(e) => handleSelectionChange('make', e.target.value)}
              className={styles.selector}
            >
              <option value="">Make</option>
              {TRADE_IN_MAKES.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Model (optional)"
              value={selection.model ?? ''}
              onChange={(e) => handleSelectionChange('model', e.target.value)}
              className={styles.selector}
            />

            <select
              value={selection.condition ?? ''}
              onChange={(e) => handleSelectionChange('condition', e.target.value)}
              className={styles.selector}
            >
              <option value="">Condition</option>
              {TRADE_IN_CONDITIONS.map(c => (
                <option key={c} value={c}>{CONDITION_LABELS[c]}</option>
              ))}
            </select>
          </div>

          {/* Value display (once year is selected) */}
          {estimate && (
            <div className={styles.valueDisplay}>
              <p className={styles.valueHeading}>Estimated value range</p>
              <div className={styles.valueRange}>
                <div className={styles.rangeItem}>
                  <span className={styles.rangeLabel}>Low</span>
                  <span className={styles.rangeValue}>${formatCurrency(estimate.low)}</span>
                </div>
                <div className={styles.rangeItem}>
                  <span className={styles.rangeLabel}>Mid</span>
                  <span className={`${styles.rangeValue} ${styles.midValue} ${hasValidOverride ? styles.dimmed : ''}`}>
                    ${formatCurrency(estimate.mid)}
                  </span>
                </div>
                <div className={styles.rangeItem}>
                  <span className={styles.rangeLabel}>High</span>
                  <span className={styles.rangeValue}>${formatCurrency(estimate.high)}</span>
                </div>
              </div>

              {/* Manual override */}
              {!isOverriding ? (
                <button
                  type="button"
                  className={styles.overrideLink}
                  onClick={() => setIsOverriding(true)}
                >
                  Or enter your own value
                </button>
              ) : (
                <div className={styles.overrideInput}>
                  <span className={styles.dollarPrefix}>$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter value"
                    value={manualOverride ? formatCurrency(parseInt(manualOverride, 10)) : ''}
                    onChange={(e) => handleManualInput(e.target.value)}
                    className={styles.manualInput}
                  />
                  <button
                    type="button"
                    className={styles.overrideLink}
                    onClick={handleClearOverride}
                  >
                    Use estimate instead
                  </button>
                </div>
              )}

              {hasValidOverride && (
                <p className={styles.activeValue}>
                  Using your value: <strong>${formatCurrency(parsedOverride)}</strong>
                </p>
              )}
            </div>
          )}

          {/* Cash offer promo (once estimate is visible) */}
          {estimate && (
            <div className={styles.promoCallout}>
              <p className={styles.promoText}>Get an instant cash offer for your RV</p>
              <button
                type="button"
                className={styles.promoBtn}
                onClick={() => setCashOfferOpen(true)}
              >
                Get Cash Offer
              </button>
            </div>
          )}

          <CashOfferModal isOpen={cashOfferOpen} onClose={() => setCashOfferOpen(false)} />

          {/* Tax credit callout (credit state + value > 0) */}
          {tradeInCredit && effectiveValue > 0 && (
            <div className={styles.creditCallout}>
              <p className={styles.calloutText}>
                Trade-in tax credit: saving you <strong>${formatCurrency(taxSavings)}</strong> in taxes
              </p>
              <p className={styles.calloutSubtext}>
                Your trade-in reduces the taxable amount in {stateName}
              </p>
            </div>
          )}

          {/* Non-credit state warning */}
          {!tradeInCredit && (
            <div className={styles.warningCallout}>
              <p className={styles.calloutText}>
                {tradeInCreditNote ??
                  `${stateName} does not offer trade-in tax credit. Sales tax applies to the full purchase price regardless of trade-in.`}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
