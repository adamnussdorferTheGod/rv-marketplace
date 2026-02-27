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
    <CollapsibleSection title="RV type">
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
                      width="14"
                      height="12"
                      viewBox="0 0 14 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 6L5 10L13 2"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span className={styles.labelText}>{option.label}</span>
              </label>
              <img
                className={styles.thumbnail}
                src={option.thumbnail}
                alt={option.label}
                loading="lazy"
              />
            </li>
          );
        })}
      </ul>
    </CollapsibleSection>
  );
}
