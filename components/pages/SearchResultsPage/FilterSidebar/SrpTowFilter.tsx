import { useTowVehicle } from '@components/sections/TowVehicleSetup/TowVehicleContext';
import Icon from '@components/ui/Icon/Icon';
import styles from './SrpTowFilter.module.css';

interface SrpTowFilterProps {
  matchCount: number;
  totalCount: number;
}

export default function SrpTowFilter({ matchCount, totalCount }: SrpTowFilterProps) {
  const {
    savedVehicle,
    towFilterEnabled,
    openSetupModal,
    setTowFilterEnabled,
  } = useTowVehicle();

  // ── No vehicle saved: gradient prompt card ──
  if (!savedVehicle) {
    return (
      <div className={styles.promptCard}>
        <div className={styles.promptHeader}>
          <span className={styles.promptTitle}>Tow Match</span>
          <Icon name="info" size={20} />
        </div>
        <p className={styles.promptText}>
          Add your vehicle to see listings that match
        </p>
        <button
          type="button"
          className={styles.promptButton}
          onClick={openSetupModal}
        >
          Add your vehicle
        </button>
      </div>
    );
  }

  // ── Vehicle saved: filter toggle card ──
  const vehicleName = `${savedVehicle.make} ${savedVehicle.model}`;
  const vehicleDetail = `${savedVehicle.trim} · ${savedVehicle.engine}`;

  return (
    <div className={styles.filterCard}>
      <div className={styles.filterHeader}>
        <div>
          <p className={styles.filterVehicleName}>{vehicleName}</p>
          <p className={styles.filterVehicleDetail}>{vehicleDetail}</p>
        </div>
        <button
          type="button"
          className={styles.editBtn}
          onClick={openSetupModal}
          aria-label="Change vehicle"
        >
          <Icon name="edit" size={18} />
        </button>
      </div>

      <div className={styles.toggleRow}>
        <label className={styles.toggleLabel} htmlFor="tow-filter-toggle">
          Only show towable
        </label>
        <button
          id="tow-filter-toggle"
          type="button"
          role="switch"
          aria-checked={towFilterEnabled}
          className={`${styles.toggle} ${towFilterEnabled ? styles.toggleOn : ''}`}
          onClick={() => setTowFilterEnabled(!towFilterEnabled)}
        >
          <span className={styles.toggleKnob} />
        </button>
      </div>

      <p className={styles.matchCount}>
        <strong>{matchCount}</strong> of {totalCount} listings match
      </p>
    </div>
  );
}
