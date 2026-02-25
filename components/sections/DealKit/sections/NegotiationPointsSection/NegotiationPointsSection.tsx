import Icon from '@components/ui/Icon/Icon';
import type { NegotiationPoint } from '../../../../../app/src/data/dealKitTypes';
import styles from './NegotiationPointsSection.module.css';

interface NegotiationPointsSectionProps {
  points: NegotiationPoint[];
}

export default function NegotiationPointsSection({
  points,
}: NegotiationPointsSectionProps) {
  return (
    <section id="negotiation" className={styles.section}>
      <h2 className={styles.heading}>Negotiation Talking Points</h2>
      <div className={styles.cards}>
        {points.map((p) => (
          <div key={p.id} className={styles.card}>
            <div className={styles.quoteBar} />
            <div className={styles.cardContent}>
              <p className={styles.point}>{p.point}</p>
              <div className={styles.contextRow}>
                <Icon name="lightbulb" size={14} />
                <span className={styles.context}>{p.context}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
