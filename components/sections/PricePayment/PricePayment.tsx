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

function formatDealRating(rating: string): string {
  return rating.charAt(0).toUpperCase() + rating.slice(1) + ' deal';
}

export default function PricePayment({
  currentPrice,
  originalPrice,
  monthlyPayment,
  dealRating,
}: PricePaymentProps) {
  return (
    <div className={styles.section}>
      <div className={styles.priceBlock}>
        <span className={styles.currentPrice}>{formatPrice(currentPrice)}</span>
        {originalPrice > currentPrice && (
          <span className={styles.originalPrice}>{formatPrice(originalPrice)}</span>
        )}
      </div>
      <div className={styles.divider} />
      <div className={styles.paymentBlock}>
        <span className={styles.paymentLabel}>Est. monthly payment</span>
        <span className={styles.paymentValue}>{formatPrice(monthlyPayment)}/mo</span>
      </div>
      <div className={styles.badge}>
        {formatDealRating(dealRating)}
      </div>
    </div>
  );
}
