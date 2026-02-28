import { useState, useMemo } from 'react';
import { getAvailableYears } from '../../../../app/src/data/towVehicleDatabase';
import type { Selections } from './useWizardSteps';
import WizardOptionCard from './WizardOptionCard';
import styles from './TowVehicleModal.module.css';

const INITIAL_YEARS_SHOWN = 10;

interface WizardStepYearProps {
  selections: Selections;
  onSelect: (value: string) => void;
}

export default function WizardStepYear({ selections, onSelect }: WizardStepYearProps) {
  const [showAll, setShowAll] = useState(false);

  const allYears = getAvailableYears();
  const currentYear = new Date().getFullYear();

  const displayYears = useMemo(() => {
    if (showAll) return allYears;
    const yearsSet = new Set(allYears);
    return Array.from({ length: INITIAL_YEARS_SHOWN }, (_, i) => currentYear - i)
      .filter(y => yearsSet.has(y));
  }, [allYears, currentYear, showAll]);

  const hasMore = !showAll && allYears.length > displayYears.length;

  return (
    <div className={styles.stepContent}>
      <h2 className={styles.stepHeadingCenter}>What year is your vehicle?</h2>
      <div className={styles.optionGrid}>
        {displayYears.map(year => (
          <WizardOptionCard
            key={year}
            label={String(year)}
            selected={selections.year === year}
            onClick={() => onSelect(String(year))}
          />
        ))}
      </div>
      {hasMore && (
        <button
          type="button"
          className={styles.viewMoreLink}
          onClick={() => setShowAll(true)}
        >
          View more years
        </button>
      )}
    </div>
  );
}
