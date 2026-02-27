import type { SelectHTMLAttributes } from 'react';
import Icon from '@components/ui/Icon/Icon';
import styles from './Select.module.css';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[];
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
}

export default function Select({
  options,
  placeholder = 'Select…',
  onChange,
  value,
  disabled,
  className,
  ...rest
}: SelectProps) {
  return (
    <div className={[styles.wrap, disabled && styles.disabled, className].filter(Boolean).join(' ')}>
      <select
        className={[styles.select, !value && styles.placeholder].filter(Boolean).join(' ')}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        {...rest}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className={styles.chevron}>
        <Icon name="expand_more" size={20} />
      </span>
    </div>
  );
}
