import { useState, useRef } from 'react';
import Icon from '../../ui/Icon/Icon';
import styles from './SrpSummaryCard.module.css';

interface SrpChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function SrpChatInput({
  onSend,
  placeholder = 'Ask about these results...',
  disabled = false,
}: SrpChatInputProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.chatInputWrapper}>
      <input
        ref={inputRef}
        type="text"
        className={styles.chatInput}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="Ask about these search results"
        disabled={disabled}
      />
      <button
        type="button"
        className={styles.chatSendBtn}
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        aria-label="Send question"
      >
        <Icon name="send" size={18} />
      </button>
    </div>
  );
}
