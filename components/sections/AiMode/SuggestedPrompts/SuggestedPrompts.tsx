import styles from './SuggestedPrompts.module.css';

interface SuggestedPromptsProps {
  prompts: string[];
  onSelect: (prompt: string) => void;
  variant?: 'vertical' | 'horizontal';
}

export default function SuggestedPrompts({
  prompts,
  onSelect,
  variant = 'vertical',
}: SuggestedPromptsProps) {
  if (prompts.length === 0) return null;

  return (
    <div
      className={`${styles.container} ${variant === 'horizontal' ? styles.horizontal : styles.vertical}`}
    >
      {prompts.map((prompt, i) => (
        <button
          key={prompt}
          type="button"
          className={styles.chip}
          onClick={() => onSelect(prompt)}
          style={{ animationDelay: `${i * 80}ms` }}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
