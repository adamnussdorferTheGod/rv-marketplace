import type { TowVehicle } from '../../../../app/src/data/towTypes';
import { useTowVehicle } from '../TowVehicleContext';
import Icon from '@components/ui/Icon/Icon';
import Button from '@components/ui/Button/Button';
import styles from './TowVehicleModal.module.css';

interface WizardStepConfirmProps {
  vehicle: TowVehicle;
  onBack: () => void;
}

interface SpecStat {
  label: string;
  value: string;
}

function formatWeight(lbs: number): string {
  return lbs.toLocaleString('en-US') + ' lbs';
}

export default function WizardStepConfirm({ vehicle, onBack }: WizardStepConfirmProps) {
  const { saveVehicle } = useTowVehicle();

  const stats: SpecStat[] = [
    { label: 'Max Towing', value: formatWeight(vehicle.maxTow) },
    { label: 'Payload', value: formatWeight(vehicle.payload) },
    { label: 'GCWR', value: formatWeight(vehicle.gcwr) },
    { label: 'Tongue Weight', value: formatWeight(vehicle.maxTongue) },
    { label: 'Hitch Class', value: `Class ${vehicle.hitchClass}` },
    { label: 'Wheelbase', value: `${vehicle.wheelbase}"` },
  ];

  return (
    <div className={styles.stepContent}>
      <h2 className={styles.stepHeadingCenter}>
        {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}
      </h2>
      <p className={styles.stepSubtextCenter}>
        {vehicle.engine} &middot; {vehicle.cab} &middot; {vehicle.bed}
      </p>

      <div className={styles.specGrid}>
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={styles.specCard}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className={styles.specLabel}>{stat.label}</span>
            <span className={styles.specValue}>{stat.value}</span>
          </div>
        ))}
      </div>

      <div className={styles.buttonRow}>
        <button type="button" className={styles.backBtnInline} onClick={onBack}>
          <Icon name="chevron_left" size={18} />
          Back
        </button>
        <Button
          variant="primary"
          size="lg"
          onClick={() => saveVehicle(vehicle)}
        >
          Save My Vehicle
        </Button>
      </div>
    </div>
  );
}
