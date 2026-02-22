import Icon from '@components/ui/Icon/Icon';
import rvTraderLogo from '../../../app/src/assets/rv-trader-logo.svg';
import styles from './Header.module.css';

const NAV_LINKS = ['Shop', 'Sell', 'RV values', 'Cash offers', 'Research'];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>
          <img src={rvTraderLogo} alt="RV Trader" width={158} height={40} />
        </a>
        <nav className={styles.nav}>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a href="#" className={styles.navLink}>
                  {link}
                  {link === 'Research' && <Icon name="expand_more" size={20} />}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button className={styles.accountButton}>
          <Icon name="person" size={24} />
          <span>Log in</span>
        </button>
      </div>
    </header>
  );
}
