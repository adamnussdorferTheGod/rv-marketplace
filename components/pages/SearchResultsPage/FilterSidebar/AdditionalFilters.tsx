import type { FilterCriteria, FuelType } from '@app/src/data/srpTypes.ts';
import CollapsibleSection from './CollapsibleSection';
import styles from './AdditionalFilters.module.css';

interface AdditionalFiltersProps {
  filters: FilterCriteria;
  setFilter: <K extends keyof FilterCriteria>(
    key: K,
    value: FilterCriteria[K],
  ) => void;
  toggleArrayFilter: <K extends keyof FilterCriteria>(
    key: K,
    value: string,
  ) => void;
}

const FUEL_TYPE_OPTIONS: { value: FuelType; label: string }[] = [
  { value: 'gas', label: 'Gas' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'electric', label: 'Electric' },
  { value: 'n/a', label: 'N/A' },
];

const FLOOR_PLAN_OPTIONS: string[] = [
  'Bunkhouse',
  'Rear living',
  'Front living',
  'Rear kitchen',
  'Mid-bunk',
  'Toy hauler garage',
  'Open concept',
];

export default function AdditionalFilters({
  filters,
  setFilter,
  toggleArrayFilter,
}: AdditionalFiltersProps) {
  return (
    <>
      {/* 1. Year */}
      <CollapsibleSection title="Year" defaultOpen={false}>
        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Min year</label>
            <input
              className={styles.input}
              type="number"
              placeholder="2015"
              value={filters.yearMin ?? ''}
              onChange={(e) =>
                setFilter(
                  'yearMin',
                  e.target.value ? Number(e.target.value) : null,
                )
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Max year</label>
            <input
              className={styles.input}
              type="number"
              placeholder="2026"
              value={filters.yearMax ?? ''}
              onChange={(e) =>
                setFilter(
                  'yearMax',
                  e.target.value ? Number(e.target.value) : null,
                )
              }
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Length */}
      <CollapsibleSection title="Length" defaultOpen={false}>
        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Min (ft)</label>
            <input
              className={styles.input}
              type="number"
              placeholder="Any"
              value={filters.lengthMin ?? ''}
              onChange={(e) =>
                setFilter(
                  'lengthMin',
                  e.target.value ? Number(e.target.value) : null,
                )
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Max (ft)</label>
            <input
              className={styles.input}
              type="number"
              placeholder="Any"
              value={filters.lengthMax ?? ''}
              onChange={(e) =>
                setFilter(
                  'lengthMax',
                  e.target.value ? Number(e.target.value) : null,
                )
              }
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Sleeping Capacity */}
      <CollapsibleSection title="Sleeping Capacity" defaultOpen={false}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Min sleeping capacity</label>
          <input
            className={styles.input}
            type="number"
            placeholder="Any"
            value={filters.sleepingCapacity ?? ''}
            onChange={(e) =>
              setFilter(
                'sleepingCapacity',
                e.target.value ? Number(e.target.value) : null,
              )
            }
          />
        </div>
      </CollapsibleSection>

      {/* 4. Fuel Type */}
      <CollapsibleSection title="Fuel Type" defaultOpen={false}>
        <ul className={styles.checkboxList}>
          {FUEL_TYPE_OPTIONS.map((option) => {
            const isChecked = filters.fuelTypes.includes(option.value);
            return (
              <li key={option.value} className={styles.checkboxRow}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.hiddenCheckbox}
                    checked={isChecked}
                    onChange={() =>
                      toggleArrayFilter('fuelTypes', option.value)
                    }
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
                  <span className={styles.checkboxText}>{option.label}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </CollapsibleSection>

      {/* 5. Floor Plan */}
      <CollapsibleSection title="Floor Plan" defaultOpen={false}>
        <ul className={styles.checkboxList}>
          {FLOOR_PLAN_OPTIONS.map((plan) => {
            const isChecked = filters.floorPlans.includes(plan);
            return (
              <li key={plan} className={styles.checkboxRow}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.hiddenCheckbox}
                    checked={isChecked}
                    onChange={() => toggleArrayFilter('floorPlans', plan)}
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
                  <span className={styles.checkboxText}>{plan}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </CollapsibleSection>

      {/* 6. Gross Vehicle Weight */}
      <CollapsibleSection title="Gross Vehicle Weight" defaultOpen={false}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Max GVW (lbs)</label>
          <input
            className={styles.input}
            type="number"
            placeholder="Any"
            value={filters.grossVehicleWeightMax ?? ''}
            onChange={(e) =>
              setFilter(
                'grossVehicleWeightMax',
                e.target.value ? Number(e.target.value) : null,
              )
            }
          />
        </div>
      </CollapsibleSection>
    </>
  );
}
