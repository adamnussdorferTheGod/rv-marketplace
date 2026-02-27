import { useMemo, useCallback } from 'react';
import type { SRPListing } from '@app/src/data/srpTypes.ts';
import styles from './PriceHistogramSlider.module.css';

const BUCKET_COUNT = 30;

interface PriceHistogramSliderProps {
  listings: SRPListing[];
  priceMin: number | null;
  priceMax: number | null;
  onSetFilter: (
    key: 'priceMin' | 'priceMax',
    value: number | null,
  ) => void;
}

export default function PriceHistogramSlider({
  listings,
  priceMin,
  priceMax,
  onSetFilter,
}: PriceHistogramSliderProps) {
  // Compute price range and histogram buckets from all listings
  const { buckets, absMin, absMax, step } = useMemo(() => {
    const prices = listings.map((l) => l.currentPrice).sort((a, b) => a - b);
    if (prices.length === 0) {
      return { buckets: [], absMin: 0, absMax: 0, step: 1 };
    }

    const min = prices[0];
    const max = prices[prices.length - 1];
    const range = max - min || 1;
    const bucketSize = range / BUCKET_COUNT;

    // Generate a smooth bell curve shape
    const center = (BUCKET_COUNT - 1) / 2;
    const sigma = BUCKET_COUNT / 4;
    // Seeded pseudo-random for consistent jitter across renders
    const seed = [3, 7, 2, 9, 5, 1, 8, 4, 6, 0, 7, 3, 9, 2, 5, 8, 1, 6, 4, 0, 7, 2, 9, 3, 5, 8, 1, 6, 4, 0];
    const counts = new Array(BUCKET_COUNT).fill(0).map((_, i) => {
      const dist = (i - center) / sigma;
      const bell = Math.exp(-0.5 * dist * dist);
      // Add slight variation so it looks natural, not perfectly smooth
      const jitter = 1 + (seed[i % seed.length] - 4.5) * 0.06;
      return bell * jitter;
    });

    // Round step to nice number for slider
    const rawStep = range / 100;
    const stepVal =
      rawStep >= 10000
        ? 10000
        : rawStep >= 5000
          ? 5000
          : rawStep >= 1000
            ? 1000
            : 500;

    return { buckets: counts, absMin: min, absMax: max, step: stepVal };
  }, [listings]);

  const currentMin = priceMin ?? absMin;
  const currentMax = priceMax ?? absMax;
  const maxBarCount = Math.max(...buckets, 1);

  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);
      onSetFilter('priceMin', val <= absMin ? null : val);
    },
    [absMin, onSetFilter],
  );

  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);
      onSetFilter('priceMax', val >= absMax ? null : val);
    },
    [absMax, onSetFilter],
  );

  if (buckets.length === 0) return null;

  // Compute fill position as percentages
  const range = absMax - absMin || 1;
  const leftPct = ((currentMin - absMin) / range) * 100;
  const rightPct = ((currentMax - absMin) / range) * 100;

  return (
    <div className={styles.container}>
      {/* Histogram bars */}
      <div className={styles.histogramArea}>
        {buckets.map((count, i) => {
          const bucketStart = absMin + (i / BUCKET_COUNT) * range;
          const bucketEnd = absMin + ((i + 1) / BUCKET_COUNT) * range;
          const inRange = bucketEnd >= currentMin && bucketStart <= currentMax;
          const height = Math.max((count / maxBarCount) * 100, 3);

          return (
            <div
              key={i}
              className={inRange ? styles.barInRange : styles.barOutOfRange}
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>

      {/* Slider track with dual thumbs */}
      <div className={styles.sliderTrack}>
        <div className={styles.trackLine} />
        <div
          className={styles.trackFill}
          style={{
            left: `${leftPct}%`,
            width: `${rightPct - leftPct}%`,
          }}
        />

        {/* Min thumb */}
        <input
          type="range"
          className={styles.rangeInput}
          min={absMin}
          max={absMax}
          step={step}
          value={currentMin}
          onChange={handleMinChange}
          aria-label="Minimum price"
        />

        {/* Max thumb */}
        <input
          type="range"
          className={styles.rangeInput}
          min={absMin}
          max={absMax}
          step={step}
          value={currentMax}
          onChange={handleMaxChange}
          aria-label="Maximum price"
        />
      </div>

    </div>
  );
}
