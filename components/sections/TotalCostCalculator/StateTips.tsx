import type { StateTip, TipType } from './stateTipEngine';
import Icon from '@components/ui/Icon/Icon';
import styles from './StateTips.module.css';

interface StateTipsProps {
  tips: StateTip[];
}

const TIP_ICON: Record<TipType, string> = {
  info: 'info',
  savings: 'savings',
  warning: 'warning',
};

export default function StateTips({ tips }: StateTipsProps) {
  if (tips.length === 0) return null;

  return (
    <div className={styles.tips}>
      {tips.map((tip, i) => (
        <div key={i} className={styles.tip} data-tip-type={tip.type}>
          <span className={styles.tipIcon} data-tip-type={tip.type}>
            <Icon name={TIP_ICON[tip.type]} size={20} />
          </span>
          <div className={styles.tipContent}>
            <p className={styles.tipTitle}>{tip.title}</p>
            <p className={styles.tipBody}>{tip.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
