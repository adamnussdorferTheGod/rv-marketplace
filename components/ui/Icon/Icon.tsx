import ICONS from './icons';
import styles from './Icon.module.css';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export default function Icon({ name, size = 24, className }: IconProps) {
  const iconData = ICONS[name];
  if (!iconData) {
    console.warn(`Icon "${name}" not found in registry`);
    return null;
  }

  const viewBox = iconData.viewBox || '0 0 24 24';

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.icon} ${className || ''}`.trim()}
      aria-hidden="true"
    >
      {iconData.paths.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="currentColor"
          strokeWidth={iconData.strokeWidth || 2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={iconData.fill?.[i] || 'none'}
        />
      ))}
    </svg>
  );
}
