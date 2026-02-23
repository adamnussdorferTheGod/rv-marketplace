import { useState } from 'react';
import Icon from '@components/ui/Icon/Icon';
import styles from './ExpandableText.module.css';

interface ExpandableTextProps {
  text: string;
  maxLines: number;
  expandLabel?: string;
  collapseLabel?: string;
  chevronDirection?: 'down' | 'right';
  className?: string;
}

export default function ExpandableText({
  text,
  maxLines,
  expandLabel = 'Read more',
  collapseLabel = 'Read less',
  chevronDirection = 'down',
  className,
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const iconName = chevronDirection === 'right' ? 'chevron_right' : 'expand_more';

  return (
    <div className={className}>
      <p
        className={!isExpanded ? styles.clamped : undefined}
        style={!isExpanded ? { WebkitLineClamp: maxLines } : undefined}
      >
        {text}
      </p>
      <button
        className={styles.toggle}
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
      >
        {isExpanded ? collapseLabel : expandLabel}
        <span
          className={`${styles.chevron}${isExpanded && chevronDirection === 'down' ? ` ${styles.chevronExpanded}` : ''}`}
        >
          <Icon name={iconName} size={20} />
        </span>
      </button>
    </div>
  );
}
