import { useState, useRef, useEffect } from 'react';
import Icon from '@components/ui/Icon/Icon';
import rvTraderLogo from '../../../app/src/assets/rv-trader-logo.svg';
import styles from './Header.module.css';

const NAV_LINKS = ['Shop', 'Sell', 'RV values', 'Cash offers', 'Research'];

const RESEARCH_ITEMS = [
  { label: 'Option 1', href: '#option-1' },
  { label: 'Option 2', href: '#option-2' },
];

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>
          <img src={rvTraderLogo} alt="RV Trader" width={158} height={40} />
        </a>
        <nav className={styles.nav}>
          <ul>
            {NAV_LINKS.map((link) => (
              <li
                key={link}
                className={link === 'Research' ? styles.dropdownWrapper : undefined}
                ref={link === 'Research' ? dropdownRef : undefined}
              >
                {link === 'Research' ? (
                  <>
                    <button
                      type="button"
                      className={styles.navLink}
                      onClick={() => setDropdownOpen((o) => !o)}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                    >
                      {link}
                      <Icon name={dropdownOpen ? 'expand_less' : 'expand_more'} size={20} />
                    </button>
                    {dropdownOpen && (
                      <div className={styles.dropdown}>
                        {RESEARCH_ITEMS.map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            className={styles.dropdownItem}
                            onClick={() => setDropdownOpen(false)}
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a href="#" className={styles.navLink}>
                    {link}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Mobile-only controls */}
        <div className={styles.mobileActions}>
          <a href="#" className={styles.sellLink}>Sell</a>
          <button type="button" className={styles.iconButtonRound} aria-label="Search">
            <Icon name="search" size={24} />
          </button>
          <button className={styles.accountButton}>
            <Icon name="person" size={24} />
            <span className={styles.loginText}>Log in</span>
            <span className={styles.menuIcon}><Icon name="menu" size={24} /></span>
          </button>
        </div>
        {/* Desktop-only account button */}
        <button className={styles.accountButtonDesktop}>
          <Icon name="person" size={24} />
          <span>Log in</span>
        </button>
      </div>
    </header>
  );
}
