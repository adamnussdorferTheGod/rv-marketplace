import Icon from '../Icon/Icon';
import styles from './ActionChip.module.css';

interface ActionChipProps {
  label: string;
  icon?: string;
  iconSize?: number;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function ActionChip({
  label,
  icon,
  iconSize = 20,
  selected,
  onClick,
  className,
}: ActionChipProps) {
  const cls = [
    styles.chip,
    selected ? styles.chipSelected : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={cls} onClick={onClick}>
      {icon && <Icon name={icon} size={iconSize} />}
      {label}
    </button>
  );
}
