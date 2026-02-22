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
      <div className={styles.accentBar} />
      <div className={styles.content}>
        <h3 className={styles.heading}>Willing to negotiate</h3>
        <p className={styles.subtext}>
          The seller has indicated willingness to negotiate on price.
        </p>
      </div>
    </div>
  );
}
