import Icon from '../../../ui/Icon/Icon';
import styles from './PAACard.module.css';

interface PAACardProps {
  question: string;
  answer: string;
}

export default function PAACard({ question, answer }: PAACardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.headerRow}>
        <span className={styles.label}>People also ask</span>
        <Icon name="expand_more" size={20} className={styles.chevron} />
      </div>
      <h3 className={styles.question}>{question}</h3>
      <p className={styles.answer}>{answer}</p>
    </article>
  );
}
