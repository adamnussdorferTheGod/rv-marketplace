import Icon from '@components/ui/Icon/Icon';
import Button from '@components/ui/Button/Button';
import styles from './WillingToNegotiate.module.css';

interface WillingToNegotiateProps {
  isNegotiable: boolean;
}

export default function WillingToNegotiate({ isNegotiable }: WillingToNegotiateProps) {
  if (!isNegotiable) {
    return null;
  }

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <Icon name="handshake" size={24} />
          <h3 className={styles.heading}>Willing to negotiate</h3>
        </div>
        <p className={styles.subtext}>
          Secure the right deal for your budget.
        </p>
      </div>
      <Button variant="tertiary" size="lg" className={styles.offerButton}>
        Make an offer
      </Button>
    </div>
  );
}
