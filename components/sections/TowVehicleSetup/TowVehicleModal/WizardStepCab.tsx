import { getAvailableCabs } from '../../../../app/src/data/towVehicleDatabase';
import type { Selections } from './useWizardSteps';
import Icon from '@components/ui/Icon/Icon';
import styles from './TowVehicleModal.module.css';

interface WizardStepCabProps {
  selections: Selections;
  onSelect: (value: string) => void;
}

/** Map cab names to helpful descriptions */
const CAB_INFO: Record<string, { doors: string; note: string }> = {
  'SuperCrew':    { doors: '4 full doors',   note: 'Most passenger room' },
  'SuperCab':     { doors: '2+2 doors',      note: 'Rear jump seats' },
  'Regular Cab':  { doors: '2 doors',        note: 'Most bed length' },
  'Crew Cab':     { doors: '4 full doors',   note: 'Most passenger room' },
  'Quad Cab':     { doors: '4 doors',        note: 'Smaller rear doors' },
  'Mega Cab':     { doors: '4 full doors',   note: 'Largest interior' },
  'Double Cab':   { doors: '4 doors',        note: 'Shorter rear doors' },
  'CrewMax':      { doors: '4 full doors',   note: 'Most passenger room' },
  'Access Cab':   { doors: '2+2 doors',      note: 'Rear jump seats' },
};

function getCabInfo(cab: string) {
  return CAB_INFO[cab] ?? { doors: '', note: '' };
}

export default function WizardStepCab({ selections, onSelect }: WizardStepCabProps) {
  const cabs = (selections.year && selections.make && selections.model && selections.trim && selections.engine)
    ? getAvailableCabs(selections.year, selections.make, selections.model, selections.trim, selections.engine)
    : [];

  return (
    <div className={styles.stepContent}>
      <h2 className={styles.stepHeadingCenter}>What cab style?</h2>
      <div className={styles.richList}>
        {cabs.map((cab, i) => {
          const selected = selections.cab === cab;
          const info = getCabInfo(cab);
          return (
            <button
              key={cab}
              type="button"
              className={`${styles.richCard} ${selected ? styles.richCardSelected : ''}`}
              onClick={() => onSelect(cab)}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className={styles.richCardTop}>
                <span className={styles.richCardTitle}>{cab}</span>
                {selected && (
                  <span className={styles.richCardCheck}>
                    <Icon name="check" size={16} />
                  </span>
                )}
              </div>
              {(info.doors || info.note) && (
                <div className={styles.richCardMeta}>
                  {info.doors && <span>{info.doors}</span>}
                  {info.doors && info.note && <span className={styles.richCardDot}>·</span>}
                  {info.note && <span>{info.note}</span>}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
