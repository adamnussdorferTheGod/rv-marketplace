import { getAvailableBeds } from '../../../../app/src/data/towVehicleDatabase';
import type { Selections } from './useWizardSteps';
import Icon from '@components/ui/Icon/Icon';
import styles from './TowVehicleModal.module.css';

interface WizardStepBedProps {
  selections: Selections;
  onSelect: (value: string) => void;
}

/** Parse "5.5 ft" → 5.5 */
function parseFeet(bed: string): number {
  const match = bed.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}

/** Classify bed length */
function bedLabel(ft: number): string {
  if (ft <= 5.5) return 'Short bed';
  if (ft <= 6.5) return 'Standard bed';
  return 'Long bed';
}

export default function WizardStepBed({ selections, onSelect }: WizardStepBedProps) {
  const beds = (selections.make && selections.model && selections.trim && selections.engine && selections.cab)
    ? getAvailableBeds(selections.make, selections.model, selections.trim, selections.engine, selections.cab)
    : [];

  const maxFt = Math.max(...beds.map(parseFeet), 1);

  return (
    <div className={styles.stepContent}>
      <h2 className={styles.stepHeadingCenter}>What bed length?</h2>
      <div className={styles.richList}>
        {beds.map((bed, i) => {
          const selected = selections.bed === bed;
          const ft = parseFeet(bed);
          const pct = Math.max((ft / maxFt) * 100, 30);
          const label = bedLabel(ft);
          return (
            <button
              key={bed}
              type="button"
              className={`${styles.richCard} ${selected ? styles.richCardSelected : ''}`}
              onClick={() => onSelect(bed)}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className={styles.richCardTop}>
                <span className={styles.richCardTitle}>{bed}</span>
                <div className={styles.richCardTopRight}>
                  <span className={styles.bedLabel}>{label}</span>
                  {selected && (
                    <span className={styles.richCardCheck}>
                      <Icon name="check" size={16} />
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.bedBarTrack}>
                <div
                  className={styles.bedBarFill}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
