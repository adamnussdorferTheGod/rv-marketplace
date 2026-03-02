import styles from './PaymentCalculator.module.css';

interface DownPaymentToggleProps {
  mode: '$' | '%';
  onToggle: (mode: '$' | '%') => void;
}

export default function DownPaymentToggle({ mode, onToggle }: DownPaymentToggleProps) {
  const isDollar = mode === '$';

  return (
    <button
      type="button"
      className={styles.switch}
      onClick={() => onToggle(isDollar ? '%' : '$')}
      aria-label={`Switch to ${isDollar ? 'percentage' : 'dollar'} mode`}
    >
      {/* Sliding indicator thumb */}
      <span
        className={styles.switchThumb}
        style={{ left: isDollar ? 3 : 37 }}
      />
      {/* Dollar icon */}
      <span className={`${styles.switchIcon} ${styles.switchIconLeft} ${isDollar ? styles.switchIconActive : ''}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
        </svg>
      </span>
      {/* Percent icon */}
      <span className={`${styles.switchIcon} ${styles.switchIconRight} ${!isDollar ? styles.switchIconActive : ''}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.5 11C9.43 11 11 9.43 11 7.5S9.43 4 7.5 4 4 5.57 4 7.5 5.57 11 7.5 11zm0-5C8.33 6 9 6.67 9 7.5S8.33 9 7.5 9 6 8.33 6 7.5 6.67 6 7.5 6zM16.5 13c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5.41 20L4 18.59 18.59 4 20 5.41 5.41 20z" />
        </svg>
      </span>
    </button>
  );
}
