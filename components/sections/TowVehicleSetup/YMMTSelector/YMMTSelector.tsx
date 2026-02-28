import { useState, useEffect, useCallback, useMemo } from 'react';
import type { TowVehicle } from '../../../../app/src/data/towTypes';
import {
  getAvailableYears,
  getAvailableMakes,
  getAvailableModels,
  getAvailableTrims,
  getAvailableEngines,
  getAvailableCabs,
  getAvailableBeds,
  getVehicle,
} from '../../../../app/src/data/towVehicleDatabase';
import styles from './YMMTSelector.module.css';

interface YMMTSelectorProps {
  onVehicleSelected: (vehicle: TowVehicle) => void;
}

interface Selections {
  year: number | null;
  make: string | null;
  model: string | null;
  trim: string | null;
  engine: string | null;
  cab: string | null;
  bed: string | null;
}

const INITIAL_SELECTIONS: Selections = {
  year: null,
  make: null,
  model: null,
  trim: null,
  engine: null,
  cab: null,
  bed: null,
};

const LEVELS = ['year', 'make', 'model', 'trim', 'engine', 'cab', 'bed'] as const;
type Level = (typeof LEVELS)[number];

const LEVEL_LABELS: Record<Level, string> = {
  year: 'Year',
  make: 'Make',
  model: 'Model',
  trim: 'Trim',
  engine: 'Engine',
  cab: 'Cab',
  bed: 'Bed',
};

export default function YMMTSelector({ onVehicleSelected }: YMMTSelectorProps) {
  const [selections, setSelections] = useState<Selections>(INITIAL_SELECTIONS);

  // Compute available options for each level based on current selections
  const years = useMemo(() => getAvailableYears(), []);

  const makes = useMemo(
    () => (selections.year ? getAvailableMakes(selections.year) : []),
    [selections.year],
  );

  const models = useMemo(
    () => (selections.year && selections.make
      ? getAvailableModels(selections.year, selections.make)
      : []),
    [selections.year, selections.make],
  );

  const trims = useMemo(
    () => (selections.year && selections.make && selections.model
      ? getAvailableTrims(selections.year, selections.make, selections.model)
      : []),
    [selections.year, selections.make, selections.model],
  );

  const engines = useMemo(
    () => (selections.year && selections.make && selections.model && selections.trim
      ? getAvailableEngines(selections.year, selections.make, selections.model, selections.trim)
      : []),
    [selections.year, selections.make, selections.model, selections.trim],
  );

  const cabs = useMemo(
    () => (selections.year && selections.make && selections.model && selections.trim && selections.engine
      ? getAvailableCabs(selections.year, selections.make, selections.model, selections.trim, selections.engine)
      : []),
    [selections.year, selections.make, selections.model, selections.trim, selections.engine],
  );

  const beds = useMemo(
    () => (selections.year && selections.make && selections.model && selections.trim && selections.engine && selections.cab
      ? getAvailableBeds(selections.year, selections.make, selections.model, selections.trim, selections.engine, selections.cab)
      : []),
    [selections.year, selections.make, selections.model, selections.trim, selections.engine, selections.cab],
  );

  const optionsMap: Record<Level, (string | number)[]> = {
    year: years,
    make: makes,
    model: models,
    trim: trims,
    engine: engines,
    cab: cabs,
    bed: beds,
  };

  // Determine which levels are visible (progressive reveal)
  const visibleLevels = useMemo(() => {
    const visible: Level[] = ['year'];
    for (let i = 0; i < LEVELS.length - 1; i++) {
      const currentLevel = LEVELS[i];
      if (selections[currentLevel] !== null) {
        visible.push(LEVELS[i + 1]);
      } else {
        break;
      }
    }
    return visible;
  }, [selections]);

  // Handle selection change at a given level
  const handleChange = useCallback(
    (level: Level, value: string) => {
      const levelIndex = LEVELS.indexOf(level);

      setSelections((prev) => {
        const next = { ...prev };

        // Set the current level's value
        if (level === 'year') {
          next.year = value ? Number(value) : null;
        } else {
          (next as Record<string, string | number | null>)[level] = value || null;
        }

        // Clear all levels below the current one
        for (let i = levelIndex + 1; i < LEVELS.length; i++) {
          (next as Record<string, string | number | null>)[LEVELS[i]] = null;
        }

        return next;
      });
    },
    [],
  );

  // Auto-select when only one option exists
  useEffect(() => {
    for (let i = 0; i < LEVELS.length; i++) {
      const level = LEVELS[i];
      const options = optionsMap[level];

      // If this level has no selection yet, but has exactly 1 option, auto-select
      if (selections[level] === null && options.length === 1) {
        const singleValue = options[0];
        handleChange(level, String(singleValue));
        return; // Process one at a time to allow cascade
      }

      // If this level has no selection yet, stop looking deeper
      if (selections[level] === null) break;
    }
  }, [selections, optionsMap, handleChange]);

  // When all levels selected, resolve the vehicle
  useEffect(() => {
    const { year, make, model, trim, engine, cab, bed } = selections;
    if (year && make && model && trim && engine && cab && bed) {
      const vehicle = getVehicle(year, make, model, trim, engine, cab, bed);
      if (vehicle) {
        onVehicleSelected(vehicle);
      }
    }
  }, [selections, onVehicleSelected]);

  return (
    <div className={styles.container}>
      {visibleLevels.map((level) => {
        const options = optionsMap[level];
        const currentValue = selections[level];

        return (
          <div key={level} className={styles.fieldGroup}>
            <label className={styles.label} htmlFor={`ymmt-${level}`}>
              {LEVEL_LABELS[level]}
            </label>
            <select
              id={`ymmt-${level}`}
              className={styles.select}
              value={currentValue !== null ? String(currentValue) : ''}
              onChange={(e) => handleChange(level, e.target.value)}
            >
              <option value="">Select {LEVEL_LABELS[level]}...</option>
              {options.map((opt) => (
                <option key={String(opt)} value={String(opt)}>
                  {String(opt)}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
}
