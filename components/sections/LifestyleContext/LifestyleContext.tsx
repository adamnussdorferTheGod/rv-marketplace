import { useState } from 'react';
import { sampleLifestyle } from '../../../app/src/data/sampleLifestyle';
import DestinationsTab from './DestinationsTab';
import RoutesTab from './RoutesTab';
import styles from './LifestyleContext.module.css';

type TabId = 'destinations' | 'routes';

export default function LifestyleContext() {
  const [activeTab, setActiveTab] = useState<TabId>('destinations');
  const { location, destinations, routes, rvSpecs } = sampleLifestyle;

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.heading}>
          Your RV Life from {location.city}, {location.stateAbbrev}
        </h2>
      </div>
      <div className={styles.tabBar}>
        <button
          className={`${styles.tab} ${activeTab === 'destinations' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('destinations')}
          aria-pressed={activeTab === 'destinations'}
        >
          Destinations
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'routes' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('routes')}
          aria-pressed={activeTab === 'routes'}
        >
          Routes
        </button>
      </div>
      <div className={styles.content}>
        {activeTab === 'destinations' && (
          <DestinationsTab
            destinations={destinations}
            rvLengthFt={rvSpecs.lengthFt}
          />
        )}
        {activeTab === 'routes' && (
          <RoutesTab routes={routes} />
        )}
      </div>
    </section>
  );
}
