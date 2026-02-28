import { useTowVehicle } from '../TowVehicleContext';
import styles from './TowVehicleSetupPrompt.module.css';

export default function TowVehicleSetupPrompt() {
  const { savedVehicle, openSetupModal } = useTowVehicle();

  if (savedVehicle) return null;

  return (
    <div className={styles.card}>
      <div className={styles.iconWrap}>
        <img
          src="/images/icons/car-pickup.svg"
          alt=""
          width={24}
          height={24}
        />
      </div>
      <div className={styles.content}>
        <p className={styles.heading}>Tow-Match</p>
        <p className={styles.subtext}>
          Add your vehicle to see if this is a match for this RV.
        </p>
      </div>
      <button type="button" className={styles.addButton} onClick={openSetupModal}>
        Add vehicle
      </button>
    </div>
  );
}
