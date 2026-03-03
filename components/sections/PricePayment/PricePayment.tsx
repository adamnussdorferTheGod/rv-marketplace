import Icon from '@components/ui/Icon/Icon';
import styles from './PricePayment.module.css';

interface PricePaymentProps {
  currentPrice: number;
  originalPrice: number;
  monthlyPayment: number;
  dealRating: string;
}

function formatPrice(value: number): string {
  return '$' + value.toLocaleString('en-US');
}

const DEAL_BADGE: Record<string, { label: string; icon: string; bg: string; iconBg: string; text: string }> = {
  great: { label: 'Well below market price', icon: 'arrow_downward', bg: '#e9f7f7', iconBg: '#036c6c', text: '#036c6c' },
  good:  { label: 'Below market price',      icon: 'south_east',    bg: '#e4fbed', iconBg: '#49a46c', text: '#49a46c' },
  fair:  { label: 'Around market price',      icon: 'arrow_forward', bg: '#f9fbe4', iconBg: '#acb646', text: '#7f872a' },
};

export default function PricePayment({
  currentPrice,
  originalPrice,
  dealRating,
}: PricePaymentProps) {
  return (
    <div className={styles.section}>
      <div className={styles.priceRow}>
        <span className={styles.currentPrice}>{formatPrice(currentPrice)}</span>
        {originalPrice > currentPrice && (
          <span className={styles.originalPrice}>{formatPrice(originalPrice)}</span>
        )}
        <div className={styles.divider} />
        <a href="#" className={styles.paymentLink}>Est. monthly payment</a>
      </div>
      {DEAL_BADGE[dealRating] && (
        <div
          className={styles.badge}
          style={{ background: DEAL_BADGE[dealRating].bg, color: DEAL_BADGE[dealRating].text }}
        >
          <span
            className={styles.badgeIcon}
            style={{ background: DEAL_BADGE[dealRating].iconBg }}
          >
            <Icon name={DEAL_BADGE[dealRating].icon} size={14} />
          </span>
          {DEAL_BADGE[dealRating].label}
        </div>
      )}
    </div>
  );
}
