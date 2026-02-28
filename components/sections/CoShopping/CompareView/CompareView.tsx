import { Link } from 'react-router-dom';
import { sampleSrpListings } from '../../../../app/src/data/sampleSrpListings';
import {
  calculateTowCompatibility,
  isTowableType,
  getVerdictLabel,
  getVerdictColor,
} from '../../../../app/src/data/towCompatibility';
import { listingPath } from '../../../../app/src/routes';
import { RV_TYPE_LABELS } from '../../../../app/src/data/srpTypes';
import type { SRPListing } from '../../../../app/src/data/srpTypes';
import type { ReactionType } from '../../../../app/src/data/coShoppingTypes';
import { useCoShopping } from '../CoShoppingContext';
import { useTowVehicle } from '../../TowVehicleSetup/TowVehicleContext';
import Icon from '../../../ui/Icon/Icon';
import styles from './CompareView.module.css';

// ─── Props ───────────────────────────────────────────────────────────

interface CompareViewProps {
  listId: string;
  listingIds: string[]; // up to 3 listing IDs to compare
  onClose?: () => void;
}

// ─── Formatting helpers ──────────────────────────────────────────────

const formatPrice = (price: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);

const formatWeight = (lbs: number | null | undefined): string =>
  lbs ? `${lbs.toLocaleString('en-US')} lbs` : 'N/A';

const formatLength = (ft: number | null | undefined): string =>
  ft ? `${ft} ft` : 'N/A';

const formatSleeps = (capacity: number | null | undefined): string =>
  capacity ? `${capacity}` : 'N/A';

// ─── Reaction display config ────────────────────────────────────────

const REACTION_CONFIG: Record<
  Exclude<ReactionType, 'none' | 'maybe'>,
  { icon: string; color: string; label: string }
> = {
  love: { icon: 'heart_filled', color: 'var(--color-red-500)', label: 'Love' },
  pass: { icon: 'block', color: 'var(--rv-on-surface-variant)', label: 'Pass' },
};

// ─── Spec row definitions ────────────────────────────────────────────

interface SpecRow {
  label: string;
  getValue: (listing: SRPListing) => string | { current: string; original?: string };
}

const specRows: SpecRow[] = [
  {
    label: 'Price',
    getValue: (listing) => {
      if (listing.originalPrice) {
        return {
          current: formatPrice(listing.currentPrice),
          original: formatPrice(listing.originalPrice),
        };
      }
      return formatPrice(listing.currentPrice);
    },
  },
  {
    label: 'Length',
    getValue: (listing) => formatLength(listing.lengthFt),
  },
  {
    label: 'Weight',
    getValue: (listing) => formatWeight(listing.grossVehicleWeight ?? listing.gvwr ?? null),
  },
  {
    label: 'Sleeps',
    getValue: (listing) => formatSleeps(listing.sleepingCapacity),
  },
  {
    label: 'Slides',
    getValue: () => 'N/A',
  },
  {
    label: 'Fresh Water',
    getValue: () => 'N/A',
  },
];

// ─── Component ───────────────────────────────────────────────────────

