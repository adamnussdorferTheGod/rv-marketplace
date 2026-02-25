import Icon from '@components/ui/Icon/Icon';
import { formatDuration } from '../../../../app/src/data/videoWalkthroughTypes';
import styles from './VideoThumbnail.module.css';

interface VideoThumbnailProps {
  posterUrl: string;
  duration: number;
  onPlay: () => void;
}

export default function VideoThumbnail({ posterUrl, duration, onPlay }: VideoThumbnailProps) {
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPlay();
    }
  }

  return (
    <div
      className={styles.container}
      role="button"
      tabIndex={0}
      aria-label="Play AI Video Tour"
      onClick={onPlay}
      onKeyDown={handleKeyDown}
    >
      <img
        src={posterUrl}
        alt="AI Video Tour preview"
        className={styles.posterImage}
      />
      {/* GAL-03: AI Video Tour label */}
      <div className={styles.aiLabel}>
        <Icon name="sparkles" size={14} />
        <span>AI Video Tour</span>
      </div>
      {/* GAL-01: Play button */}
      <div className={styles.playButton}>
        <div className={styles.playIcon} />
      </div>
      {/* GAL-02: Duration badge */}
      <div className={styles.durationBadge}>
        {formatDuration(duration)}
      </div>
    </div>
  );
}
