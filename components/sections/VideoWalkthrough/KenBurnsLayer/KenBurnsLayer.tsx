import type {
  VideoSegment,
  MotionPreset,
} from '../../../../app/src/data/videoWalkthroughTypes';
import styles from './KenBurnsLayer.module.css';

interface KenBurnsLayerProps {
  segment: VideoSegment;
  isActive: boolean;
  opacity: number; // 0 or 1, driven by crossfade from parent
  isPaused: boolean;
}

/** Maps MotionPreset values to CSS Module animation classes */
const motionClassMap: Record<MotionPreset, string> = {
  'zoom-in': styles.motionZoomIn,
  'zoom-out': styles.motionZoomOut,
  'pan-left': styles.motionPanLeft,
  'pan-right': styles.motionPanRight,
};

/**
 * Renders a single photo with Ken Burns CSS motion animation.
 *
 * GPU promotion (will-change: transform) is applied only when isActive is true
 * via inline style — inactive layers get will-change: auto to release GPU textures.
 *
 * Opacity and transition on the outer div enable crossfade control from the
 * CompositionCanvas parent.
 */
export default function KenBurnsLayer({
  segment,
  isActive,
  opacity,
  isPaused,
}: KenBurnsLayerProps) {
  const motionClass = motionClassMap[segment.motionPreset];

  return (
    <div
      className={styles.layer}
      style={{ opacity, transition: 'opacity 500ms ease-in-out' }}
    >
      <img
        src={segment.photoUrl}
        alt={segment.photoAlt}
        className={`${styles.photo} ${motionClass}`}
        style={{
          animationDuration: `${segment.durationMs}ms`,
          animationPlayState: isPaused ? 'paused' : 'running',
          willChange: isActive ? 'transform' : 'auto',
        }}
      />
    </div>
  );
}
