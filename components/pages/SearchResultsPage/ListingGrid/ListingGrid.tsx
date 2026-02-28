import type { SRPListing } from '../../../../app/src/data/srpTypes';
import SRPListingCard from '../SRPListingCard/SRPListingCard';
import SponsoredShowcase from '../SponsoredShowcase/SponsoredShowcase';
import PAACard from '../PAACard/PAACard';
import AdSlot from '../../../ui/AdSlot/AdSlot';
import InlineAdCard from '../../../ui/AdSlot/InlineAdCard';
import SellRvCard from '../SellRvCard/SellRvCard';
import SellRvPromoCard from '../SellRvPromoCard/SellRvPromoCard';
import AiSearchCard from '../AiSearchCard/AiSearchCard';
import styles from './ListingGrid.module.css';

interface ListingGridProps {
  listings: SRPListing[];
  sponsoredListings: SRPListing[];
}

/**
 * Interleaved content inserted between card rows.
 * Key = the row number AFTER which the content appears (1-indexed).
 */
const INTERLEAVED_CONTENT: Record<number, 'sponsored' | 'ad' | 'ai_search' | 'paa'> = {
  3: 'sponsored',
  5: 'ai_search',
  7: 'ad',
  9: 'paa',
};

const CARDS_PER_ROW = 3;

/** Positions in the flat card list where special cards replace listings (0-indexed) */
const INLINE_AD_POSITION = 8;
const SELL_RV_POSITION = 19;

export default function ListingGrid({
  listings,
  sponsoredListings,
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
  };

  const cardNodes: React.ReactNode[] = [];
  let listingIndex = 0;
  const totalSlots = listings.length + Object.keys(specialSlots).length;

  for (let slot = 0; slot < totalSlots && listingIndex < listings.length; slot++) {
    if (specialSlots[slot]) {
      cardNodes.push(specialSlots[slot]);
    } else {
      const listing = listings[listingIndex];
      cardNodes.push(<SRPListingCard key={listing.id} listing={listing} />);
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

    // Check if interleaved content goes after this row
    const interleavedType = INTERLEAVED_CONTENT[rowNumber];
    if (interleavedType) {
      if (interleavedType === 'sponsored') {
        elements.push(
          <div key="interleaved-sponsored" className={styles.interleavedSection}>
            <SponsoredShowcase
              listings={sponsoredListings}
              dealerName="Native Summit RV"
              dealerDescription="Premium RV dealership with over 200 new and pre-owned units"
            />
          </div>,
        );
      } else if (interleavedType === 'ai_search') {
        elements.push(
          <div key="interleaved-ai-search" className={styles.interleavedSection}>
            <AiSearchCard />
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
      } else if (interleavedType === 'paa') {
        elements.push(
          <div key="interleaved-paa" className={styles.interleavedSection}>
            <PAACard
              question="What size RV can I drive with a regular license?"
              answer="In most states, you can drive a Class C motorhome or any towable RV (travel trailer, fifth wheel) with a regular driver's license. Class A motorhomes over 26,000 lbs may require a special license in some states."
            />
          </div>,
        );
      }
    }
  });

  // Append the Figma promo card to the last row of the grid
  elements.push(<SellRvPromoCard key="sell-rv-promo" />);

  return <div className={styles.grid}>{elements}</div>;
}
