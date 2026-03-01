import { sampleLifestyle } from '../../../app/src/data/sampleLifestyle';
import DestinationsTab from './DestinationsTab';
import styles from './LifestyleContext.module.css';

export default function LifestyleContext() {
  const { destinations, rvSpecs } = sampleLifestyle;

  return (
    <section className={styles.container}>
      <DestinationsTab
        destinations={destinations}
        rvLengthFt={rvSpecs.lengthFt}
      />
    </section>
  );
}
