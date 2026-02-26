import { useState } from 'react';
import Icon from '@components/ui/Icon/Icon';
import { useNavigation } from '../NavigationContext';
import styles from './DestinationHeader.module.css';

interface DestinationHeaderProps {
  name: string;
}

export default function DestinationHeader({ name }: DestinationHeaderProps) {
  const { navigateBack } = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);

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
        <button className={styles.saveButton} onClick={() => setIsFavorite(!isFavorite)} type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? '#E53935' : '#fff'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span>{isFavorite ? 'Saved' : 'Save'}</span>
        </button>
      </div>
    </div>
  );
}
