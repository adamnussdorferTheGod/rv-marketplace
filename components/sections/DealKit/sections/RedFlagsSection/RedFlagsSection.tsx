import Icon from '@components/ui/Icon/Icon';
import type { RedFlagCard, RiskLevel } from '../../../../../app/src/data/dealKitTypes';
import styles from './RedFlagsSection.module.css';

interface RedFlagsSectionProps {
  flags: RedFlagCard[];
}

const LEVEL_ICONS: Record<RiskLevel, string> = {
  red: 'flag_filled',
  yellow: 'flag_filled',
  green: 'check_filled',
};

export default function RedFlagsSection({ flags }: RedFlagsSectionProps) {
  return (
    <section id="red-flags" className={styles.section}>
      <h2 className={styles.heading}>Red Flags & Alerts</h2>
      <div className={styles.cards}>
        {flags.map((flag) => (
          <div key={flag.id} className={`${styles.card} ${styles[flag.level]}`}>
            <div className={styles.iconWrap}>
              <Icon name={LEVEL_ICONS[flag.level]} size={20} />
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{flag.title}</h3>
              <p className={styles.detail}>{flag.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
