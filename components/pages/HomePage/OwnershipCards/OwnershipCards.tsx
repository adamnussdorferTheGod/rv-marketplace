import { ownershipCards } from '../../../../app/src/data/homepageData';
import styles from './OwnershipCards.module.css';

export default function OwnershipCards() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Making RV ownership easy</h2>
      <div className={styles.grid}>
        {ownershipCards.map((card) => (
          <div key={card.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img
                src={card.image}
                alt={card.title}
                className={styles.image}
              />
            </div>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardDescription}>{card.description}</p>
            <button className={styles.ctaButton} type="button">
              {card.ctaText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
