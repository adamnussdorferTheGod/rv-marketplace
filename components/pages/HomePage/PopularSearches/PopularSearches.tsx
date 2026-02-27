import { useState } from 'react';
import AdSlot from '@components/ui/AdSlot/AdSlot';
import {
  popularSearchCategories,
  popularSearches,
  type PopularSearchTab,
} from '../../../../app/src/data/homepageData';
import styles from './PopularSearches.module.css';

export default function PopularSearches() {
  const [activeTab, setActiveTab] = useState<PopularSearchTab>('makes');
  const items = popularSearches[activeTab];

  return (
    <section className={styles.section}>
      <div className={styles.main}>
        <h2 className={styles.heading}>Popular searches</h2>

        <div className={styles.content}>
          <nav className={styles.tabs}>
            {popularSearchCategories.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.tab} ${activeTab === cat.id ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          <div className={styles.grid}>
            {items.map((item) => (
              <a key={item.name} className={styles.item} href="#">
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemCount}>
                  {item.label} ({item.count})
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.adContainer}>
        <AdSlot width={300} height={250} variant={3} />
      </div>

      <div className={styles.bannerAd}>
        <AdSlot width={728} height={90} variant={1} />
      </div>
    </section>
  );
}
