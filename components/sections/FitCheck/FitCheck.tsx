import Icon from '@components/ui/Icon/Icon';
import { useAiMode } from '@components/sections/AiMode/AiModeContext';
import styles from './FitCheck.module.css';

const PROMPTS = [
  'Off-roading RV that fits a family of four and a dog',
  "I'm looking for an RV to take off-roading that will fit a family of four.",
];

export default function FitCheck() {
  const { openPanel, sendMessage } = useAiMode();

  function handlePromptClick(prompt: string) {
    openPanel();
    sendMessage(prompt);
  }

  return (
    <div className={styles.card}>
      <div className={styles.glow} />
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Fitcheck</h2>
          <Icon name="sparkles" size={24} className={styles.sparkleIcon} />
        </div>
        <p className={styles.description}>
          Tell us what you're looking for. We'll analyze every photo and spec to
          show what fits, what doesn't, and what to double-check.
        </p>
        <div className={styles.prompts}>
          {PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              className={styles.promptCard}
              onClick={() => handlePromptClick(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
        <button type="button" className={styles.searchPrompt} onClick={openPanel}>
          <Icon name="sparkles" size={24} />
          <span>Dive deeper in AI-Mode</span>
        </button>
      </div>
    </div>
  );
}
