import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './VdpSectionNav.module.css';

const NAV_ITEMS = [
  { id: 'features', label: 'Features' },
  { id: 'description', label: 'Description' },
  { id: 'price', label: 'Price' },
  { id: 'payment', label: 'Payment' },
  { id: 'inspiration', label: 'Inspiration' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'seller', label: 'Seller' },
] as const;

const NAV_HEIGHT = 48;

export default function VdpSectionNav() {
  const [activeId, setActiveId] = useState<string>('');
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const isClickScrolling = useRef(false);
  const clickTimeout = useRef<ReturnType<typeof setTimeout>>();

  // Detect when the nav becomes sticky
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const sentinel = document.createElement('div');
    sentinel.style.height = '1px';
    sentinel.style.width = '1px';
    sentinel.style.position = 'absolute';
    sentinel.style.visibility = 'hidden';
    nav.parentElement?.insertBefore(sentinel, nav);

    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  // Scroll-spy: track which section is currently visible
  useEffect(() => {
    const ids = NAV_ITEMS.map(item => item.id);
    const elements = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;

        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: `-${NAV_HEIGHT + 16}px 0px -70% 0px` },
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    setActiveId(id);
    isClickScrolling.current = true;
    clearTimeout(clickTimeout.current);

    const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT - 16;
    window.scrollTo({ top, behavior: 'smooth' });

    clickTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  }, []);

  // Scroll active tab into view on mobile
  const activeButtonRef = useCallback((node: HTMLButtonElement | null) => {
    node?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, []);

  return (
    <nav
      ref={navRef}
      className={`${styles.nav} ${isSticky ? styles.sticky : ''}`}
    >
      <div className={styles.tabs} role="tablist">
        {NAV_ITEMS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            ref={activeId === id ? activeButtonRef : undefined}
            aria-selected={activeId === id}
            className={`${styles.tab}${activeId === id ? ` ${styles.tabActive}` : ''}`}
            onClick={() => handleClick(id)}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
