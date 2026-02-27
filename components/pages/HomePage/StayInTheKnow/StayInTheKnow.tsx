import { useState } from 'react';
import Icon from '@components/ui/Icon/Icon';
import {
  articleCategories,
  articles,
  type ArticleCategoryId,
} from '../../../../app/src/data/homepageData';
import styles from './StayInTheKnow.module.css';

export default function StayInTheKnow() {
  const [activeCategory, setActiveCategory] =
    useState<ArticleCategoryId>('owner-reviews');

  const filtered = articles.filter((a) => a.category === activeCategory);
  const featured = filtered.find((a) => a.featured);
  const sideArticles = filtered.filter((a) => !a.featured);

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Stay in the know</h2>

      <nav className={styles.tabs}>
        {articleCategories.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.tab} ${activeCategory === cat.id ? styles.tabActive : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      <div className={styles.content}>
        {featured && (
          <div className={styles.featuredCard}>
            <img
              className={styles.featuredImage}
              src={featured.image}
              alt={featured.title}
            />
            <div className={styles.featuredOverlay} />
            <div className={styles.featuredBody}>
              {featured.categoryLabel && (
                <span className={styles.tag}>{featured.categoryLabel}</span>
              )}
              <h3 className={styles.featuredTitle}>{featured.title}</h3>
              {featured.description && (
                <p className={styles.featuredDescription}>
                  {featured.description}
                </p>
              )}
            </div>
          </div>
        )}

        <div className={styles.sideList}>
          {sideArticles.map((article) => (
            <div key={article.id} className={styles.sideCard}>
              <div className={styles.sideCardText}>
                <span className={styles.sideCategory}>
                  {article.categoryLabel}
                </span>
                <h4 className={styles.sideTitle}>{article.title}</h4>
              </div>
              <button className={styles.arrowButton} aria-label="Read article">
                <Icon name="chevron_right" size={24} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
