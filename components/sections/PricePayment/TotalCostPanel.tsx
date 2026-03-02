import { useState, useEffect, useCallback, useMemo } from 'react';
import Icon from '@components/ui/Icon/Icon';
import Select from '@components/ui/Select/Select';
import { getStateTaxFees, STATE_LIST } from '../../../app/src/data/stateTaxDatabase';
import { calculateSalesTax, calculateDmvFees } from '../../../app/src/data/stateTaxCalculations';
import styles from './TotalCostPanel.module.css';

interface TotalCostPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentPrice: number;
  location: string;
}

const BAR_COLORS = {
  listing: 'var(--color-green-200)',
  taxes: 'var(--color-blue-200)',
  dmv: 'var(--color-yellow-200)',
};

function extractStateCode(location: string): string {
  const parts = location.split(',');
  const state = parts[parts.length - 1]?.trim();
  return state && state.length === 2 ? state.toUpperCase() : 'CA';
}

function formatDollars(value: number): string {
  return '$' + Math.round(value).toLocaleString('en-US');
}

export function computeTotalCost(price: number, stateCode: string) {
  const stateFees = getStateTaxFees(stateCode);
  if (!stateFees) {
    return { stateTax: 0, localTax: 0, dmvFees: 0, total: price };
  }

  const taxResult = calculateSalesTax(stateFees, {
    listingPrice: price,
    tradeInValue: 0,
    rvAge: 0,
    rvValue: price,
  });

  const dmvResult = calculateDmvFees(stateFees, {
    gvwr: undefined,
    listingPrice: price,
  });

  return {
    stateTax: taxResult.stateTax,
    localTax: taxResult.localTax,
    dmvFees: dmvResult.totalDmvFees,
    total: price + taxResult.totalTax + dmvResult.totalDmvFees,
  };
}

export default function TotalCostPanel({
  isOpen,
  onClose,
  currentPrice,
  location,
}: TotalCostPanelProps) {
  const defaultState = extractStateCode(location);
  const [selectedState, setSelectedState] = useState(defaultState);

  // Reset state when location changes
  useEffect(() => {
    setSelectedState(extractStateCode(location));
  }, [location]);

  // Escape key
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    },
    [isOpen, onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  // Mobile scroll lock
  useEffect(() => {
    if (isOpen) {
      const isMobile = window.matchMedia('(max-width: 1023px)').matches;
      if (isMobile) {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = '';
        };
      }
    }
  }, [isOpen]);

  const costs = useMemo(
    () => computeTotalCost(currentPrice, selectedState),
    [currentPrice, selectedState],
  );

  const totalTaxes = costs.stateTax + costs.localTax;

  // Bar segment percentages
  const segments = useMemo(() => {
    const total = costs.total || 1;
    return {
      listing: (currentPrice / total) * 100,
      taxes: (totalTaxes / total) * 100,
      dmv: (costs.dmvFees / total) * 100,
    };
  }, [currentPrice, totalTaxes, costs.dmvFees, costs.total]);

  const breakdownItems = [
    { label: 'Listing price', value: currentPrice, color: BAR_COLORS.listing },
    { label: 'State sales tax', value: costs.stateTax, color: BAR_COLORS.taxes },
    { label: 'Local tax', value: costs.localTax, color: BAR_COLORS.taxes },
    { label: 'DMV fees', value: costs.dmvFees, color: BAR_COLORS.dmv },
  ];

  return (
    <>
      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        className={`${styles.panel} ${isOpen ? styles.open : ''}`}
        role="dialog"
        aria-label="Estimated total cost breakdown"
        aria-hidden={!isOpen}
      >
        <div className={styles.header}>
          <span className={styles.headerTitle}>Estimated total cost</span>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close panel"
          >
            <Icon name="x_close" size={20} />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.stateRow}>
            <span>Based on registering in</span>
            <Select
              className={styles.stateSelect}
              options={STATE_LIST.map((s) => ({ value: s.code, label: s.name }))}
              value={selectedState}
              onChange={setSelectedState}
            />
          </div>

          <div className={styles.totalAmount}>{formatDollars(costs.total)}</div>

          <div className={styles.barContainer}>
            <div className={styles.bar}>
              <div
                className={styles.barSegment}
                style={{ width: `${segments.listing}%`, background: BAR_COLORS.listing }}
              />
              <div
                className={styles.barSegment}
                style={{ width: `${segments.taxes}%`, background: BAR_COLORS.taxes }}
              />
              <div
                className={styles.barSegment}
                style={{ width: `${segments.dmv}%`, background: BAR_COLORS.dmv }}
              />
            </div>
          </div>

          <div className={styles.breakdown}>
            {breakdownItems.map((item) => (
              <div key={item.label} className={styles.breakdownItem}>
                <span className={styles.dot} style={{ background: item.color }} />
                <span className={styles.breakdownLabel}>{item.label}</span>
                <span className={styles.breakdownValue}>{formatDollars(item.value)}</span>
              </div>
            ))}
          </div>

          <p className={styles.disclaimer}>
            Estimated taxes and fees are based on typical rates and may vary.
            Contact your local DMV and tax authority for exact amounts.
          </p>
        </div>
      </div>
    </>
  );
}
