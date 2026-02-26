import Icon from '@components/ui/Icon/Icon';
import { useNavigation } from '../NavigationContext';
import styles from './DestinationHeader.module.css';

interface DestinationHeaderProps {
  name: string;
}

export default function DestinationHeader({ name }: DestinationHeaderProps) {
  const { navigateBack } = useNavigation();

  return (
    <div className={styles.header}>
      <div className={styles.row}>
        <button className={styles.backLink} onClick={navigateBack} type="button">
          <Icon name="chevron_left" size={20} />
          <span>Back to listing</span>
        </button>
      </div>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>{name}</h1>
        <button className={styles.saveButton} type="button">
          <Icon name="favorite" size={20} />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
}
