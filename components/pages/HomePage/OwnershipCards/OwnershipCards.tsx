import { ownershipCards } from '../../../../app/src/data/homepageData';
import Icon from '@components/ui/Icon/Icon';
import styles from './OwnershipCards.module.css';

export default function OwnershipCards() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Making RV ownership easy</h2>
      <div className={styles.grid}>
        {ownershipCards.map((card) => (
          <div key={card.id} className={styles.card}>
            <div className={styles.illustration}>
              <Icon name={card.icon} size={28} />
            </div>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardDescription}>{card.description}</p>
            <button className={styles.learnMore} type="button">
              {card.ctaText}
              <Icon name="chevron_right" size={16} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
