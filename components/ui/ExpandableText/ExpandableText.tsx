import { useState } from 'react';
import Icon from '@components/ui/Icon/Icon';
import styles from './ExpandableText.module.css';

interface ExpandableTextProps {
  text: string;
  maxLines: number;
  expandLabel?: string;
  collapseLabel?: string;
  className?: string;
}

export default function ExpandableText({
  text,
  maxLines,
  expandLabel = 'Read more',
  collapseLabel = 'Read less',
  className,
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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
          className={`${styles.chevron}${isExpanded ? ` ${styles.chevronExpanded}` : ''}`}
        >
          <Icon name="expand_more" size={20} />
        </span>
      </button>
    </div>
  );
}
