import type { SRPListing } from '../../../../app/src/data/srpTypes';
import type { TowVerdict } from '../../../../app/src/data/towTypes';
import SRPListingCard from '../SRPListingCard/SRPListingCard';
import AdSlot from '../../../ui/AdSlot/AdSlot';
import InlineAdCard from '../../../ui/AdSlot/InlineAdCard';
import SellRvCard from '../SellRvCard/SellRvCard';
import SellRvPromoCard from '../SellRvPromoCard/SellRvPromoCard';
import AiQuestionBanner from '../../../pages/HomePage/AiQuestionBanner/AiQuestionBanner';
import styles from './ListingGrid.module.css';

interface ListingGridProps {
  listings: SRPListing[];
  towVerdicts?: Map<string, TowVerdict>;
  afterRow4?: React.ReactNode;
}

/**
 * Interleaved content inserted between card rows.
 * Key = the row number AFTER which the content appears (1-indexed).
 */
const INTERLEAVED_CONTENT: Record<number, 'ad' | 'ai_search'> = {
  5: 'ai_search',
  7: 'ad',
};

const CARDS_PER_ROW = 3;

/** Positions in the flat card list where special cards replace listings (0-indexed) */
const INLINE_AD_POSITION = 8;
const SELL_RV_POSITION = 19;
const SELL_RV_PROMO_POSITION = 23;

export default function ListingGrid({
  listings,
  towVerdicts,
  afterRow4,
}: ListingGridProps) {
  if (listings.length === 0) {
    return (
      <div className={styles.grid}>
        <div className={styles.emptyState}>
          <h2 className={styles.emptyTitle}>No results found</h2>
          <p>Try adjusting your filters or broadening your search criteria.</p>
        </div>
      </div>
    );
  }

  // Build flat list of card-level nodes (listings + special cards)
  const specialSlots: Record<number, React.ReactNode> = {
    [INLINE_AD_POSITION]: <InlineAdCard key="inline-ad" />,
    [SELL_RV_POSITION]: <SellRvCard key="sell-rv" />,
    [SELL_RV_PROMO_POSITION]: <SellRvPromoCard key="sell-rv-promo" />,
  };

  const cardNodes: React.ReactNode[] = [];
  let listingIndex = 0;
  const totalSlots = listings.length + Object.keys(specialSlots).length;

  for (let slot = 0; slot < totalSlots && listingIndex < listings.length; slot++) {
    if (specialSlots[slot]) {
      cardNodes.push(specialSlots[slot]);
    } else {
      const listing = listings[listingIndex];
      cardNodes.push(
        <SRPListingCard
          key={listing.id}
          listing={listing}
          towVerdict={towVerdicts?.get(listing.id)}
        />,
      );
      listingIndex++;
    }
  }

  // Split card nodes into rows of 3 for interleaving logic
  const rows: React.ReactNode[][] = [];
  for (let i = 0; i < cardNodes.length; i += CARDS_PER_ROW) {
    rows.push(cardNodes.slice(i, i + CARDS_PER_ROW));
  }

  const elements: React.ReactNode[] = [];

  rows.forEach((row, rowIndex) => {
    const rowNumber = rowIndex + 1;

    // Render each card in this row
    row.forEach((node) => {
      elements.push(node);
    });

    // Custom content after row 4
    if (rowNumber === 4 && afterRow4) {
      elements.push(
        <div key="after-row-4" className={styles.interleavedSection}>
          {afterRow4}
        </div>,
      );
    }

    // Check if interleaved content goes after this row
    const interleavedType = INTERLEAVED_CONTENT[rowNumber];
    if (interleavedType) {
      if (interleavedType === 'ai_search') {
        elements.push(
          <div key="interleaved-ai-search" className={styles.interleavedSection}>
            <AiQuestionBanner />
          </div>,
        );
      } else if (interleavedType === 'ad') {
        elements.push(
          <div key="interleaved-ad" className={styles.interleavedSection}>
            <AdSlot
              width={728}
              height={250}
              label="Leaderboard Ad"
              className={styles.adSlotFull}
            />
          </div>,
        );
      }
    }
  });

  return <div className={styles.grid}>{elements}</div>;
}
