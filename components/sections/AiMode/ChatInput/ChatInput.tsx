import { useState, useRef, useCallback, type KeyboardEvent } from 'react';
import Icon from '@components/ui/Icon/Icon';
import styles from './ChatInput.module.css';

interface ChatInputProps {
  onSend: (message: string) => void;
  onClose: () => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, onClose, disabled }: ChatInputProps) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const hasValue = value.length > 0;
  const floated = focused || hasValue;

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  }, [value, disabled, onSend]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [handleSend, onClose],
  );

  const defaultLabel = 'Describe your dream RV';
  const labelText = disabled ? 'Sign in to continue...' : defaultLabel;

  return (
    <div className={`${styles.wrapper} ${disabled ? styles.disabled : ''}`}>
      <div
        className={[
          styles.field,
          focused ? styles.focused : '',
          floated ? styles.floated : '',
        ].filter(Boolean).join(' ')}
        onClick={() => inputRef.current?.focus()}
      >
        <div className={styles.labelAndInput}>
          <span className={styles.label}>{labelText}</span>
          <textarea
            ref={inputRef}
            className={styles.input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={disabled}
            rows={1}
            aria-label={labelText}
          />
        </div>
        {hasValue && (
          <button
            type="button"
            className={styles.sendButton}
            onClick={handleSend}
            disabled={disabled}
            aria-label="Send message"
          >
            <Icon name="arrow_forward" size={24} />
          </button>
        )}
      </div>
    </div>
  );
}
