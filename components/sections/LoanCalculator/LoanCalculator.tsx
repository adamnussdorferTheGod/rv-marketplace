import { useState, useEffect } from 'react';
import Icon from '@components/ui/Icon/Icon';
import styles from './LoanCalculator.module.css';

interface LoanCalculatorProps {
  currentPrice: number;
  dealerName: string;
  dealerPhone: string;
}

const TERM_OPTIONS = [60, 84, 120, 180, 240];

function formatCurrency(value: number): string {
  return value.toLocaleString('en-US');
}

function calculateMonthlyPayment(price: number, downPayment: number, termMonths: number, aprPercent: number): number {
  const principal = price - downPayment;
  if (principal <= 0) return 0;
  const monthlyRate = aprPercent / 100 / 12;
  if (monthlyRate === 0) return Math.round(principal / termMonths);
  return Math.round(principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1));
}

export default function LoanCalculator({ currentPrice, dealerName, dealerPhone }: LoanCalculatorProps) {
  const defaultDown = Math.round(currentPrice * 0.1);
  const [price, setPrice] = useState(currentPrice);
  const [downPayment, setDownPayment] = useState(defaultDown);
  const [term, setTerm] = useState(120);
  const [apr, setApr] = useState(7);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    setMonthlyPayment(calculateMonthlyPayment(price, downPayment, term, apr));
  }, [price, downPayment, term, apr]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setPrice(val ? parseInt(val, 10) : 0);
  };

  const handleDownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setDownPayment(val ? parseInt(val, 10) : 0);
  };

  const handleAprChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.]/g, '');
    setApr(val ? parseFloat(val) : 0);
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Loan calculator</h2>
      <p className={styles.subtitle}>
        Determine the monthly cost of financing your RV purchase by updating the fields below.
      </p>

      <div className={styles.paymentCard}>
        <div className={styles.paymentDisplay}>
          <p className={styles.paymentAmount}>
            <span className={styles.paymentValue}>${formatCurrency(monthlyPayment)}</span>
            <span className={styles.paymentPeriod}>/mo</span>
          </p>
          <p className={styles.paymentLabel}>Est. payment*</p>
        </div>

        <div className={styles.contactPrompt}>
          <div className={styles.contactTextGroup}>
            <p className={styles.contactHeading}>Questions about payment options?</p>
            <p className={styles.contactSubtext}>Contact {dealerName} for financing rates</p>
          </div>
          <a
            href={`tel:${dealerPhone.replace(/[^+\d]/g, '')}`}
            className={styles.ctaButton}
          >
            Get final price
          </a>
        </div>
      </div>

      <div className={styles.inputRow}>
        <div className={styles.inputField}>
          <div className={styles.inputWrapper}>
            <label className={styles.inputLabel}>Price</label>
            <div className={styles.inputInner}>
              <span className={styles.inputPrefix}>$</span>
              <input
                type="text"
                className={styles.input}
                value={formatCurrency(price)}
                onChange={handlePriceChange}
              />
            </div>
          </div>
        </div>
        <div className={styles.inputField}>
          <div className={styles.inputWrapper}>
            <label className={styles.inputLabel}>Down payment</label>
            <div className={styles.inputInner}>
              <span className={styles.inputPrefix}>$</span>
              <input
                type="text"
                className={styles.input}
                value={formatCurrency(downPayment)}
                onChange={handleDownChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.inputRow}>
        <div className={styles.inputField}>
          <div className={styles.selectWrapper}>
            <label className={styles.inputLabel}>Term (months)</label>
            <select
              className={styles.select}
              value={term}
              onChange={(e) => setTerm(parseInt(e.target.value, 10))}
            >
              {TERM_OPTIONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <Icon name="expand_more" size={24} className={styles.selectIcon} />
          </div>
        </div>
        <div className={styles.inputField}>
          <div className={styles.inputWrapper}>
            <label className={styles.inputLabel}>APR %</label>
            <div className={styles.inputInner}>
              <input
                type="text"
                className={styles.input}
                value={apr}
                onChange={handleAprChange}
              />
            </div>
          </div>
        </div>
      </div>

      <p className={styles.disclaimer}>
        *Excludes tax, title, tags, and other fees. For general informational purposes only. Dealer APR may vary.
      </p>
    </div>
  );
}
