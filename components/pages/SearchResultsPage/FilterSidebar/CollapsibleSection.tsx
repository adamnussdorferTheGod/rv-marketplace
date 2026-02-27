import { useState, type ReactNode } from 'react';
import Icon from '@components/ui/Icon/Icon';
import styles from './CollapsibleSection.module.css';

interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  noBorder?: boolean;
  children: ReactNode;
}

export default function CollapsibleSection({
  title,
  defaultOpen = true,
  noBorder = false,
  children,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={noBorder ? styles.sectionNoBorder : styles.section}>
      <button
        className={styles.header}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        type="button"
      >
        <span>{title}</span>
        <span className={styles.iconWrapper}>
          <Icon name={isOpen ? 'expand_less' : 'expand_more'} size={24} />
        </span>
      </button>
      <div
        className={`${styles.content}${!isOpen ? ` ${styles.contentCollapsed}` : ''}`}
      >
        {children}
      </div>
    </div>
  );
}
