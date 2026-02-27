import { Link } from 'react-router-dom';
import Icon from '@components/ui/Icon/Icon';
import { ROUTES } from '../../../app/src/routes';
import rvTraderLogo from '../../../app/src/assets/rv-trader-logo.svg';
import styles from './Header.module.css';

const NAV_LINKS = ['Shop', 'Sell', 'RV values', 'Cash offers', 'Research'];

export default function Header() {

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to={ROUTES.HOME} className={styles.logo}>
          <img src={rvTraderLogo} alt="RV Trader" width={158} height={40} />
        </Link>
        <nav className={styles.nav}>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link}>
                {link === 'Shop' ? (
                  <Link to={ROUTES.SEARCH} className={styles.navLink}>
                    {link}
                  </Link>
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
