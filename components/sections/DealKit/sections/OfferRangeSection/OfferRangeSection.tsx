import { useEffect, useRef, useState } from 'react';
import type { OfferRangeData } from '../../../../../app/src/data/dealKitTypes';
import styles from './OfferRangeSection.module.css';

interface OfferRangeSectionProps {
  data: OfferRangeData;
}

function AnimatedAmount({ amount }: { amount: number }) {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const start = amount - 5000;
          let current = start;
          const step = 5000 / 30;
          const timer = setInterval(() => {
            current += step;
            if (current >= amount) {
              setDisplayed(amount);
              clearInterval(timer);
            } else {
              setDisplayed(Math.round(current));
            }
          }, 30);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [amount]);

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(displayed);

  return <span ref={ref} className={styles.amount}>{formatted}</span>;
}

export default function OfferRangeSection({ data }: OfferRangeSectionProps) {
  const tiers = [
    { ...data.opening, tier: 'opening' as const },
    { ...data.target, tier: 'target' as const },
    { ...data.walkAway, tier: 'walkaway' as const },
  ];

  const min = data.opening.amount;
  const max = data.listPrice;
  const range = max - min;

  return (
    <section id="offer-range" className={styles.section}>
      <h2 className={styles.heading}>Offer Range</h2>
      <div className={styles.card}>
        {/* Visual range bar */}
        <div className={styles.rangeBar}>
          <div className={styles.rangeTrack}>
            {tiers.map((t) => {
              const pct = ((t.amount - min) / range) * 100;
              return (
                <div
                  key={t.tier}
                  className={`${styles.rangeMarker} ${styles[t.tier]}`}
                  style={{ left: `${pct}%` }}
                >
                  <div className={styles.markerDot} />
                </div>
              );
            })}
            <div className={styles.rangeFill} style={{ width: `${((data.walkAway.amount - min) / range) * 100}%` }} />
          </div>
          <div className={styles.rangeLabels}>
            <span>${(min / 1000).toFixed(0)}K</span>
            <span>${(max / 1000).toFixed(0)}K List</span>
          </div>
        </div>

        {/* Tier cards */}
        <div className={styles.tiers}>
          {tiers.map((t) => (
            <div key={t.tier} className={`${styles.tierCard} ${styles[t.tier]}`}>
              <span className={styles.tierLabel}>{t.label}</span>
              <AnimatedAmount amount={t.amount} />
              <p className={styles.tierDesc}>{t.description}</p>
            </div>
          ))}
        </div>

        <p className={styles.rationale}>{data.rationale}</p>
      </div>
    </section>
  );
}
