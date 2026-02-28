import { useTowVehicle } from '../TowVehicleContext';
import Icon from '@components/ui/Icon/Icon';
import styles from './TowVehicleModal.module.css';

interface WizardStepExtrasProps {
  onContinue: () => void;
  onBack: () => void;
}

interface ExtraOption {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function WizardStepExtras({ onContinue, onBack }: WizardStepExtrasProps) {
  const { hasTowPackage, hasWDH, setHasTowPackage, setHasWDH } = useTowVehicle();

  const extras: ExtraOption[] = [
    {
      id: 'tow-package',
      title: 'Tow package',
      description: 'Factory-installed towing equipment (upgraded hitch, wiring, cooling)',
      checked: hasTowPackage,
      onChange: setHasTowPackage,
    },
    {
      id: 'wdh',
      title: 'Weight distribution hitch',
      description: 'Levels the load between your truck and trailer axles',
      checked: hasWDH,
      onChange: setHasWDH,
    },
  ];

  return (
    <div className={styles.stepContent}>
      <h2 className={styles.stepHeadingCenter}>Any extras?</h2>
      <p className={styles.stepSubtextCenter}>
        These affect your tow capacity calculations
      </p>

      <div className={styles.richList}>
        {extras.map((extra, i) => (
          <button
            key={extra.id}
            type="button"
            className={`${styles.richCard} ${extra.checked ? styles.richCardSelected : ''}`}
            onClick={() => extra.onChange(!extra.checked)}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className={styles.richCardTop}>
              <span className={styles.richCardTitle}>{extra.title}</span>
              {extra.checked && (
                <span className={styles.richCardCheck}>
                  <Icon name="check" size={16} />
                </span>
              )}
            </div>
            <div className={styles.richCardMeta}>
              <span>{extra.description}</span>
            </div>
          </button>
        ))}
      </div>

      <div className={styles.buttonRow}>
        <button type="button" className={styles.backBtnInline} onClick={onBack}>
          <Icon name="chevron_left" size={18} />
          Back
        </button>
        <button type="button" className={styles.continueBtn} onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}
