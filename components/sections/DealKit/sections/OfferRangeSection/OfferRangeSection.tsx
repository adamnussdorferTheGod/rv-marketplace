import { useEffect, useRef, useState } from 'react';
import type { OfferRangeData } from '../../../../../app/src/data/dealKitTypes';
import styles from './OfferRangeSection.module.css';

interface OfferRangeSectionProps {
  data: OfferRangeData;
}

function formatK(n: number) {
  return n >= 1000 ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : `$${n.toLocaleString()}`;
}

function formatFull(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);
}

export default function OfferRangeSection({ data }: OfferRangeSectionProps) {
  const { opening, target, walkAway, listPrice } = data;

  // The bar spans from opening.amount to listPrice
  const min = opening.amount;
  const max = listPrice;
  const range = max - min;

  const targetPct = ((target.amount - min) / range) * 100;
  const walkAwayPct = ((walkAway.amount - min) / range) * 100;

  return (
    <section id="offer-range" className={styles.section}>
      <h2 className={styles.heading}>Offer Range</h2>
      <div className={styles.card}>
        <div className={styles.barContainer}>
          {/* Callout bubble for target price */}
          <div className={styles.callout} style={{ left: `${targetPct}%` }}>
            <div className={styles.calloutBubble}>
              <span className={styles.calloutLabel}>Target price</span>
              <span className={styles.calloutAmount}>{formatFull(target.amount)}</span>
            </div>
            <div className={styles.calloutArrow} />
          </div>

          {/* Gradient bar */}
          <div className={styles.gradientBar} />

          {/* Zone labels below */}
          <div className={styles.zones}>
            <div className={styles.zone}>
              <span className={styles.zoneName}>Opening</span>
              <span className={styles.zoneRange}>Below {formatK(target.amount)}</span>
            </div>
            <div className={styles.zone}>
              <span className={styles.zoneName}>Target</span>
              <span className={styles.zoneRange}>{formatK(target.amount)}&ndash;{formatK(walkAway.amount)}</span>
            </div>
            <div className={styles.zone}>
              <span className={styles.zoneName}>Walk-Away</span>
              <span className={styles.zoneRange}>Above {formatK(walkAway.amount)}</span>
            </div>
          </div>
        </div>

        <p className={styles.rationale}>{data.rationale}</p>
      </div>
    </section>
  );
}
