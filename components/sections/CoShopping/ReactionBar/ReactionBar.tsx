import { useCoShopping } from '../CoShoppingContext';
import type { ReactionType } from '../../../../app/src/data/coShoppingTypes';
import Icon from '../../../ui/Icon/Icon';
import styles from './ReactionBar.module.css';

interface ReactionBarProps {
  listId: string;
  listingId: string;
  showCoShopperReactions?: boolean;
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
    activeColor: '#D8202E',
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
    activeColor: '#6E7072',
    inactiveColor: '#C9CACB',
    styleKey: 'pass',
  },
];

function getReactionColor(type: ReactionType): string {
  switch (type) {
    case 'love':
      return '#D8202E';
    case 'maybe':
      return '#FA8131';
    case 'pass':
      return '#6E7072';
    default:
      return '#939598';
  }
}

function getReactionIcon(type: ReactionType): string {
  switch (type) {
    case 'love':
      return 'heart_filled';
    case 'maybe':
      return 'help_outline';
    case 'pass':
      return 'block';
    default:
      return 'favorite';
  }
}

export default function ReactionBar({
  listId,
  listingId,
  showCoShopperReactions = true,
  compact = false,
}: ReactionBarProps) {
  const {
    setReaction,
    getReactionsForListing,
    currentUserId,
    activeList,
  } = useCoShopping();

  const reactions = getReactionsForListing(listId, listingId);
  const currentUserReaction = reactions.find(
    (r) => r.memberId === currentUserId,
  );
  const currentType = currentUserReaction?.type ?? 'none';

  const members = activeList?.members ?? [];
  const otherMembers = members.filter((m) => m.id !== currentUserId);

  return (
    <div className={`${styles.reactionBar} ${compact ? styles.compact : ''}`}>
      <div className={styles.buttons}>
        {REACTION_CONFIG.map((config) => {
          const isActive = currentType === config.type;
          const iconName = isActive ? config.activeIcon : config.inactiveIcon;
          const iconColor = isActive ? config.activeColor : config.inactiveColor;

          return (
            <button
              key={config.type}
              type="button"
              className={`${styles.reactionButton} ${isActive ? `${styles.reactionButtonActive} ${styles[config.styleKey]}` : ''}`}
              onClick={() => setReaction(listId, listingId, config.type)}
              aria-label={`${config.label} reaction`}
              aria-pressed={isActive}
            >
              <span style={{ color: iconColor }}>
                <Icon name={iconName} size={compact ? 20 : 24} />
              </span>
              <span
                className={styles.reactionLabel}
                style={isActive ? { color: iconColor } : undefined}
              >
                {config.label}
              </span>
            </button>
          );
        })}
      </div>

      {showCoShopperReactions && otherMembers.length > 0 && (
        <div className={styles.coShopperReactions}>
          {otherMembers.map((member) => {
            const memberReaction = reactions.find(
              (r) => r.memberId === member.id,
            );
            const memberType = memberReaction?.type ?? 'none';
            const hasReaction = memberType !== 'none';

            return (
              <div key={member.id} className={styles.coShopperRow}>
                <div
                  className={styles.avatar}
                  style={{ backgroundColor: member.avatarColor }}
                >
                  {member.avatarInitials}
                </div>
                <span className={styles.coShopperName}>
                  {member.displayName}
                </span>
                {hasReaction ? (
                  <span style={{ color: getReactionColor(memberType) }}>
                    <Icon name={getReactionIcon(memberType)} size={16} />
                  </span>
                ) : (
                  <span className={styles.coShopperStatus}>
                    Hasn't decided
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
