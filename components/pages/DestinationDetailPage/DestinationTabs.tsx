import styles from './DestinationTabs.module.css';

const TABS = ['Overview', 'Facts', 'Things to do', 'Reviews'] as const;

interface DestinationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function DestinationTabs({ activeTab, onTabChange }: DestinationTabsProps) {
  return (
    <div className={styles.tabBar}>
      {TABS.map(tab => (
        <button
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
          onClick={() => onTabChange(tab)}
          type="button"
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
