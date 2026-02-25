import type { VideoWalkthroughData } from './videoWalkthroughTypes';
import { sampleListing } from './sampleListing';

const img = sampleListing.images;

export const sampleVideoWalkthrough: VideoWalkthroughData = {
  listingId: sampleListing.stockNumber,
  title: sampleListing.title,
  totalDurationMs: 65000,
  source: {
    mp4Url: '/assets/airstream-tour.mp4',
    posterUrl: img[0].url,
  },
  acts: [
    // Act 1: Hook (2 segments, 8s total)
    {
      type: 'hook',
      label: 'Hook',
      segments: [
        {
          id: 'seg-01',
          photoUrl: img[0].url,
          photoAlt: img[0].alt,
          durationMs: 5000,
          motionPreset: 'zoom-out',
          overlays: [
            {
              overlay: { type: 'title', text: sampleListing.title },
              position: 'top-left',
              startMs: 0,
              durationMs: 4500,
            },
            {
              overlay: {
                type: 'price',
                price: `$${sampleListing.currentPrice.toLocaleString()}`,
                location: sampleListing.location,
              },
              position: 'bottom-left',
              startMs: 500,
              durationMs: 4000,
            },
            {
              overlay: {
                type: 'deal-score',
                rating: sampleListing.dealRating.charAt(0).toUpperCase() + sampleListing.dealRating.slice(1),
                color: '#22c55e',
              },
              position: 'top-right',
              startMs: 800,
              durationMs: 3700,
            },
          ],
        },
        {
          id: 'seg-02',
          photoUrl: img[1].url,
          photoAlt: img[1].alt,
          durationMs: 3000,
          motionPreset: 'pan-right',
          overlays: [],
        },
      ],
    },

    // Act 2: Exterior Tour (2 segments, 12s total)
    {
      type: 'exterior',
      label: 'Exterior Tour',
      segments: [
        {
          id: 'seg-03',
          photoUrl: img[5].url,
          photoAlt: img[5].alt,
          durationMs: 6000,
          motionPreset: 'zoom-out',
          overlays: [
            {
              overlay: { type: 'section-label', label: 'Exterior Tour' },
              position: 'top-left',
              startMs: 0,
              durationMs: 3000,
            },
          ],
        },
        {
          id: 'seg-04',
          photoUrl: img[9].url,
          photoAlt: img[9].alt,
          durationMs: 6000,
          motionPreset: 'zoom-out',
          overlays: [],
        },
      ],
    },

    // Act 3: Interior Tour (3 segments, 22s total)
    {
      type: 'interior',
      label: 'Interior Tour',
      segments: [
        {
          id: 'seg-05',
          photoUrl: img[3].url,
          photoAlt: img[3].alt,
          durationMs: 8000,
          motionPreset: 'zoom-in',
          overlays: [
            {
              overlay: { type: 'section-label', label: 'Interior Tour' },
              position: 'top-left',
              startMs: 0,
              durationMs: 3000,
            },
            {
              overlay: { type: 'feature-callout', feature: 'Panoramic windows with natural light' },
              position: 'bottom-left',
              startMs: 2000,
              durationMs: 5000,
            },
          ],
        },
        {
          id: 'seg-06',
          photoUrl: img[2].url,
          photoAlt: img[2].alt,
          durationMs: 7000,
          motionPreset: 'pan-right',
          overlays: [
            {
              overlay: { type: 'spec-callout', label: 'Sleeps', value: '4' },
              position: 'bottom-right',
              startMs: 1000,
              durationMs: 4000,
            },
          ],
        },
        {
          id: 'seg-07',
          photoUrl: img[4].url,
          photoAlt: img[4].alt,
          durationMs: 7000,
          motionPreset: 'zoom-in',
          overlays: [],
        },
      ],
    },

    // Act 4: Specs & Value (2 segments, 15s total)
    {
      type: 'specs',
      label: 'Specs & Value',
      segments: [
        {
          id: 'seg-08',
          photoUrl: img[6].url,
          photoAlt: img[6].alt,
          durationMs: 8000,
          motionPreset: 'zoom-in',
          overlays: [
            {
              overlay: { type: 'section-label', label: 'Specs & Value' },
              position: 'top-left',
              startMs: 0,
              durationMs: 3000,
            },
            {
              overlay: { type: 'spec-callout', label: 'Length', value: '25 ft' },
              position: 'bottom-left',
              startMs: 2000,
              durationMs: 5000,
            },
          ],
        },
        {
          id: 'seg-09',
          photoUrl: img[7].url,
          photoAlt: img[7].alt,
          durationMs: 7000,
          motionPreset: 'pan-left',
          overlays: [
            {
              overlay: { type: 'spec-callout', label: 'Weight', value: '3,500 lbs' },
              position: 'bottom-right',
              startMs: 1000,
              durationMs: 4000,
            },
          ],
        },
      ],
    },

    // Act 5: CTA (1 segment, 8s total)
    {
      type: 'cta',
      label: 'Call to Action',
      segments: [
        {
          id: 'seg-10',
          photoUrl: img[0].url,
          photoAlt: img[0].alt,
          durationMs: 8000,
          motionPreset: 'zoom-out',
          overlays: [
            {
              overlay: {
                type: 'cta',
                heading: 'Ready to Explore?',
                subtext: 'Contact the dealer today',
              },
              position: 'center',
              startMs: 1000,
              durationMs: 6000,
            },
          ],
        },
      ],
    },
  ],
  audio: {
    audioUrl: undefined,
    segments: [],
  },
};
