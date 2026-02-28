import { useState, useCallback, useMemo } from 'react';
import type { TowVehicle, YMMTLevel } from '../../../../app/src/data/towTypes';
import {
  getAvailableMakes,
  getAvailableModels,
  getAvailableTrims,
  getAvailableEngines,
  getAvailableCabs,
  getAvailableBeds,
  getVehicle,
} from '../../../../app/src/data/towVehicleDatabase';

// ─── Types ──────────────────────────────────────────────────────────

export type WizardStepId =
  | 'intro' | 'make' | 'model' | 'trim' | 'engine' | 'cab' | 'bed'
  | 'vin' | 'extras' | 'confirm';

export type WizardPath = 'ymmt' | 'vin';

export interface Selections {
  make: string | null;
  model: string | null;
  trim: string | null;
  engine: string | null;
  cab: string | null;
  bed: string | null;
}

const YMMT_STEPS: WizardStepId[] = ['intro', 'make', 'model', 'trim', 'engine', 'cab', 'bed', 'extras', 'confirm'];
const VIN_STEPS: WizardStepId[] = ['vin', 'extras', 'confirm'];
const YMMT_LEVELS: YMMTLevel[] = ['make', 'model', 'trim', 'engine', 'cab', 'bed'];

const EMPTY_SELECTIONS: Selections = {
  make: null, model: null, trim: null,
  engine: null, cab: null, bed: null,
};

// ─── Cascade helpers ────────────────────────────────────────────────

function getOptionsForLevel(level: YMMTLevel, sel: Selections): string[] {
  switch (level) {
    case 'make': return getAvailableMakes();
    case 'model': return sel.make ? getAvailableModels(sel.make) : [];
    case 'trim': return (sel.make && sel.model) ? getAvailableTrims(sel.make, sel.model) : [];
    case 'engine': return (sel.make && sel.model && sel.trim) ? getAvailableEngines(sel.make, sel.model, sel.trim) : [];
    case 'cab': return (sel.make && sel.model && sel.trim && sel.engine) ? getAvailableCabs(sel.make, sel.model, sel.trim, sel.engine) : [];
    case 'bed': return (sel.make && sel.model && sel.trim && sel.engine && sel.cab) ? getAvailableBeds(sel.make, sel.model, sel.trim, sel.engine, sel.cab) : [];
  }
}

function applySelection(sel: Selections, level: YMMTLevel, value: string): Selections {
  const next = { ...sel };
  next[level] = value;
  // Clear downstream
  const idx = YMMT_LEVELS.indexOf(level);
  for (let i = idx + 1; i < YMMT_LEVELS.length; i++) {
    const k = YMMT_LEVELS[i];
    (next as Record<string, unknown>)[k] = null;
  }
  return next;
}

/** Auto-fill levels that have exactly 1 option, returning updated selections and last auto-filled level index */
function autoFillSingleOptions(sel: Selections, fromLevelIdx: number): { selections: Selections; lastFilledIdx: number } {
  let current = sel;
  let lastIdx = fromLevelIdx;

  for (let i = fromLevelIdx + 1; i < YMMT_LEVELS.length; i++) {
    const level = YMMT_LEVELS[i];
    const opts = getOptionsForLevel(level, current);
    if (opts.length === 1) {
      current = applySelection(current, level, opts[0]);
      lastIdx = i;
    } else {
      break;
    }
  }

  return { selections: current, lastFilledIdx: lastIdx };
}

// ─── Hook ───────────────────────────────────────────────────────────

export interface UseWizardStepsReturn {
  path: WizardPath;
  steps: WizardStepId[];
  currentStepIndex: number;
  currentStep: WizardStepId;
  totalSteps: number;
  direction: 1 | -1;
  selections: Selections;
  resolvedVehicle: TowVehicle | null;
  selectOption: (level: YMMTLevel, value: string) => void;
  quickPick: (make: string, model: string) => void;
  goBack: () => void;
  goToMake: () => void;
  goNext: () => void;
  switchToVIN: () => void;
  switchToYMMT: () => void;
  setVinVehicle: (vehicle: TowVehicle) => void;
  reset: () => void;
}

