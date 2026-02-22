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

function getBadgeLabel(rating: string): string {
  switch (rating) {
    case 'low':
      return 'Low price';
    case 'good':
      return 'Low price';
    case 'fair':
      return 'Fair price';
    case 'high':
      return 'High price';
    default:
      return 'Low price';
  }
}

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
      <div className={styles.badge}>
        <span className={styles.badgeIcon}>
          <Icon name="arrow_downward" size={14} />
        </span>
        {getBadgeLabel(dealRating)}
      </div>
    </div>
  );
}
