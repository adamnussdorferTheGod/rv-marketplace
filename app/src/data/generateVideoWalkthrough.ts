import type { ListingData } from './types';
import type {
  VideoWalkthroughData,
  VideoAct,
  AudioTimingSegment,
  MotionPreset,
} from './videoWalkthroughTypes';

// Segment timing/motion template (reused from the original walkthrough)
const SEGMENT_TEMPLATE: Array<{
  id: string;
  durationMs: number;
  motionPreset: MotionPreset;
}> = [
  { id: 'seg-01', durationMs: 9620, motionPreset: 'zoom-out' },
  { id: 'seg-02', durationMs: 5860, motionPreset: 'pan-right' },
  { id: 'seg-03', durationMs: 8880, motionPreset: 'zoom-out' },
  { id: 'seg-04', durationMs: 7300, motionPreset: 'zoom-out' },
  { id: 'seg-05', durationMs: 7960, motionPreset: 'zoom-in' },
  { id: 'seg-06', durationMs: 8380, motionPreset: 'pan-right' },
  { id: 'seg-07', durationMs: 5620, motionPreset: 'zoom-in' },
  { id: 'seg-08', durationMs: 9400, motionPreset: 'zoom-in' },
  { id: 'seg-09', durationMs: 7560, motionPreset: 'pan-left' },
  { id: 'seg-10', durationMs: 5670, motionPreset: 'zoom-out' },
];

const TOTAL_DURATION_MS = SEGMENT_TEMPLATE.reduce((sum, s) => sum + s.durationMs, 0);

function photo(listing: ListingData, index: number) {
  const img = listing.images[index % listing.images.length];
  return { url: img.url, alt: img.alt };
}

function findSpec(listing: ListingData, label: string): string | undefined {
  return listing.specs.find(
    (s) => s.label.toLowerCase() === label.toLowerCase()
  )?.value;
}

function dealColor(rating: ListingData['dealRating']): string {
  switch (rating) {
    case 'great': return '#22c55e';
    case 'good': return '#3b82f6';
    case 'fair': return '#f59e0b';
    case 'high': return '#ef4444';
  }
}

function shortName(listing: ListingData): string {
  return `${listing.make} ${listing.model}`.trim() || listing.title;
}

