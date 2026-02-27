import { useState, useEffect, useMemo } from 'react';
import Icon from '@components/ui/Icon/Icon';
import SegmentedButtons from '@components/ui/SegmentedButtons/SegmentedButtons';
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

const MODE_OPTIONS: { value: PriceMode; label: string }[] = [
  { value: 'cash', label: 'Cash' },
  { value: 'finance', label: 'Finance' },
];

const TERM_OPTIONS = [
  { value: 36, label: '36 months / 3 years' },
  { value: 48, label: '48 months / 4 years' },
  { value: 60, label: '60 months / 5 years' },
  { value: 72, label: '72 months / 6 years' },
  { value: 84, label: '84 months / 7 years' },
  { value: 120, label: '120 months / 10 years' },
  { value: 180, label: '180 months / 15 years' },
  { value: 240, label: '240 months / 20 years' },
];

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
      onSetFilter('priceMin', null);
      onSetFilter('priceMax', null);
    }

    setMode(newMode);
  };

  return (
    <CollapsibleSection title="Price">
      <div className={styles.content}>
        {/* Segmented toggle */}
        <SegmentedButtons
          options={MODE_OPTIONS}
          selected={mode}
          onChange={handleModeSwitch}
          className={styles.modeToggle}
        />

        {mode === 'cash' ? (
          <>
            {/* Cash mode: min/max price inputs with $ prefix */}
            <div className={styles.inputWrapper}>
              <span className={styles.inputPrefix}>$</span>
              <input
                className={styles.input}
                type="number"
                placeholder="Min price"
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
            <div className={styles.inputWrapper}>
              <span className={styles.inputPrefix}>$</span>
              <input
                className={styles.input}
                type="number"
                placeholder="Max price"
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
          </>
        ) : (
          /* Finance mode: down payment, monthly, term dropdown, buying power */
          <div className={styles.financeFields}>
            <div className={styles.inputWrapper}>
              <span className={styles.inputPrefix}>$</span>
              <input
                className={styles.input}
                type="number"
                placeholder="Down payment"
                step={1000}
                value={downPayment || ''}
                onChange={(e) =>
                  setDownPayment(e.target.value ? Number(e.target.value) : 0)
                }
              />
            </div>

            <div className={styles.inputWrapper}>
              <span className={styles.inputPrefix}>$</span>
              <input
                className={styles.input}
                type="number"
                placeholder="Monthly payment"
                step={50}
                value={monthlyPayment || ''}
                onChange={(e) =>
                  setMonthlyPayment(
                    e.target.value ? Number(e.target.value) : 0,
                  )
                }
              />
            </div>

            <select
              className={styles.termSelect}
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
            >
              {TERM_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Estimated buying power callout */}
            <div className={styles.buyingPower}>
              <div className={styles.buyingPowerContent}>
                <div className={styles.buyingPowerHeader}>
                  <div className={styles.buyingPowerLabelRow}>
                    <span className={styles.buyingPowerLabel}>
                      Estimated buying power
                    </span>
                    <Icon name="info" size={20} />
                  </div>
                  <span className={styles.buyingPowerValue}>
                    {buyingPower > 0
                      ? `$${buyingPower.toLocaleString()}`
                      : '\u2014'}
                  </span>
                </div>
                <p className={styles.buyingPowerDescription}>
                  Be the first to know when new RVs get listed within your
                  budget.
                </p>
              </div>
              <button className={styles.buyingPowerCta} type="button">
                Get alerts
              </button>
            </div>
          </div>
        )}
      </div>
    </CollapsibleSection>
  );
}
