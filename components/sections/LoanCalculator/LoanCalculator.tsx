import Icon from '@components/ui/Icon/Icon';
import styles from './LoanCalculator.module.css';

interface LoanCalculatorProps {
  loanMonthlyPayment: number;
  dealerName: string;
  dealerPhone: string;
}

export default function LoanCalculator({ loanMonthlyPayment, dealerName, dealerPhone }: LoanCalculatorProps) {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Loan calculator</h2>
      <p className={styles.subtitle}>
        Determine the monthly cost of financing your RV purchase. Adjust the terms to fit your budget.
      </p>

      <div className={styles.paymentDisplay}>
        <p className={styles.paymentAmount}>${loanMonthlyPayment}/mo</p>
        <p className={styles.paymentLabel}>Est. payment*</p>
      </div>

      <div className={styles.contactPrompt}>
        <p className={styles.contactText}>Questions about payment options?</p>
        <p className={styles.contactText}>
          Contact {dealerName} at <Icon name="call" size={16} /> {dealerPhone}
        </p>
        <button className={styles.ctaButton}>Get financing</button>
      </div>

      <p className={styles.disclaimer}>
        *Estimated monthly payment based on 240-month term at 7.99% APR with 20% down. Actual rate and terms may vary. Contact dealer for details.
      </p>
    </div>
  );
}
