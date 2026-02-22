import type { ReactNode } from 'react';
import styles from './TwoColumnLayout.module.css';

interface TwoColumnLayoutProps {
  left: ReactNode;
  right: ReactNode;
}

export default function TwoColumnLayout({ left, right }: TwoColumnLayoutProps) {
  return (
    <div className={styles.grid}>
      <div className={styles.left}>{left}</div>
      <aside className={styles.right}>{right}</aside>
    </div>
  );
}
