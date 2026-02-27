import { useState } from 'react';
import SegmentedButtons from '@components/ui/SegmentedButtons/SegmentedButtons';
import {
  sellingPanels,
  type SellingPanelId,
} from '../../../../app/src/data/homepageData';
import styles from './SellingSection.module.css';

const tabOptions = sellingPanels.map((p) => ({
  value: p.id,
  label: p.tabLabel,
}));

export default function SellingSection() {
  const [activeTab, setActiveTab] = useState<SellingPanelId>('sell-privately');

  const activeIndex = sellingPanels.findIndex((p) => p.id === activeTab);
  const prevIndex =
    (activeIndex - 1 + sellingPanels.length) % sellingPanels.length;
  const nextIndex = (activeIndex + 1) % sellingPanels.length;

  const prevPanel = sellingPanels[prevIndex];
  const activePanel = sellingPanels[activeIndex];
  const nextPanel = sellingPanels[nextIndex];

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Selling made with you in mind</h2>

      <div className={styles.tabs}>
        <SegmentedButtons
          options={tabOptions}
          selected={activeTab}
          onChange={setActiveTab}
        />
      </div>

      <div className={styles.carousel}>
        {/* Previous (left peek) */}
        <div
          className={`${styles.card} ${styles.cardSide}`}
          onClick={() => setActiveTab(prevPanel.id)}
        >
          <div className={styles.cardImageWrap}>
            <img
              className={styles.cardImage}
              src={prevPanel.image}
              alt={prevPanel.title}
            />
          </div>
          <div className={styles.cardInfo}>
            <div className={styles.cardText}>
              <h3 className={styles.cardTitle}>{prevPanel.title}</h3>
              <p className={styles.cardDescription}>{prevPanel.description}</p>
            </div>
          </div>
        </div>

        {/* Active (center) */}
        <div className={`${styles.card} ${styles.cardActive}`}>
          <div className={styles.cardImageWrap}>
            <img
              className={styles.cardImage}
              src={activePanel.image}
              alt={activePanel.title}
            />
          </div>
          <div className={styles.cardDivider} />
          <div className={styles.cardInfo}>
            <div className={styles.cardText}>
              <h3 className={styles.cardTitle}>{activePanel.title}</h3>
              <p className={styles.cardDescription}>
                {activePanel.description}
              </p>
            </div>
            <button className={styles.ctaButton}>{activePanel.ctaText}</button>
          </div>
        </div>

        {/* Next (right peek) */}
        <div
          className={`${styles.card} ${styles.cardSide}`}
          onClick={() => setActiveTab(nextPanel.id)}
        >
          <div className={styles.cardImageWrap}>
            <img
              className={styles.cardImage}
              src={nextPanel.image}
              alt={nextPanel.title}
            />
          </div>
          <div className={styles.cardInfo}>
            <div className={styles.cardText}>
              <h3 className={styles.cardTitle}>{nextPanel.title}</h3>
              <p className={styles.cardDescription}>{nextPanel.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
