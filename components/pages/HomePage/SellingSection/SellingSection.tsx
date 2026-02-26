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
  const [activeTab, setActiveTab] = useState<SellingPanelId>('consignment');

  const activePanel = sellingPanels.find((p) => p.id === activeTab)!;

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

      <div className={styles.panel}>
        <img
          className={styles.panelImage}
          src={activePanel.image}
          alt={activePanel.title}
        />
        <div className={styles.panelContent}>
          <h3 className={styles.panelTitle}>{activePanel.title}</h3>
          <p className={styles.panelDescription}>{activePanel.description}</p>
          <button className={styles.ctaButton}>{activePanel.ctaText}</button>
        </div>
      </div>
    </section>
  );
}
