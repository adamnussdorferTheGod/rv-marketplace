import { useCoShopping } from '../CoShoppingContext';
import type { ReactionType } from '../../../../app/src/data/coShoppingTypes';
import Icon from '../../../ui/Icon/Icon';
import styles from './ReactionBar.module.css';

interface ReactionBarProps {
  listId: string;
  listingId: string;
  compact?: boolean;
}

const REACTION_CONFIG: {
  type: ReactionType;
  label: string;
  activeIcon: string;
  inactiveIcon: string;
  activeColor: string;
  inactiveColor: string;
  styleKey: string;
}[] = [
  {
    type: 'love',
    label: 'Love',
    activeIcon: 'heart_filled',
    inactiveIcon: 'favorite',
    activeColor: '#006836',
    inactiveColor: '#939598',
    styleKey: 'love',
  },
  {
    type: 'maybe',
    label: 'Maybe',
    activeIcon: 'help_outline',
    inactiveIcon: 'help_outline',
    activeColor: '#FA8131',
    inactiveColor: '#939598',
    styleKey: 'maybe',
  },
  {
    type: 'pass',
    label: 'Pass',
    activeIcon: 'block',
    inactiveIcon: 'block',
    activeColor: '#82131C',
    inactiveColor: '#C9CACB',
    styleKey: 'pass',
  },
];

export default function ReactionBar({
  listId,
  listingId,
  compact = false,
}: ReactionBarProps) {
  const {
    setReaction,
    getReactionsForListing,
    currentUserId,
    activeList,
  } = useCoShopping();

  const members = activeList?.members ?? [];

  const reactions = getReactionsForListing(listId, listingId);
  const currentUserReaction = reactions.find(
    (r) => r.memberId === currentUserId,
  );
  const currentType = currentUserReaction?.type ?? 'none';

  // Count votes per reaction type
  const voteCounts: Record<ReactionType, number> = {
    love: 0,
    maybe: 0,
    pass: 0,
    none: 0,
  };
  for (const r of reactions) {
    if (r.type !== 'none') {
      voteCounts[r.type]++;
    }
  }

  return (
    <div className={`${styles.buttons} ${compact ? styles.compact : ''}`}>
      {REACTION_CONFIG.map((config) => {
        const isActive = currentType === config.type;
        const iconName = isActive ? config.activeIcon : config.inactiveIcon;
        const iconColor = isActive ? config.activeColor : config.inactiveColor;
        const count = voteCounts[config.type];
        const reactors = reactions
          .filter((r) => r.type === config.type)
          .map((r) => members.find((m) => m.id === r.memberId))
          .filter(Boolean);

        return (
          <button
            key={config.type}
            type="button"
            className={`${styles.reactionButton} ${isActive ? `${styles.active} ${styles[config.styleKey]}` : ''}`}
            onClick={() => setReaction(listId, listingId, config.type)}
            aria-label={`${config.label} reaction`}
            aria-pressed={isActive}
          >
            <span style={{ color: iconColor }}>
              <Icon name={iconName} size={compact ? 20 : 24} />
            </span>
            <span
              className={styles.reactionLabel}
              style={isActive ? { color: '#252526' } : undefined}
            >
              {config.label}
            </span>
            {count > 0 && (
              <span className={styles.countWrap}>
                <span className={styles.countBubble}>{count}</span>
                <span className={styles.countTooltip}>
                  {reactors.map((member) => (
                    <span key={member!.id} className={styles.tooltipRow}>
                      <span
                        className={styles.tooltipAvatar}
                        style={member!.avatarUrl ? undefined : { backgroundColor: member!.avatarColor }}
                      >
                        {member!.avatarUrl ? (
                          <img src={member!.avatarUrl} alt={member!.displayName} className={styles.tooltipAvatarImg} />
                        ) : (
                          member!.avatarInitials
                        )}
                      </span>
                      <span className={styles.tooltipName}>{member!.displayName}</span>
                    </span>
                  ))}
                </span>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
