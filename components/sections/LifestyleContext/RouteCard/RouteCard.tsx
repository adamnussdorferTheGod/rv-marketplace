import type { Route, RouteSuitability } from '../../../../app/src/data/lifestyleTypes';
import styles from './RouteCard.module.css';

interface RouteCardProps {
  route: Route;
  onClick?: () => void;
}

const SUITABILITY_CONFIG: Record<RouteSuitability, { label: string; className: string }> = {
  easy: { label: 'Easy', className: 'badgeEasy' },
  moderate: { label: 'Moderate', className: 'badgeMod' },
  challenging: { label: 'Challenging', className: 'badgeChal' },
};

export default function RouteCard({ route, onClick }: RouteCardProps) {
  const suitability = SUITABILITY_CONFIG[route.suitability];
  const stopsString = route.stops.map((s) => s.name).join(', ');

  return (
    <button
      className={styles.card}
      onClick={onClick}
      type="button"
    >
      {/* Mini map placeholder with CSS route line */}
      <div className={styles.mapPlaceholder}>
        <span className={styles.startDot} />
        <span className={styles.endDot} />
        <span className={`${styles.badge} ${styles[suitability.className]}`}>
          {suitability.label}
        </span>
      </div>

      {/* Content area */}
      <div className={styles.content}>
        <div className={styles.name}>{route.name}</div>

        <div className={styles.statsRow}>
          <span>{route.distanceMiles} mi</span>
          <span className={styles.dot}>&middot;</span>
          <span>{route.durationDays} days</span>
        </div>

        <div className={styles.stops}>{stopsString}</div>

        <div className={styles.infoRow}>
          <span>{route.bestSeason}</span>
          <span className={styles.dot}>&middot;</span>
          <span>{route.campgroundCount} campgrounds</span>
        </div>

        <div className={styles.suitNote}>{route.suitabilityNote}</div>
      </div>
    </button>
  );
}
