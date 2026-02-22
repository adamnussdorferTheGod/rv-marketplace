import AdSlot from '@components/ui/AdSlot/AdSlot';
import styles from './AdSenseSection.module.css';

export default function AdSenseSection() {
  return (
    <section className={styles.section}>
      <div className={styles.adStack}>
        <AdSlot width={1120} height={424} label="Ad Sense" />
        <AdSlot width={1120} height={424} label="Ad Sense" />
      </div>
    </section>
  );
}
