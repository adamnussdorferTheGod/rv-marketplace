import { useState, useMemo, useCallback } from 'react';
import {
  calculateFinancingSummary,
  LOAN_TERMS,
  DEFAULT_TERM,
} from '../../../app/src/data/financingCalculations';
import Icon from '@components/ui/Icon/Icon';
import DonutChart from './DonutChart';
import DownPaymentToggle from './DownPaymentToggle';
import PrequalBanner from './PrequalBanner';
import styles from './PaymentCalculator.module.css';

interface PaymentCalculatorProps {
  currentPrice: number;
}

const TERM_OPTIONS = LOAN_TERMS.map((t) => ({
  value: t.months,
  label: t.label,
}));

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function formatCurrency(n: number): string {
  return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

export default function PaymentCalculator({ currentPrice }: PaymentCalculatorProps) {
  const [price, setPrice] = useState(currentPrice);
  const [downPayment, setDownPayment] = useState(10000);
  const [downPaymentMode, setDownPaymentMode] = useState<'$' | '%'>('$');
  const [termMonths, setTermMonths] = useState(DEFAULT_TERM);
  const [apr, setApr] = useState('7');

  const downDollars =
    downPaymentMode === '%'
      ? Math.round((downPayment / 100) * price)
      : downPayment;

  const downPct =
    price > 0
      ? downPaymentMode === '%'
        ? downPayment
        : Math.round((downPayment / price) * 100)
      : 0;

  const summary = useMemo(
    () =>
      calculateFinancingSummary({
        outTheDoorTotal: price,
        downPayment: downDollars,
        annualRate: parseFloat(apr) || 0,
        termMonths,
      }),
    [price, downDollars, apr, termMonths],
  );

  const handleToggleMode = useCallback(
    (newMode: '$' | '%') => {
      if (newMode === downPaymentMode) return;
      if (newMode === '%') {
        setDownPayment(downPct);
      } else {
        setDownPayment(downDollars);
      }
      setDownPaymentMode(newMode);
    },
    [downPaymentMode, downPct, downDollars],
  );

  const handlePriceInput = (raw: string) => {
    const n = parseInt(raw.replace(/\D/g, ''), 10);
    setPrice(isNaN(n) ? 0 : n);
  };

  const handleDownInput = (raw: string) => {
    const n = parseInt(raw.replace(/\D/g, ''), 10);
    if (downPaymentMode === '%') {
      setDownPayment(isNaN(n) ? 0 : clamp(n, 0, 100));
    } else {
      setDownPayment(isNaN(n) ? 0 : clamp(n, 0, price));
    }
  };

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pct = parseInt(e.target.value, 10);
    if (downPaymentMode === '%') {
      setDownPayment(pct);
    } else {
      setDownPayment(Math.round((pct / 100) * price));
    }
  };

  const handleApr = (raw: string) => {
    setApr(raw.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1'));
  };

  return (
    <section className={styles.wrapper} aria-label="Payment calculator">
      <h2 className={styles.heading}>Payment calculator</h2>
      <p className={styles.description}>
        Determine the monthly cost of financing your RV purchase by updating the
        fields below.
      </p>

      {/* ── Two-panel layout ── */}
      <div className={styles.panels}>
        {/* Left: inputs on gray */}
        <div className={styles.inputPanel}>
          <div className={styles.inputsInner}>
            {/* Price */}
            <div className={styles.inputField}>
              <span className={styles.inputLabel}>Price</span>
              <div className={styles.inputValueRow}>
                <span className={styles.inputPrefix}>$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  className={styles.input}
                  value={formatCurrency(price)}
                  onChange={(e) => handlePriceInput(e.target.value)}
                />
              </div>
            </div>

            {/* Down payment + toggle */}
            <div className={styles.inputField}>
              <span className={styles.inputLabel}>Down payment</span>
              <div className={styles.inputValueRow}>
                <span className={styles.inputPrefix}>
                  {downPaymentMode === '$' ? '$' : ''}
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  className={styles.input}
                  value={
                    downPaymentMode === '$'
                      ? formatCurrency(downPayment)
                      : String(downPayment)
                  }
                  onChange={(e) => handleDownInput(e.target.value)}
                />
                {downPaymentMode === '%' && (
                  <span className={styles.inputSuffix}>%</span>
                )}
                <DownPaymentToggle
                  mode={downPaymentMode}
                  onToggle={handleToggleMode}
                />
              </div>
            </div>

            {/* Slider */}
            <input
              type="range"
              min={0}
              max={100}
              value={downPct}
              onChange={handleSlider}
              className={styles.slider}
              aria-label="Down payment percentage"
              style={
                {
                  '--slider-pct': `${downPct}%`,
                } as React.CSSProperties
              }
            />

            {/* Term + APR */}
            <div className={styles.termAprRow}>
              <div className={styles.inputField}>
                <span className={styles.inputLabel}>Loan term</span>
                <div className={styles.inputValueRow}>
                  <select
                    className={styles.select}
                    value={termMonths}
                    onChange={(e) => setTermMonths(Number(e.target.value))}
                  >
                    {TERM_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <span className={styles.selectChevron}>
                    <Icon name="expand_more" size={24} />
                  </span>
                </div>
              </div>
              <div className={styles.inputField}>
                <span className={styles.inputLabel}>APR %</span>
                <div className={styles.inputValueRow}>
                  <input
                    type="text"
                    inputMode="decimal"
                    className={styles.input}
                    value={apr}
                    onChange={(e) => handleApr(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: donut chart on blue */}
        <div className={styles.chartPanel}>
          <span className={styles.chartLabel}>Est. monthly payment</span>
          <DonutChart
            principal={summary.amountFinanced}
            interest={summary.totalInterest}
            monthlyPayment={summary.monthlyPayment}
          />
          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.legendBlue}`} />
              <span className={styles.legendText}>Principal</span>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.legendOrange}`} />
              <span className={styles.legendText}>Interest</span>
            </div>
          </div>
        </div>
      </div>

      <PrequalBanner />

      <p className={styles.disclaimer}>
        *Excludes tax, title, tags, and other fees. for general informational
        purposes only. Dealer APR may vary.
      </p>
    </section>
  );
}
