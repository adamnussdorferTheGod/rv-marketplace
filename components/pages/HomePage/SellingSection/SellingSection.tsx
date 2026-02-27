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

const CARD_WIDTH = 696;
const GAP = 32;

export default function SellingSection() {
  const [activeTab, setActiveTab] = useState<SellingPanelId>('consignment');

  const activeIndex = sellingPanels.findIndex((p) => p.id === activeTab);

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
        <div className={styles.track}>
          {sellingPanels.map((panel, i) => {
            const offset = i - activeIndex;
            const isActive = offset === 0;
            const px = offset * (CARD_WIDTH + GAP);

            return (
              <div
                key={panel.id}
                className={`${styles.card} ${isActive ? styles.cardActive : styles.cardSide}`}
                style={{
                  transform: `translateX(${px}px)`,
                  zIndex: isActive ? 2 : 1,
                }}
                onClick={
                  !isActive ? () => setActiveTab(panel.id) : undefined
                }
              >
                <div className={styles.cardImageWrap}>
                  <img
                    className={styles.cardImage}
                    src={panel.image}
                    alt={panel.title}
                  />
                </div>
                <div className={styles.cardInfo}>
                  <div className={styles.cardText}>
                    <h3 className={styles.cardTitle}>{panel.title}</h3>
                    <p className={styles.cardDescription}>
                      {panel.description}
                    </p>
                  </div>
                  <button className={styles.ctaButton}>
                    {panel.ctaText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
