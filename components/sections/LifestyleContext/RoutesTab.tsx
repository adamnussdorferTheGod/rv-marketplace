import type { Route } from '../../../app/src/data/lifestyleTypes';
import RouteCard from './RouteCard/RouteCard';
import styles from './RoutesTab.module.css';

interface RoutesTabProps {
  routes: Route[];
}

export default function RoutesTab({ routes }: RoutesTabProps) {
  return (
    <div className={styles.container}>
      {routes.length > 0 ? (
        <div className={styles.scrollTrack}>
          {routes.map(route => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>No routes available</div>
      )}
    </div>
  );
}
