import styles from './CrossPromotionsBar.module.css';

const REALM_TABS = [
  'RVs', 'Motorcycles', 'ATVs', 'Trucks',
  'Boats', 'Planes', 'Snowmobiles', 'Jet Skis',
];

export default function CrossPromotionsBar() {
  return (
    <nav className={styles.bar}>
      <ul className={styles.tabs}>
        {REALM_TABS.map((tab) => (
          <li key={tab}>
            <a
              href="#"
              className={`${styles.tab} ${tab === 'RVs' ? styles.active : ''}`.trim()}
            >
              {tab}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
