import { useRef, useEffect, useState } from 'react';
import styles from './AnimatedValue.module.css';

interface AnimatedValueProps {
  value: number;
  prefix?: string;
  duration?: number;
}

const CHAR_SET = '0123456789,';

function formatNumber(value: number): string {
  return value.toLocaleString('en-US');
}

export default function AnimatedValue({
  value,
  prefix = '$',
  duration = 400,
}: AnimatedValueProps) {
  const prevValueRef = useRef(value);
  const [displayValue, setDisplayValue] = useState(formatNumber(value));
  const [prevDisplay, setPrevDisplay] = useState(formatNumber(value));
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (value !== prevValueRef.current) {
      setPrevDisplay(formatNumber(prevValueRef.current));
      setDisplayValue(formatNumber(value));
      prevValueRef.current = value;

      if (!reducedMotion) {
        setIsAnimating(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setIsAnimating(false);
        }, duration);
      }
    }
  }, [value, duration, reducedMotion]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const formattedValue = `${prefix}${displayValue}`;

  // If reduced motion or not animating and values match, render static
  if (reducedMotion) {
    return (
      <span className={styles.wrapper} aria-label={formattedValue}>
        {formattedValue}
      </span>
    );
  }

  const chars = displayValue.split('');

  return (
    <span
      className={styles.wrapper}
      aria-label={formattedValue}
      style={{ '--animation-duration': `${duration}ms` } as React.CSSProperties}
    >
      <span className={styles.prefix}>{prefix}</span>
      {chars.map((char, i) => {
        const charIndex = CHAR_SET.indexOf(char);

        if (charIndex === -1) {
          // Non-digit/non-comma character — render static
          return (
            <span key={`static-${i}`} className={styles.digit}>
              {char}
            </span>
          );
        }

        return (
          <span key={`col-${i}`} className={styles.digitContainer}>
            <span
              className={styles.digitStrip}
              style={{
                transform: `translateY(-${charIndex * 1}em)`,
              }}
            >
              {CHAR_SET.split('').map((c) => (
                <span key={c} className={styles.digit}>
                  {c}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
