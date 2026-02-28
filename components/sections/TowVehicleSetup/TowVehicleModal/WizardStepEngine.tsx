import { getEngineSummaries } from '../../../../app/src/data/towVehicleDatabase';
import type { Selections } from './useWizardSteps';
import Icon from '@components/ui/Icon/Icon';
import styles from './TowVehicleModal.module.css';

interface WizardStepEngineProps {
  selections: Selections;
  onSelect: (value: string) => void;
}

/** Parse "3.5L EcoBoost V6" → { displacement: "3.5L", name: "EcoBoost", config: "V6" } */
function parseEngine(engine: string) {
  const parts = engine.split(' ');
  const displacement = parts[0] ?? '';
  const config = parts[parts.length - 1] ?? '';
  const name = parts.length > 2 ? parts.slice(1, -1).join(' ') : '';

  let aspiration = 'Naturally aspirated';
  const lower = engine.toLowerCase();
  if (lower.includes('ecoboost') || lower.includes('turbo')) aspiration = 'Twin-turbo';
  else if (lower.includes('supercharged')) aspiration = 'Supercharged';
  else if (lower.includes('hybrid') || lower.includes('i-force max')) aspiration = 'Hybrid';

  return { displacement, name, config, aspiration };
}

function formatTow(lbs: number) {
  return lbs.toLocaleString();
}

export default function WizardStepEngine({ selections, onSelect }: WizardStepEngineProps) {
  const summaries = (selections.year && selections.make && selections.model && selections.trim)
    ? getEngineSummaries(selections.year, selections.make, selections.model, selections.trim)
    : [];

  const bestTow = summaries.length > 0 ? summaries[0].maxTow : 0;

  return (
    <div className={styles.stepContent}>
      <h2 className={styles.stepHeadingCenter}>What engine?</h2>
      <div className={styles.richList}>
        {summaries.map((s, i) => {
          const selected = selections.engine === s.engine;
          const parsed = parseEngine(s.engine);
          const isBest = s.maxTow === bestTow && summaries.length > 1;
          return (
            <button
              key={s.engine}
              type="button"
              className={`${styles.richCard} ${selected ? styles.richCardSelected : ''}`}
              onClick={() => onSelect(s.engine)}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className={styles.richCardTop}>
                <span className={styles.richCardTitle}>{s.engine}</span>
                {selected && (
                  <span className={styles.richCardCheck}>
                    <Icon name="check" size={16} />
                  </span>
                )}
              </div>
              <div className={styles.richCardMeta}>
                <span>{parsed.aspiration}</span>
                <span className={styles.richCardDot}>·</span>
                <span>{parsed.config}</span>
              </div>
              <div className={styles.richCardFooter}>
                <span>Up to {formatTow(s.maxTow)} lbs tow</span>
                {isBest && <span className={styles.richCardBadge}>Best tow</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
