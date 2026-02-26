import { useState, useEffect, useRef } from 'react';
import styles from './DestinationTabs.module.css';

const TABS = [
  { label: 'Overview', target: 'dest-overview' },
  { label: 'Highlights', target: 'dest-highlights' },
  { label: 'Reviews', target: 'dest-reviews' },
] as const;

export default function DestinationTabs() {
  const [activeTab, setActiveTab] = useState('Overview');
  const scrollingRef = useRef(false);

  function handleClick(tab: typeof TABS[number]) {
    setActiveTab(tab.label);
    const el = document.getElementById(tab.target);
    if (el) {
      scrollingRef.current = true;
      const offset = 80; // account for sticky header
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setTimeout(() => { scrollingRef.current = false; }, 800);
    }
  }

  useEffect(() => {
    function onScroll() {
      if (scrollingRef.current) return;
      const offset = 120;
      let current = 'Overview';
      for (const tab of TABS) {
        const el = document.getElementById(tab.target);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = tab.label;
        }
      }
      setActiveTab(current);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={styles.tabBar}>
      {TABS.map(tab => (
        <button
          key={tab.label}
          className={`${styles.tab} ${activeTab === tab.label ? styles.tabActive : ''}`}
          onClick={() => handleClick(tab)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
