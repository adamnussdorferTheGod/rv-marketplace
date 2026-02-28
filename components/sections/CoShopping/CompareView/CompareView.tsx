import { sampleSrpListings } from '../../../../app/src/data/sampleSrpListings';
import { RV_TYPE_LABELS } from '../../../../app/src/data/srpTypes';
import type { SRPListing } from '../../../../app/src/data/srpTypes';
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

export default function CompareView({ listId: _listId, listingIds, onClose }: CompareViewProps) {
  // Look up listings from sample data
  const listings = listingIds
    .slice(0, 3)
    .map((id) => sampleSrpListings.find((l) => l.id === id))
    .filter((l): l is SRPListing => l != null);

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
                  <Icon name="directions_car" size={48} />
                </div>
              )}
              <h3 className={styles.headerTitle}>{listing.title}</h3>
              <span className={styles.headerSubtitle}>{subtitle}</span>
            </div>
          );
        })}

        {/* ── Spec rows ───────────────────────────────────────── */}
        {specRows.map((row, rowIndex) => (
          <div
            key={row.label}
            className={styles.specRow}
            style={{ '--row-index': rowIndex } as React.CSSProperties}
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
      </div>
    </div>
  );
}
