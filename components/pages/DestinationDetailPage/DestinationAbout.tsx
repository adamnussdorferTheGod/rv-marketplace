import { useState } from 'react';
import styles from './DestinationAbout.module.css';

interface DestinationAboutProps {
  description: string;
}

export default function DestinationAbout({ description }: DestinationAboutProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.about}>
      <h2 className={styles.heading}>About</h2>
      <p className={`${styles.text} ${expanded ? '' : styles.clamped}`}>
        {description}
      </p>
      {description.length > 200 && (
        <button
          className={styles.toggle}
          onClick={() => setExpanded(!expanded)}
          type="button"
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  );
}
