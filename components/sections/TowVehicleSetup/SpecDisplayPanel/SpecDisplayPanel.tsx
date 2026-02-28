import type { TowVehicle } from '../../../../app/src/data/towTypes';
import styles from './SpecDisplayPanel.module.css';

interface SpecDisplayPanelProps {
  vehicle: TowVehicle | null;
}

interface SpecStat {
  label: string;
  value: string;
}

function formatWeight(lbs: number): string {
  return lbs.toLocaleString('en-US') + ' lbs';
}

export default function SpecDisplayPanel({ vehicle }: SpecDisplayPanelProps) {
  if (!vehicle) return null;

  const stats: SpecStat[] = [
    { label: 'Max Towing', value: formatWeight(vehicle.maxTow) },
    { label: 'Payload', value: formatWeight(vehicle.payload) },
    { label: 'GCWR', value: formatWeight(vehicle.gcwr) },
    { label: 'Tongue Weight', value: formatWeight(vehicle.maxTongue) },
    { label: 'Hitch Class', value: `Class ${vehicle.hitchClass}` },
    { label: 'Wheelbase', value: `${vehicle.wheelbase}"` },
  ];

  return (
    <div className={styles.panel}>
      <h4 className={styles.heading}>Tow Ratings</h4>
      <div className={styles.grid}>
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={styles.card}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className={styles.statLabel}>{stat.label}</span>
            <span className={styles.statValue}>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
