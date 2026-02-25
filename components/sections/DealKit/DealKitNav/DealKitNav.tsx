import Icon from '@components/ui/Icon/Icon';
import { DEAL_KIT_SECTIONS } from '../../../../app/src/data/dealKitTypes';
import { useDealKit } from '../DealKitContext';
import styles from './DealKitNav.module.css';

export default function DealKitNav() {
  const { activeSection, setActiveSection } = useDealKit();

  const handleClick = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={styles.nav}>
      {DEAL_KIT_SECTIONS.map((section) => (
        <button
          key={section.id}
          className={`${styles.item} ${activeSection === section.id ? styles.active : ''}`}
          onClick={() => handleClick(section.id)}
        >
          <Icon name={section.icon} size={18} />
          <span className={styles.label}>{section.label}</span>
        </button>
      ))}
    </nav>
  );
}
