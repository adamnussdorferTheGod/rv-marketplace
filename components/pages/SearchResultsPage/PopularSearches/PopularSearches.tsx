import { useState } from 'react';
import { POPULAR_SEARCHES } from './popularSearchesData';
import styles from './PopularSearches.module.css';

export default function PopularSearches() {
  const [activeTab, setActiveTab] = useState(0);
  const activeCategory = POPULAR_SEARCHES[activeTab];

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Popular searches</h2>

      <div className={styles.tabs} role="tablist">
        {POPULAR_SEARCHES.map((category, index) => (
          <button
            key={category.label}
            type="button"
            role="tab"
            aria-selected={index === activeTab}
            className={`${styles.tab}${index === activeTab ? ` ${styles.tabActive}` : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className={styles.grid} role="tabpanel">
        {activeCategory.links.map((link) => (
          <a key={link.term} href="#" className={styles.link}>
            {link.term} <span className={styles.count}>({link.count})</span>
          </a>
        ))}
      </div>
    </section>
  );
}
