import { getTrimSummaries } from '../../../../app/src/data/towVehicleDatabase';
import type { Selections } from './useWizardSteps';
import Icon from '@components/ui/Icon/Icon';
import styles from './TowVehicleModal.module.css';

interface WizardStepTrimProps {
  selections: Selections;
  onSelect: (value: string) => void;
}

const DOT_COUNT = 5;

function formatTow(lbs: number) {
  return lbs >= 1000 ? `${(lbs / 1000).toFixed(1).replace(/\.0$/, '')}k` : `${lbs}`;
}

function DotScale({ filled }: { filled: number }) {
  return (
    <span className={styles.dotScale}>
      {Array.from({ length: DOT_COUNT }, (_, i) => (
        <span
          key={i}
          className={i < filled ? styles.dotFilled : styles.dotEmpty}
        />
      ))}
    </span>
  );
}

export default function WizardStepTrim({ selections, onSelect }: WizardStepTrimProps) {
  const summaries = (selections.make && selections.model)
    ? getTrimSummaries(selections.make, selections.model)
    : [];

  const globalMax = Math.max(...summaries.map(s => s.maxTow), 1);

  return (
    <div className={styles.stepContent}>
      <h2 className={styles.stepHeadingCenter}>What trim level?</h2>
      <div className={styles.trimList}>
        {summaries.map((s, i) => {
          const selected = selections.trim === s.trim;
          const filledDots = Math.max(Math.round((s.maxTow / globalMax) * DOT_COUNT), 1);
          return (
            <button
              key={s.trim}
              type="button"
              className={`${styles.trimCard} ${selected ? styles.trimCardSelected : ''}`}
              onClick={() => onSelect(s.trim)}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className={styles.trimTop}>
                <span className={styles.trimName}>{s.trim}</span>
                {selected && (
                  <span className={styles.trimCheck}>
                    <Icon name="check" size={16} />
                  </span>
                )}
              </div>
              <div className={styles.trimMeta}>
                <span className={styles.trimTowLabel}>Up to {formatTow(s.maxTow)} lbs</span>
                <span className={styles.trimDot}>·</span>
                <span className={styles.trimEngines}>
                  {s.engineCount} engine{s.engineCount !== 1 ? 's' : ''}
                </span>
              </div>
              <div className={styles.trimDotRow}>
                <DotScale filled={filledDots} />
                <span className={styles.trimDotLabel}>Tow capacity</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
