/**
 * Export video walkthrough transcripts for all listings.
 * Run: npx tsx scripts/exportTranscripts.ts
 * Output: scripts/transcripts.json
 */
import fs from 'fs';
import { listingsBySlug } from '../app/src/data/scrapedListings';
import { generateVideoWalkthrough } from '../app/src/data/generateVideoWalkthrough';

interface SegmentTranscript {
  segmentId: string;
  transcript: string;
}

interface ListingTranscript {
  slug: string;
  title: string;
  fullTranscript: string;
  segments: SegmentTranscript[];
}

const output: ListingTranscript[] = [];

for (const [slug, listing] of Object.entries(listingsBySlug)) {
  const walkthrough = generateVideoWalkthrough(listing);
  const segments = walkthrough.audio.segments.map((s) => ({
    segmentId: s.segmentId,
    transcript: s.transcript,
  }));
  const fullTranscript = segments.map((s) => s.transcript).join(' ');

  output.push({ slug, title: listing.title, fullTranscript, segments });
}

const json = JSON.stringify(output, null, 2);
fs.writeFileSync('scripts/transcripts.json', json);
console.log(`Exported transcripts for ${output.length} listings to scripts/transcripts.json`);
