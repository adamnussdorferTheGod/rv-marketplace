import { getAvailableMakes } from '../../../../app/src/data/towVehicleDatabase';
import type { Selections } from './useWizardSteps';
import BrandLogo from './brandLogos';
import styles from './TowVehicleModal.module.css';

interface WizardStepMakeProps {
  selections: Selections;
  onSelect: (value: string) => void;
}

export default function WizardStepMake({ selections, onSelect }: WizardStepMakeProps) {
  const makes = selections.year ? getAvailableMakes(selections.year) : [];

  return (
    <div className={styles.stepContent}>
      <h2 className={styles.stepHeadingCenter}>Select a make</h2>
      <div className={styles.makeList}>
        {makes.map(make => (
          <button
            key={make}
            type="button"
            className={`${styles.makeRow} ${selections.make === make ? styles.makeRowSelected : ''}`}
            onClick={() => onSelect(make)}
          >
            <BrandLogo make={make} size={32} />
            <span className={styles.makeName}>{make}</span>
            <svg className={styles.popularChevron} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
