import { Link } from 'react-router-dom';
import { sampleSrpListings } from '../../../../app/src/data/sampleSrpListings';
import { listingPath } from '../../../../app/src/routes';
import type { SRPListing } from '../../../../app/src/data/srpTypes';
import { RV_TYPE_LABELS } from '../../../../app/src/data/srpTypes';
import { useCoShopping } from '../CoShoppingContext';
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
  lbs ? `${lbs.toLocaleString('en-US')} lbs` : '--';

const formatLength = (ft: number | null | undefined): string =>
  ft ? `${ft}ft` : '--';

const formatSleeps = (capacity: number | null | undefined): string =>
  capacity ? `${capacity}` : '--';

const formatMileage = (mi: number | null | undefined): string =>
  mi ? `${mi.toLocaleString('en-US')} mi` : '--';

const formatMonthly = (amount: number | null | undefined): string =>
  amount ? `${formatPrice(amount)}/mo` : '--';

const formatDealRating = (rating: string | null | undefined): string => {
  if (!rating) return '--';
  return rating.charAt(0).toUpperCase() + rating.slice(1);
};

const formatFuel = (fuel: string | null | undefined): string => {
  if (!fuel || fuel === 'n/a') return '--';
  return fuel.charAt(0).toUpperCase() + fuel.slice(1);
};

// ─── Spec row definitions ────────────────────────────────────────────

interface SpecRow {
  label: string;
  getValue: (listing: SRPListing) => string;

}

const specRows: SpecRow[] = [
  // Pricing
  {
    label: 'Price',
    getValue: (listing) => formatPrice(listing.currentPrice),

  },
  {
    label: 'Est. Monthly',
    getValue: (listing) => formatMonthly(listing.monthlyPayment),

  },
  {
    label: 'Deal Rating',
    getValue: (listing) => formatDealRating(listing.dealRating),

  },

  // Specs
  {
    label: 'Year',
    getValue: (listing) => `${listing.year}`,

  },
  {
    label: 'Type',
    getValue: (listing) => RV_TYPE_LABELS[listing.rvType] ?? '--',

  },
  {
    label: 'Condition',
    getValue: (listing) => listing.condition === 'new' ? 'New' : 'Used',

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
    label: 'Fuel',
    getValue: (listing) => formatFuel(listing.fuelType),

  },
  {
    label: 'Mileage',
    getValue: (listing) => formatMileage(listing.mileage),

  },

  // Layout
  {
    label: 'Sleeps',
    getValue: (listing) => formatSleeps(listing.sleepingCapacity),

  },
  {
    label: 'Floor Plan',
    getValue: (listing) => listing.floorPlan ?? '--',

  },

  // Dealer
  {
    label: 'Dealer',
    getValue: (listing) => listing.dealer.name,

  },
  {
    label: 'Location',
    getValue: (listing) => `${listing.location.city}, ${listing.location.state}`,

  },
];

// ─── Component ───────────────────────────────────────────────────────

export default function CompareView({ listId, listingIds }: CompareViewProps) {
  const { getReactionsForListing, activeList } = useCoShopping();

  // Look up listings from sample data
  const listings = listingIds
    .map((id) => sampleSrpListings.find((l) => l.id === id))
    .filter((l): l is SRPListing => l != null);

  // Get members from the active list
  const members = activeList?.id === listId ? activeList.members : [];

  // ── Empty state ──────────────────────────────────────────────────
  if (listings.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <Icon name="list" size={48} />
          <p className={styles.emptyText}>No listings to compare</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* ── Column headers: photos + info + view listing ──────── */}
      <div className={styles.columnsRow}>
        {listings.map((listing) => {
          const photo = listing.photos?.[0];
          const titleParts = listing.title.split(' ');
          // Split into make line and model line (first 2-3 words vs rest)
          const makeLine = titleParts.slice(0, 3).join(' ');
          const modelLine = titleParts.slice(3).join(' ');

          return (
            <div key={listing.id} className={styles.columnCard}>
              {photo ? (
                <img
                  className={styles.columnPhoto}
                  src={photo.url}
                  alt={photo.alt}
                />
              ) : (
                <div className={styles.columnPhotoPlaceholder}>
                  <Icon name="directions_car" size={48} />
                </div>
              )}
              <div className={styles.columnInfo}>
                <h3 className={styles.columnTitle}>{makeLine}</h3>
                {modelLine && (
                  <span className={styles.columnSubtitle}>{modelLine}</span>
                )}
                <Link
                  to={listingPath(listing.id)}
                  className={styles.viewListingBtn}
                >
                  View listing
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Spec rows ────────────────────────────────────────── */}
      {specRows.map((row) => (
        <div key={row.label} className={styles.specRow}>
          <div className={styles.specLabel}>{row.label}</div>
          <div className={styles.valueRow}>
            {listings.map((listing) => {
              const value = row.getValue(listing);
              return (
                <div
                  key={listing.id}
                  className={`${styles.valueCell}${value === '--' ? ` ${styles.naValue}` : ''}`}
                >
                  {value}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* ── Reaction rows (per member) ───────────────────────── */}
      {members.map((member) => (
        <div key={`reaction-${member.id}`} className={styles.specRow}>
          <div className={styles.specLabel}>{member.displayName}</div>
          <div className={styles.valueRow}>
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

              if (reactionType === 'love') {
                return (
                  <div key={listing.id} className={styles.valueCell}>
                    <span className={styles.reactionHeart}>
                      <Icon name="heart_filled" size={24} />
                    </span>
                  </div>
                );
              }

              return (
                <div key={listing.id} className={`${styles.valueCell} ${styles.naValue}`}>
                  <Icon name="block" size={24} />
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* ── Match row ────────────────────────────────────────── */}
      {members.length > 0 && (
        <div className={styles.specRow}>
          <div className={styles.specLabel}>Match</div>
          <div className={styles.valueRow}>
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
                    <span className={styles.matchCheck}>
                      <Icon name="check" size={24} />
                    </span>
                  ) : (
                    <span className={styles.naValue}>—</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
