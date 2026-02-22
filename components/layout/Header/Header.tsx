import Icon from '@components/ui/Icon/Icon';
import styles from './Header.module.css';

const NAV_LINKS = ['Shop', 'Sell', 'RV values', 'Cash offers', 'Research'];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <span className={styles.logoText}>RV Trader</span>
        </div>
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
