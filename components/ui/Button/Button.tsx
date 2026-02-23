import type { ButtonHTMLAttributes, ReactNode } from 'react';
import Icon from '@components/ui/Icon/Icon';
import styles from './Button.module.css';

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'quaternary';
type ButtonSize = 'lg' | 'sm';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonType;
  size?: ButtonSize;
  leadingIcon?: string;
  trailingIcon?: string;
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'lg',
  leadingIcon,
  trailingIcon,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  const iconSize = size === 'lg' ? 24 : 20;

  return (
    <button
      className={[
        styles.button,
        styles[variant],
        styles[size],
        className,
      ].filter(Boolean).join(' ')}
      disabled={disabled}
      {...rest}
    >
      {leadingIcon && <Icon name={leadingIcon} size={iconSize} />}
      {children}
      {trailingIcon && <Icon name={trailingIcon} size={iconSize} />}
    </button>
  );
}