export function generateVideoWalkthrough(listing: ListingData): VideoWalkthroughData {
  const price = `$${listing.currentPrice.toLocaleString()}`;
  const ratingLabel = listing.dealRating.charAt(0).toUpperCase() + listing.dealRating.slice(1);
  const length = findSpec(listing, 'Length') ?? findSpec(listing, 'Overall Length');
  const sleeps = findSpec(listing, 'Sleeps') ?? findSpec(listing, 'Sleeping Capacity');
  const weight = findSpec(listing, 'GVWR')
    ?? (listing.gvwr ? `${listing.gvwr.toLocaleString()} lbs` : undefined);
  const slides = findSpec(listing, 'Slides');
  const name = shortName(listing);

  // Distribute photos: indices 0-1 hook, 2-3 exterior, 4-6 interior, 7-8 specs, 9 cta
  // Photo assignments — using modular index so listings with few photos still work
  const p = (i: number) => photo(listing, i);

  const acts: VideoAct[] = [
    // Act 1: Hook
    {
      type: 'hook',
      label: 'Hook',
      segments: [
        {
          ...SEGMENT_TEMPLATE[0],
          photoUrl: p(0).url,
          photoAlt: p(0).alt,
          overlays: [
            {
              overlay: { type: 'title', text: listing.title },
              position: 'top-left',
              startMs: 0,
              durationMs: 8000,
            },
            {
              overlay: { type: 'price', price, location: listing.location },
              position: 'bottom-left',
              startMs: 500,
              durationMs: 7000,
            },
            {
              overlay: { type: 'deal-score', rating: ratingLabel, color: dealColor(listing.dealRating) },
              position: 'top-right',
              startMs: 800,
              durationMs: 6500,
            },
          ],
        },
        {
          ...SEGMENT_TEMPLATE[1],
          photoUrl: p(1).url,
          photoAlt: p(1).alt,
          overlays: [],
        },
      ],
    },

    // Act 2: Exterior Tour
    {
      type: 'exterior',
      label: 'Exterior Tour',
      segments: [
        {
          ...SEGMENT_TEMPLATE[2],
          photoUrl: p(2).url,
          photoAlt: p(2).alt,
          overlays: [
            {
              overlay: { type: 'section-label', label: 'Exterior Tour' },
              position: 'top-left',
              startMs: 0,
              durationMs: 4000,
            },
          ],
        },
        {
          ...SEGMENT_TEMPLATE[3],
          photoUrl: p(3).url,
          photoAlt: p(3).alt,
          overlays: [],
        },
      ],
    },

    // Act 3: Interior Tour
    {
      type: 'interior',
      label: 'Interior Tour',
      segments: [
        {
          ...SEGMENT_TEMPLATE[4],
          photoUrl: p(4).url,
          photoAlt: p(4).alt,
          overlays: [
            {
              overlay: { type: 'section-label', label: 'Interior Tour' },
              position: 'top-left',
              startMs: 0,
              durationMs: 4000,
            },
            ...(sleeps
              ? [{
                  overlay: { type: 'spec-callout' as const, label: 'Sleeps', value: sleeps },
                  position: 'bottom-right' as const,
                  startMs: 2000,
                  durationMs: 5000,
                }]
              : []),
          ],
        },
        {
          ...SEGMENT_TEMPLATE[5],
          photoUrl: p(5).url,
          photoAlt: p(5).alt,
          overlays: [
            ...(slides
              ? [{
                  overlay: { type: 'spec-callout' as const, label: 'Slides', value: slides },
                  position: 'bottom-right' as const,
                  startMs: 1000,
                  durationMs: 5000,
                }]
              : []),
          ],
        },
        {
          ...SEGMENT_TEMPLATE[6],
          photoUrl: p(6).url,
          photoAlt: p(6).alt,
          overlays: [],
        },
      ],
    },

    // Act 4: Specs & Value
    {
      type: 'specs',
      label: 'Specs & Value',
      segments: [
        {
          ...SEGMENT_TEMPLATE[7],
          photoUrl: p(7).url,
          photoAlt: p(7).alt,
          overlays: [
            {
              overlay: { type: 'section-label', label: 'Specs & Value' },
              position: 'top-left',
              startMs: 0,
              durationMs: 4000,
            },
            ...(length
              ? [{
                  overlay: { type: 'spec-callout' as const, label: 'Length', value: length },
                  position: 'bottom-left' as const,
                  startMs: 2500,
                  durationMs: 6000,
                }]
              : []),
          ],
        },
        {
          ...SEGMENT_TEMPLATE[8],
          photoUrl: p(8).url,
          photoAlt: p(8).alt,
          overlays: [
            ...(weight
              ? [{
                  overlay: { type: 'spec-callout' as const, label: 'Weight', value: weight },
                  position: 'bottom-right' as const,
                  startMs: 1000,
                  durationMs: 5000,
                }]
              : []),
          ],
        },
      ],
    },

    // Act 5: CTA
    {
      type: 'cta',
      label: 'Call to Action',
      segments: [
        {
          ...SEGMENT_TEMPLATE[9],
          photoUrl: p(0).url,
          photoAlt: p(0).alt,
          overlays: [
            {
              overlay: {
                type: 'cta',
                heading: 'Ready to Explore?',
                subtext: `Contact ${listing.dealer.name}`,
              },
              position: 'center',
              startMs: 500,
              durationMs: 4500,
            },
          ],
        },
      ],
    },
  ];

  // Generate narration transcript (text only, no word-level timing)
  const lengthPhrase = length ? `At ${length}, this` : `This`;
  const weightPhrase = weight ? `It tips the scales at ${weight}, making it` : `It's`;
  const sleepsPhrase = sleeps ? ` comfortably sleeps ${sleeps} and` : '';

  const audioSegments: AudioTimingSegment[] = [
    {
      segmentId: 'seg-01',
      startMs: 0,
      endMs: 9000,
      transcript: `Welcome to this ${listing.year} ${name} — a standout option now available at ${ratingLabel.toLowerCase() === 'great' ? 'an exceptional' : 'a competitive'} value.`,
    },
    {
      segmentId: 'seg-02',
      startMs: 9620,
      endMs: 14620,
      transcript: `From every angle, this ${name} makes a strong first impression.`,
    },
    {
      segmentId: 'seg-03',
      startMs: 15480,
      endMs: 23460,
      transcript: `Let's take a closer look at the exterior. The build quality and design details really set this model apart.`,
    },
    {
      segmentId: 'seg-04',
      startMs: 24360,
      endMs: 31180,
      transcript: `Premium exterior features add real convenience for life on the road and at the campsite.`,
    },
    {
      segmentId: 'seg-05',
      startMs: 31660,
      endMs: 38840,
      transcript: `Step inside the interior. The layout${sleepsPhrase} offers a welcoming living space with thoughtful design throughout.`,
    },
    {
      segmentId: 'seg-06',
      startMs: 39620,
      endMs: 47120,
      transcript: `The living area features quality finishes and smart storage solutions that make full-time travel comfortable.`,
    },
    {
      segmentId: 'seg-07',
      startMs: 48000,
      endMs: 53620,
      transcript: `Every detail has been considered — from the fixtures to the floorplan — creating a space that truly feels like home.`,
    },
    {
      segmentId: 'seg-08',
      startMs: 53620,
      endMs: 62640,
      transcript: `Now for the specs. ${lengthPhrase} ${name} strikes a great balance of living space and manageability.`,
    },
    {
      segmentId: 'seg-09',
      startMs: 63020,
      endMs: 70180,
      transcript: `${weightPhrase} a practical choice that's ready for your next adventure.`,
    },
    {
      segmentId: 'seg-10',
      startMs: 70580,
      endMs: 76020,
      transcript: `Ready to make this ${name} yours? Contact ${listing.dealer.name} today and start your next chapter.`,
    },
  ];

  return {
    listingId: listing.stockNumber,
    title: listing.title,
    totalDurationMs: TOTAL_DURATION_MS,
    source: {
      mp4Url: '',
      posterUrl: listing.images[0]?.url ?? '',
    },
    acts,
    audio: {
      segments: audioSegments,
    },
  };
}
