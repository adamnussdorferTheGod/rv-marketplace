import type { RVType } from '@app/src/data/srpTypes.ts';
import CollapsibleSection from './CollapsibleSection';
import { RV_TYPE_OPTIONS } from './filterData';
import styles from './RVTypeFilter.module.css';

interface RVTypeFilterProps {
  selectedTypes: RVType[];
  onToggle: (type: RVType) => void;
}

export default function RVTypeFilter({
  selectedTypes,
  onToggle,
}: RVTypeFilterProps) {
  return (
    <CollapsibleSection title="RV Type">
      <ul className={styles.list}>
        {RV_TYPE_OPTIONS.map((option) => {
          const isChecked = selectedTypes.includes(option.value);
          return (
            <li key={option.value} className={styles.row}>
              <label className={styles.label}>
                <input
                  type="checkbox"
                  className={styles.hiddenCheckbox}
                  checked={isChecked}
                  onChange={() => onToggle(option.value)}
                />
                <span
                  className={`${styles.checkbox}${isChecked ? ` ${styles.checkboxChecked}` : ''}`}
                  aria-hidden="true"
                >
                  {isChecked && (
                    <svg
                      width="12"
                      height="10"
                      viewBox="0 0 12 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5L4.5 8.5L11 1.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <img
                  className={styles.thumbnail}
                  src={option.thumbnail}
                  alt={option.label}
                  loading="lazy"
                />
                <span className={styles.labelText}>{option.label}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </CollapsibleSection>
  );
}
