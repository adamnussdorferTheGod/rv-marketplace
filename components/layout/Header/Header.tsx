import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@components/ui/Icon/Icon';
import { ROUTES, listingPath } from '../../../app/src/routes';
import rvTraderLogo from '../../../app/src/assets/rv-trader-logo.svg';
import styles from './Header.module.css';

const NAV_LINKS = ['Shop', 'Sell', 'RV values', 'Cash offers', 'Research'];

const RESEARCH_ITEMS = [
  { label: 'VDP with AI Summary', variant: 'option-1' as const },
  { label: 'VDP with Fit Check', variant: 'option-2' as const },
];

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const navigate = useNavigate();

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
        <Link to={ROUTES.HOME} className={styles.logo}>
          <img src={rvTraderLogo} alt="RV Trader" width={158} height={40} />
        </Link>
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
                          <button
                            key={item.variant}
                            type="button"
                            className={styles.dropdownItem}
                            onClick={() => {
                              setDropdownOpen(false);
                              const path = item.variant === 'option-1'
                                ? listingPath('sample')
                                : `${listingPath('sample')}?variant=${item.variant}`;
                              navigate(path);
                            }}
                          >
                            {item.label}
                          </button>
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
