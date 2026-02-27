import { useState, useEffect, useMemo } from 'react';
import type { FilterCriteria } from '@app/src/data/srpTypes.ts';
import CollapsibleSection from './CollapsibleSection';
import styles from './PriceFilter.module.css';

interface PriceFilterProps {
  priceMin: number | null;
  priceMax: number | null;
  onSetFilter: (
    key: 'priceMin' | 'priceMax',
    value: number | null,
  ) => void;
}

type PriceMode = 'cash' | 'finance';

export default function PriceFilter({
  priceMin,
  priceMax,
  onSetFilter,
}: PriceFilterProps) {
  const [mode, setMode] = useState<PriceMode>('cash');

  // Finance mode local state
  const [downPayment, setDownPayment] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(500);
  const [term, setTerm] = useState(180);

  // Computed buying power (simplified: no interest calc)
  const buyingPower = useMemo(
    () => downPayment + monthlyPayment * term,
    [downPayment, monthlyPayment, term],
  );

  // Sync buying power to priceMax when in finance mode
  useEffect(() => {
    if (mode === 'finance') {
      onSetFilter('priceMax', buyingPower);
    }
  }, [mode, buyingPower]);

  const handleModeSwitch = (newMode: PriceMode) => {
    if (newMode === mode) return;

    if (newMode === 'finance') {
      // Switching to finance: clear price filters, let buying power drive
      onSetFilter('priceMin', null);
      onSetFilter('priceMax', null);
    }
    // Switching to cash: keep current priceMin/priceMax values

    setMode(newMode);
  };

  const termYears = Math.floor(term / 12);
  const termRemainder = term % 12;
  const termLabel = termRemainder > 0
    ? `${term} months / ${termYears}yr ${termRemainder}mo`
    : `${term} months / ${termYears} years`;

  return (
    <CollapsibleSection title="Price">
      {/* Tab toggle */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab}${mode === 'cash' ? ` ${styles.tabActive}` : ''}`}
          onClick={() => handleModeSwitch('cash')}
          type="button"
        >
          Cash
        </button>
        <button
          className={`${styles.tab}${mode === 'finance' ? ` ${styles.tabActive}` : ''}`}
          onClick={() => handleModeSwitch('finance')}
          type="button"
        >
          Finance
        </button>
      </div>

      <div className={styles.content}>
        {mode === 'cash' ? (
          /* Cash mode: min/max price inputs */
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Min</label>
              <input
                className={styles.input}
                type="number"
                placeholder="$0"
                step={1000}
                value={priceMin ?? ''}
                onChange={(e) =>
                  onSetFilter(
                    'priceMin',
                    e.target.value ? Number(e.target.value) : null,
                  )
                }
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Max</label>
              <input
                className={styles.input}
                type="number"
                placeholder="$500,000"
                step={1000}
                value={priceMax ?? ''}
                onChange={(e) =>
                  onSetFilter(
                    'priceMax',
                    e.target.value ? Number(e.target.value) : null,
                  )
                }
              />
            </div>
          </div>
        ) : (
          /* Finance mode: down payment, monthly, term slider, buying power */
          <div className={styles.financeFields}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Down payment</label>
              <input
                className={styles.input}
                type="number"
                placeholder="$0"
                step={1000}
                value={downPayment || ''}
                onChange={(e) =>
                  setDownPayment(e.target.value ? Number(e.target.value) : 0)
                }
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Monthly payment</label>
              <input
                className={styles.input}
                type="number"
                placeholder="$500"
                step={50}
                value={monthlyPayment || ''}
                onChange={(e) =>
                  setMonthlyPayment(
                    e.target.value ? Number(e.target.value) : 0,
                  )
                }
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Loan term</label>
              <input
                className={styles.slider}
                type="range"
                min={36}
                max={240}
                step={12}
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
              />
              <span className={styles.sliderValue}>{termLabel}</span>
            </div>

            {/* Estimated buying power callout */}
            <div className={styles.buyingPower}>
              <span className={styles.buyingPowerLabel}>
                Estimated buying power
              </span>
              <span className={styles.buyingPowerValue}>
                ${buyingPower.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </CollapsibleSection>
  );
}
