import Icon from '@components/ui/Icon/Icon';
import type { QuestionCard } from '../../../../../app/src/data/dealKitTypes';
import styles from './QuestionsSection.module.css';

interface QuestionsSectionProps {
  questions: QuestionCard[];
}

export default function QuestionsSection({ questions }: QuestionsSectionProps) {
  return (
    <section id="questions" className={styles.section}>
      <h2 className={styles.heading}>Questions to Ask</h2>
      <div className={styles.cards}>
        {questions.map((q, i) => (
          <div key={q.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.number}>{i + 1}</span>
              <h3 className={styles.question}>{q.question}</h3>
            </div>
            <div className={styles.rationaleRow}>
              <Icon name="lightbulb" size={16} />
              <p className={styles.rationale}>{q.rationale}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