export function useWizardSteps(): UseWizardStepsReturn {
  const [path, setPath] = useState<WizardPath>('ymmt');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selections, setSelections] = useState<Selections>(EMPTY_SELECTIONS);
  const [vinVehicle, setVinVehicleState] = useState<TowVehicle | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);

  const steps = path === 'ymmt' ? YMMT_STEPS : VIN_STEPS;
  const currentStep = steps[currentStepIndex];
  const totalSteps = steps.length;

  // Resolve vehicle from selections or VIN
  const resolvedVehicle = useMemo(() => {
    if (path === 'vin') return vinVehicle;
    const { make, model, trim, engine, cab, bed } = selections;
    if (make && model && trim && engine && cab && bed) {
      return getVehicle(make, model, trim, engine, cab, bed);
    }
    return null;
  }, [path, selections, vinVehicle]);

  const selectOption = useCallback((level: YMMTLevel, value: string) => {
    const levelIdx = YMMT_LEVELS.indexOf(level);
    const updated = applySelection(selections, level, value);
    const { selections: autoFilled, lastFilledIdx } = autoFillSingleOptions(updated, levelIdx);

    setSelections(autoFilled);
    setDirection(1);

    // Find next YMMT step that needs user input
    const nextLevelIdx = lastFilledIdx + 1;
    if (nextLevelIdx < YMMT_LEVELS.length) {
      const nextStepId = YMMT_LEVELS[nextLevelIdx];
      const stepIdx = YMMT_STEPS.indexOf(nextStepId);
      setCurrentStepIndex(stepIdx);
    } else {
      setCurrentStepIndex(YMMT_STEPS.indexOf('extras'));
    }
  }, [selections]);

  /** Quick-pick a popular vehicle (make+model), auto-skip to next needed step */
  const quickPick = useCallback((make: string, model: string) => {
    let sel: Selections = { ...EMPTY_SELECTIONS, make, model };

    // Auto-fill from model level onward (trim, engine, cab, bed)
    const modelIdx = YMMT_LEVELS.indexOf('model'); // 1
    const { selections: autoFilled, lastFilledIdx } = autoFillSingleOptions(sel, modelIdx);
    sel = autoFilled;

    setSelections(sel);
    setDirection(1);

    const nextLevelIdx = lastFilledIdx + 1;
    if (nextLevelIdx < YMMT_LEVELS.length) {
      const nextStepId = YMMT_LEVELS[nextLevelIdx];
      setCurrentStepIndex(YMMT_STEPS.indexOf(nextStepId));
    } else {
      setCurrentStepIndex(YMMT_STEPS.indexOf('extras'));
    }
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    if (currentStepIndex <= 0) return;

    if (path === 'ymmt') {
      // Walk back, skipping auto-filled single-option levels
      let targetIdx = currentStepIndex - 1;
      while (targetIdx > 0) {
        const stepId = YMMT_STEPS[targetIdx];
        if (stepId === 'intro') break; // always stop at intro
        const levelIdx = YMMT_LEVELS.indexOf(stepId as YMMTLevel);
        if (levelIdx === -1) break; // not a YMMT level (extras/confirm)

        const parentSel = buildSelectionsUpTo(levelIdx);
        const opts = getOptionsForLevel(stepId as YMMTLevel, parentSel);
        if (opts.length > 1) break;
        targetIdx--;
      }
      // Clear selections from target level onward
      const targetStep = YMMT_STEPS[targetIdx];
      const targetLevelIdx = YMMT_LEVELS.indexOf(targetStep as YMMTLevel);
      if (targetLevelIdx >= 0) {
        setSelections(prev => {
          const next = { ...prev };
          for (let i = targetLevelIdx; i < YMMT_LEVELS.length; i++) {
            (next as Record<string, unknown>)[YMMT_LEVELS[i]] = null;
          }
          return next;
        });
      } else if (targetStep === 'intro') {
        // Going back to intro — clear all selections
        setSelections(EMPTY_SELECTIONS);
      }
      setCurrentStepIndex(targetIdx);
    } else {
      setCurrentStepIndex(prev => prev - 1);
    }
  }, [currentStepIndex, path, selections]);

  // Helper: build selections up to (but not including) a level index
  function buildSelectionsUpTo(levelIdx: number): Selections {
    const partial: Selections = { ...EMPTY_SELECTIONS };
    for (let i = 0; i < levelIdx; i++) {
      const key = YMMT_LEVELS[i];
      (partial as Record<string, unknown>)[key] = selections[key];
    }
    return partial;
  }

  const goToMake = useCallback(() => {
    setDirection(1);
    setCurrentStepIndex(YMMT_STEPS.indexOf('make'));
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  }, [currentStepIndex, steps.length]);

  const switchToVIN = useCallback(() => {
    setPath('vin');
    setCurrentStepIndex(0);
    setSelections(EMPTY_SELECTIONS);
    setVinVehicleState(null);
    setDirection(1);
  }, []);

  const switchToYMMT = useCallback(() => {
    setPath('ymmt');
    setCurrentStepIndex(0);
    setSelections(EMPTY_SELECTIONS);
    setVinVehicleState(null);
    setDirection(1);
  }, []);

  const setVinVehicle = useCallback((vehicle: TowVehicle) => {
    setVinVehicleState(vehicle);
  }, []);

  const reset = useCallback(() => {
    setPath('ymmt');
    setCurrentStepIndex(0);
    setSelections(EMPTY_SELECTIONS);
    setVinVehicleState(null);
    setDirection(1);
  }, []);

  return {
    path,
    steps,
    currentStepIndex,
    currentStep,
    totalSteps,
    direction,
    selections,
    resolvedVehicle,
    selectOption,
    quickPick,
    goBack,
    goToMake,
    goNext,
    switchToVIN,
    switchToYMMT,
    setVinVehicle,
    reset,
  };
}
