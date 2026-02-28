import { useState, useRef, useEffect } from 'react';
import styles from './EditableFeeRow.module.css';

interface EditableFeeRowProps {
  label: string;
  value: number;
  onChange: (newValue: number) => void;
  max?: number | null;
}

function formatCurrency(value: number): string {
  return value.toLocaleString('en-US');
}

export default function EditableFeeRow({ label, value, onChange, max }: EditableFeeRowProps) {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const handleStartEdit = () => {
    setInputValue(String(value));
    setEditing(true);
  };

  const handleCommit = () => {
    const stripped = inputValue.replace(/[^0-9]/g, '');
    const parsed = parseInt(stripped, 10);

    if (isNaN(parsed) || parsed <= 0) {
      setEditing(false);
      return;
    }

    const clamped = max != null ? Math.min(parsed, max) : parsed;
    onChange(clamped);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommit();
    } else if (e.key === 'Escape') {
      setEditing(false);
    }
  };

  return (
    <div className={styles.row}>
      <span>{label}</span>
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          className={styles.editInput}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleCommit}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span className={styles.valueDisplay} onClick={handleStartEdit}>
          ${formatCurrency(value)}
        </span>
      )}
    </div>
  );
}
