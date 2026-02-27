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

const BUNKHOUSE_OPTIONS: string[] = [
  'Bunkhouse',
  'Double bunk',
  'Triple bunk',
  'Quad bunk',
];

const FLOOR_PLAN_OPTIONS: string[] = [
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
      {/* 1. Length */}
      <CollapsibleSection title="Length" defaultOpen={false}>
        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <input
              className={styles.inputStandalone}
              type="number"
              placeholder="Min (ft)"
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
            <input
              className={styles.inputStandalone}
              type="number"
              placeholder="Max (ft)"
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

      {/* 2. Year */}
      <CollapsibleSection title="Year" defaultOpen={false}>
        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <input
              className={styles.inputStandalone}
              type="number"
              placeholder="Min year"
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
            <input
              className={styles.inputStandalone}
              type="number"
              placeholder="Max year"
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

      {/* 3. Bunkhouse floor plan */}
      <CollapsibleSection title="Bunkhouse floor plan" defaultOpen={false}>
        <ul className={styles.checkboxList}>
          {BUNKHOUSE_OPTIONS.map((plan) => {
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
                  <span className={styles.checkboxText}>{plan}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </CollapsibleSection>

      {/* 4. Fuel Type */}
      <CollapsibleSection title="Fuel type" defaultOpen={false}>
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
                  <span className={styles.checkboxText}>{option.label}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </CollapsibleSection>

      {/* 5. Sleeping Capacity */}
      <CollapsibleSection title="Sleeping capacity" defaultOpen={false}>
        <div className={styles.inputGroup}>
          <input
            className={styles.inputStandalone}
            type="number"
            placeholder="Min sleeping capacity"
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

      {/* 6. Floor Plan */}
      <CollapsibleSection title="Floor plan" defaultOpen={false}>
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
                  <span className={styles.checkboxText}>{plan}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </CollapsibleSection>

      {/* 7. Gross Vehicle Weight - last section, no border */}
      <CollapsibleSection
        title="Gross vehicle weight"
        defaultOpen={false}
        noBorder
      >
        <div className={styles.inputGroup}>
          <input
            className={styles.inputStandalone}
            type="number"
            placeholder="Max GVW (lbs)"
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