export default function CompareView({ listId, listingIds, onClose }: CompareViewProps) {
  const { getReactionsForListing, getCommentsForListing, activeList } = useCoShopping();
  const { savedVehicle } = useTowVehicle();

  // Look up listings from sample data
  const listings = listingIds
    .slice(0, 3)
    .map((id) => sampleSrpListings.find((l) => l.id === id))
    .filter((l): l is SRPListing => l != null);

  // Get members from the active list
  const members = activeList?.id === listId ? activeList.members : [];

  // ── Empty state ──────────────────────────────────────────────────
  if (listings.length === 0) {
    return (
      <div className={styles.container}>
        {onClose && (
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close comparison"
          >
            <Icon name="x_close" size={24} />
          </button>
        )}
        <div className={styles.emptyState}>
          <Icon name="list" size={48} />
          <p className={styles.emptyText}>No listings to compare</p>
        </div>
      </div>
    );
  }

  const columnCount = listings.length;

  // Track row index for continued zebra striping from spec rows
  let rowIndex = specRows.length;

  return (
    <div className={styles.container}>
      {onClose && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close comparison"
        >
          <Icon name="x_close" size={24} />
        </button>
      )}

      <div
        className={styles.grid}
        style={{ '--column-count': columnCount } as React.CSSProperties}
      >
        {/* ── Column headers ──────────────────────────────────── */}
        <div className={styles.headerLabel} />
        {listings.map((listing) => {
          const photo = listing.photos?.[0];
          const conditionLabel =
            listing.condition.charAt(0).toUpperCase() + listing.condition.slice(1);
          const rvTypeLabel = RV_TYPE_LABELS[listing.rvType] ?? listing.rvType;
          const subtitle = `${conditionLabel} \u2022 ${rvTypeLabel}`;

          return (
            <div key={listing.id} className={styles.headerCell}>
              {photo ? (
                <img
                  className={styles.headerPhoto}
                  src={photo.url}
                  alt={photo.alt}
                />
              ) : (
                <div className={styles.headerPhotoPlaceholder}>
                  <Icon name="rv_type" size={48} />
                </div>
              )}
              <h3 className={styles.headerTitle}>{listing.title}</h3>
              <span className={styles.headerSubtitle}>{subtitle}</span>
            </div>
          );
        })}

        {/* ── Spec rows ───────────────────────────────────────── */}
        {specRows.map((row, specIdx) => (
          <div
            key={row.label}
            className={styles.specRow}
            style={{ '--row-index': specIdx } as React.CSSProperties}
          >
            <div className={styles.rowLabel}>{row.label}</div>
            {listings.map((listing) => {
              const value = row.getValue(listing);

              if (typeof value === 'object' && 'original' in value) {
                return (
                  <div key={listing.id} className={styles.valueCell}>
                    {value.original && (
                      <span className={styles.originalPrice}>{value.original}</span>
                    )}
                    <span>{value.current}</span>
                  </div>
                );
              }

              return (
                <div
                  key={listing.id}
                  className={`${styles.valueCell}${value === 'N/A' ? ` ${styles.naValue}` : ''}`}
                >
                  {value}
                </div>
              );
            })}
          </div>
        ))}

        {/* ── Reaction rows (per member) ──────────────────────── */}
        {members.map((member) => {
          const currentRowIndex = rowIndex++;
          return (
            <div
              key={`reaction-${member.id}`}
              className={styles.specRow}
              style={{ '--row-index': currentRowIndex } as React.CSSProperties}
            >
              <div className={styles.rowLabel}>{member.displayName}</div>
              {listings.map((listing) => {
                const reactions = getReactionsForListing(listId, listing.id);
                const memberReaction = reactions.find((r) => r.memberId === member.id);
                const reactionType = memberReaction?.type;

                if (!reactionType || reactionType === 'none' || reactionType === 'maybe') {
                  return (
                    <div key={listing.id} className={`${styles.valueCell} ${styles.naValue}`}>
                      —
                    </div>
                  );
                }

                const config = REACTION_CONFIG[reactionType];
                return (
                  <div key={listing.id} className={styles.valueCell}>
                    <span className={styles.reactionIcon} style={{ color: config.color }}>
                      <Icon name={config.icon} size={16} />
                      {config.label}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* ── Match status row ────────────────────────────────── */}
        {members.length > 0 && (() => {
          const matchRowIndex = rowIndex++;
          return (
            <div
              className={styles.specRow}
              style={{ '--row-index': matchRowIndex } as React.CSSProperties}
            >
              <div className={styles.rowLabel}>Match</div>
              {listings.map((listing) => {
                const reactions = getReactionsForListing(listId, listing.id);
                const allLove =
                  members.length > 0 &&
                  members.every((m) => {
                    const r = reactions.find((rx) => rx.memberId === m.id);
                    return r?.type === 'love';
                  });

                return (
                  <div key={listing.id} className={styles.valueCell}>
                    {allLove ? (
                      <span className={styles.matchYes}>
                        <Icon name="heart_filled" size={14} /> Yes
                      </span>
                    ) : (
                      <span>No</span>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })()}

        {/* ── Tow match row ───────────────────────────────────── */}
        {(() => {
          const towRowIndex = rowIndex++;
          return (
            <div
              className={styles.specRow}
              style={{ '--row-index': towRowIndex } as React.CSSProperties}
            >
              <div className={styles.rowLabel}>Tow Match</div>
              {listings.map((listing) => {
                // Motorhome / non-towable
                if (!isTowableType(listing.rvType)) {
                  return (
                    <div key={listing.id} className={`${styles.valueCell} ${styles.naValue}`}>
                      N/A
                    </div>
                  );
                }

                // No saved vehicle
                if (!savedVehicle) {
                  return (
                    <div key={listing.id} className={`${styles.valueCell} ${styles.naValue}`}>
                      Add vehicle
                    </div>
                  );
                }

                const result = calculateTowCompatibility(savedVehicle, {
                  gvwr: listing.gvwr ?? listing.grossVehicleWeight ?? 0,
                  tongueWeight: listing.tongueWeight,
                  hitchType: listing.hitchType,
                  lengthFt: listing.lengthFt,
                });

                const verdictLabel = getVerdictLabel(result.verdict);
                const verdictColor = getVerdictColor(result.verdict);
                const capacityPercent = Math.round(result.checks.towWeight.percentUsed);

                return (
                  <div key={listing.id} className={styles.valueCell}>
                    <span className={styles.towVerdict} style={{ color: verdictColor }}>
                      {verdictLabel}
                    </span>
                    <span className={styles.towCapacity}>{capacityPercent}% capacity</span>
                  </div>
                );
              })}
            </div>
          );
        })()}

        {/* ── Comment count row ───────────────────────────────── */}
        {(() => {
          const commentRowIndex = rowIndex++;
          return (
            <div
              className={styles.specRow}
              style={{ '--row-index': commentRowIndex } as React.CSSProperties}
            >
              <div className={styles.rowLabel}>Comments</div>
              {listings.map((listing) => {
                const comments = getCommentsForListing(listId, listing.id);
                const count = comments.length;

                return (
                  <div key={listing.id} className={styles.valueCell}>
                    <span className={styles.commentCell}>
                      <Icon name="sms" size={16} />
                      {count} comment{count !== 1 ? 's' : ''}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })()}

        {/* ── View Listing link row ───────────────────────────── */}
        {(() => {
          const linkRowIndex = rowIndex++;
          return (
            <div
              className={styles.specRow}
              style={{ '--row-index': linkRowIndex } as React.CSSProperties}
            >
              <div className={styles.rowLabel} />
              {listings.map((listing) => (
                <div key={listing.id} className={styles.valueCell}>
                  <Link to={listingPath(listing.id)} className={styles.viewLink}>
                    View Listing
                  </Link>
                </div>
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
