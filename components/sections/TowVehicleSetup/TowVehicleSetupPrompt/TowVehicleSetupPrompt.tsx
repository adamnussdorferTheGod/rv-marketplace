import Icon from '@components/ui/Icon/Icon';
import Button from '@components/ui/Button/Button';
import { useTowVehicle } from '../TowVehicleContext';
import styles from './TowVehicleSetupPrompt.module.css';

export default function TowVehicleSetupPrompt() {
  const { savedVehicle, openSetupModal } = useTowVehicle();

  if (savedVehicle) return null;

  return (
    <div className={styles.card}>
      <div className={styles.iconWrap}>
        <Icon name="rv_type" size={24} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.heading}>What's your tow vehicle?</h3>
        <p className={styles.subtext}>
          Add it to see which RVs are a match for your truck
        </p>
        <Button variant="primary" onClick={openSetupModal}>
          Add My Vehicle
        </Button>
      </div>
    </div>
  );
}
