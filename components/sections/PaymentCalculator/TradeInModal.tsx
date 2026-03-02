import { useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import Icon from '@components/ui/Icon/Icon';
import {
  estimateTradeInValue,
  TRADE_IN_YEARS,
  TRADE_IN_MAKES,
  TRADE_IN_CONDITIONS,
} from '../TotalCostCalculator/tradeInEstimator';
import styles from './TradeInModal.module.css';

interface TradeInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (value: number) => void;
  currentValue: number;
}

function formatCurrency(n: number): string {
  return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

export default function TradeInModal({ isOpen, onClose, onApply, currentValue }: TradeInModalProps) {
  const [year, setYear] = useState<number | null>(null);
  const [make, setMake] = useState<string | null>(null);
  const [condition, setCondition] = useState<string | null>(null);
  const [model, setModel] = useState('');
  const [manualValue, setManualValue] = useState('');

  // Reset form when opening fresh (no existing trade-in)
  useEffect(() => {
    if (isOpen && currentValue === 0) {
      setYear(null);
      setMake(null);
      setCondition(null);
      setModel('');
      setManualValue('');
    }
  }, [isOpen, currentValue]);

  const estimate = useMemo(
    () =>
      estimateTradeInValue({
        year,
        make,
        model: model || null,
        condition: condition as 'excellent' | 'good' | 'fair' | 'poor' | null,
      }),
    [year, make, condition, model],
  );

  const parsedManual = parseInt(manualValue.replace(/\D/g, ''), 10);
  const hasManual = !isNaN(parsedManual) && parsedManual > 0;
  const applyValue = hasManual ? parsedManual : estimate?.mid ?? 0;
  const canApply = applyValue > 0;

  const handleManualInput = (raw: string) => {
    const digits = raw.replace(/\D/g, '');
    setManualValue(digits ? formatCurrency(parseInt(digits, 10)) : '');
  };

  const handleApply = () => {
    if (canApply) {
      onApply(applyValue);
      onClose();
    }
  };

  // Escape key closes modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className={styles.header}>
              <h2 className={styles.title}>Estimate your trade-in</h2>
              <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
                <Icon name="x_close" size={24} />
              </button>
            </div>

            {/* Form */}
            <div className={styles.form}>
              {/* Year + Make */}
              <div className={styles.fieldRow}>
                <div className={styles.fieldWrap}>
                  <label className={styles.fieldLabel}>Year</label>
                  <select
                    className={styles.fieldSelect}
                    value={year ?? ''}
                    onChange={(e) => setYear(e.target.value ? Number(e.target.value) : null)}
                  >
                    <option value="">Select</option>
                    {TRADE_IN_YEARS.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  <span className={styles.selectChevron}>
                    <Icon name="expand_more" size={20} />
                  </span>
                </div>
                <div className={styles.fieldWrap}>
                  <label className={styles.fieldLabel}>Make</label>
                  <select
                    className={styles.fieldSelect}
                    value={make ?? ''}
                    onChange={(e) => setMake(e.target.value || null)}
                  >
                    <option value="">Select</option>
                    {TRADE_IN_MAKES.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <span className={styles.selectChevron}>
                    <Icon name="expand_more" size={20} />
                  </span>
                </div>
              </div>

              {/* Condition + Model */}
              <div className={styles.fieldRow}>
                <div className={styles.fieldWrap}>
                  <label className={styles.fieldLabel}>Condition</label>
                  <select
                    className={styles.fieldSelect}
                    value={condition ?? ''}
                    onChange={(e) => setCondition(e.target.value || null)}
                  >
                    <option value="">Select</option>
                    {TRADE_IN_CONDITIONS.map((c) => (
                      <option key={c} value={c}>
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                      </option>
                    ))}
                  </select>
                  <span className={styles.selectChevron}>
                    <Icon name="expand_more" size={20} />
                  </span>
                </div>
                <div className={styles.fieldWrap}>
                  <label className={styles.fieldLabel}>Model (optional)</label>
                  <input
                    className={styles.fieldInput}
                    type="text"
                    placeholder="e.g. Cougar 364BHL"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  />
                </div>
              </div>

              {/* Estimate display */}
              {estimate && (
                <div className={styles.estimate}>
                  <p className={styles.estimateLabel}>Estimated trade-in value</p>
                  <p className={styles.estimateValue}>${formatCurrency(estimate.mid)}</p>
                  <p className={styles.estimateRange}>
                    Range: ${formatCurrency(estimate.low)} – ${formatCurrency(estimate.high)}
                  </p>
                </div>
              )}

              {/* Manual override */}
              <div className={styles.divider}>Or enter your own value</div>
              <div className={`${styles.fieldWrap} ${styles.manualInput}`}>
                <span className={styles.manualPrefix}>$</span>
                <input
                  className={styles.fieldInput}
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={manualValue}
                  onChange={(e) => handleManualInput(e.target.value)}
                />
              </div>

              {/* Apply */}
              <button
                type="button"
                className={styles.submitBtn}
                disabled={!canApply}
                onClick={handleApply}
              >
                Apply trade-in{canApply ? ` · $${formatCurrency(applyValue)}` : ''}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
