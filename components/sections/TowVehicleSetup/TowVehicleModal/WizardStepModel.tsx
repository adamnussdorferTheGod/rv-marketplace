import { getAvailableModels } from '../../../../app/src/data/towVehicleDatabase';
import type { Selections } from './useWizardSteps';
import WizardOptionCard from './WizardOptionCard';
import styles from './TowVehicleModal.module.css';

interface WizardStepModelProps {
  selections: Selections;
  onSelect: (value: string) => void;
}

export default function WizardStepModel({ selections, onSelect }: WizardStepModelProps) {
  const models = (selections.year && selections.make)
    ? getAvailableModels(selections.year, selections.make)
    : [];

  return (
    <div className={styles.stepContent}>
      <h2 className={styles.stepHeadingCenter}>What model?</h2>
      <div className={styles.optionGrid}>
        {models.map(model => (
          <WizardOptionCard
            key={model}
            label={model}
            selected={selections.model === model}
            onClick={() => onSelect(model)}
          />
        ))}
      </div>
    </div>
  );
}
