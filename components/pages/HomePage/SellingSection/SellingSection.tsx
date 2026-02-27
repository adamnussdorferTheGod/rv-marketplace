import { useState, useEffect, useCallback, useRef } from 'react';
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

const AUTO_ADVANCE_MS = 5000;

export default function SellingSection() {
  const [activeTab, setActiveTab] = useState<SellingPanelId>('consignment');
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeIndex = sellingPanels.findIndex((p) => p.id === activeTab);

  const advance = useCallback(() => {
    setActiveTab((prev) => {
      const idx = sellingPanels.findIndex((p) => p.id === prev);
      return sellingPanels[(idx + 1) % sellingPanels.length].id;
    });
  }, []);

  // Auto-advance timer
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(advance, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeTab, paused, advance]);

  const handleTabChange = (id: SellingPanelId) => {
    setActiveTab(id);
    // Reset the auto-advance timer on manual interaction
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <section
      className={styles.section}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h2 className={styles.heading}>Selling made with you in mind</h2>

      <div className={styles.tabs}>
        <SegmentedButtons
          options={tabOptions}
          selected={activeTab}
          onChange={handleTabChange}
        />
      </div>

      <div className={styles.carousel}>
        <div className={styles.track}>
          {sellingPanels.map((panel, i) => {
            const offset = i - activeIndex;
            const isActive = offset === 0;

            return (
              <div
                key={panel.id}
                className={`${styles.card} ${isActive ? styles.cardActive : styles.cardSide}`}
                style={{
                  transform: `translateX(${offset * 100}%)`,
                  zIndex: isActive ? 2 : 1,
                }}
                onClick={
                  !isActive ? () => handleTabChange(panel.id) : undefined
                }
              >
                <div className={styles.cardImageWrap}>
                  <img
                    className={styles.cardImage}
                    src={panel.image}
                    alt={panel.title}
                  />
                </div>
                <div className={styles.cardDivider} />
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
