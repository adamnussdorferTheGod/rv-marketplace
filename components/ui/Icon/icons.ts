interface IconDefinition {
  paths: string[];
  strokeWidth?: number;
  fill?: (string | undefined)[];
  viewBox?: string;
}

const ICONS: Record<string, IconDefinition> = {
  // Extracted from PriceDistributionChart ChevronIcon
  expand_more: {
    paths: ['M6 9L12 15L18 9'],
  },

  expand_less: {
    paths: ['M6 15L12 9L18 15'],
  },

  // Extracted from PriceDistributionChart ChartIcon
  chart: {
    paths: [
      'M3 17L9 11L13 15L21 7',
      'M17 7H21V11',
    ],
  },

  // Info circle icon
  info: {
    paths: [
      'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2',
      'M12 11L12 16',
      'M12 8L12 8.01',
    ],
  },

  // Extracted from PriceDistributionChart TagIcon
  tag: {
    paths: [
      'M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-8-8Z',
    ],
  },

  // Share icon (box with arrow pointing up)
  share: {
    paths: [
      'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8',
      'M16 6l-4-4-4 4',
      'M12 2v13',
    ],
  },

  // Heart outline
  favorite: {
    paths: [
      'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
    ],
  },

  // External link icon
  open_in_new: {
    paths: [
      'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
      'M15 3h6v6',
      'M10 14L21 3',
    ],
  },

  // Left arrow
  arrow_back: {
    paths: [
      'M19 12H5',
      'M12 19L5 12L12 5',
    ],
  },

  // Chevron left
  chevron_left: {
    paths: ['M15 18L9 12L15 6'],
  },

  // Chevron right
  chevron_right: {
    paths: ['M9 6L15 12L9 18'],
  },

  // Flag / report icon
  flag: {
    paths: [
      'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z',
      'M4 22V15',
    ],
  },

  // Expand / fullscreen (diagonal arrows)
  open_in_full: {
    paths: [
      'M15 3h6v6',
      'M9 21H3v-6',
      'M21 3l-7 7',
      'M3 21l7-7',
    ],
  },

  // Phone icon
  call: {
    paths: [
      'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
    ],
  },

  // Envelope / mail icon
  mail: {
    paths: [
      'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z',
      'M22 6l-10 7L2 6',
    ],
  },

  // Chat bubble / SMS icon
  sms: {
    paths: [
      'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
    ],
  },

  // Person icon (account button)
  person: {
    paths: [
      'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
      'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
    ],
  },

  // Arrow upward (scroll-to-top)
  arrow_upward: {
    paths: [
      'M12 19V5',
      'M5 12L12 5L19 12',
    ],
  },

  // --- Spec icons for FeaturesAndSpecs grid ---

  // Travel trailer / RV type silhouette
  rv_type: {
    paths: [
      'M2 17h20',
      'M4 17V9a2 2 0 0 1 2-2h8l4 4v6',
      'M6 17a2 2 0 1 0 4 0',
      'M14 17a2 2 0 1 0 4 0',
    ],
  },

  // Measurement ruler
  ruler: {
    paths: [
      'M3 5v14',
      'M21 5v14',
      'M3 12h18',
      'M7 5v4',
      'M12 5v7',
      'M17 5v4',
    ],
  },

  // Bed / sleeping icon
  bed: {
    paths: [
      'M2 18v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5',
      'M2 9V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
      'M2 13h20',
    ],
  },

  // Slide-out / expandable box icon
  slide_out: {
    paths: [
      'M3 5h12v14H3z',
      'M15 9h6v6h-6',
      'M18 9v6',
    ],
  },

  // Scale / weight icon
  weight: {
    paths: [
      'M12 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
      'M6 21l2-9h8l2 9',
      'M6 21h12',
    ],
  },

  // Water drop icon
  water: {
    paths: [
      'M12 2c-4 4.5-7 8.1-7 11a7 7 0 0 0 14 0c0-2.9-3-6.5-7-11z',
    ],
  },

  // Fuel pump / gas icon
  fuel: {
    paths: [
      'M3 22V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v17',
      'M3 22h12',
      'M15 12h2a2 2 0 0 1 2 2v3a2 2 0 0 1 2-2V7l-3-3',
      'M5 10h8',
    ],
  },

  // Diamond / condition indicator
  condition: {
    paths: [
      'M12 2l4 4-4 4-4-4z',
      'M2 12l4 4-4 4',
      'M22 12l-4 4 4 4',
      'M12 14l4 4-4 4-4-4z',
    ],
  },

  // Checkmark circle (for VHR)
  check_circle: {
    paths: [
      'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z',
      'M9 12l2 2 4-4',
    ],
  },

  // Sparkle / AI icon
  sparkle: {
    paths: [
      'M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2z',
    ],
  },

  // Star / award ribbon icon (Trusted Partner Badge)
  award_star: {
    paths: [
      'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    ],
  },

  // Map pin / marker icon (dealer address)
  location_pin: {
    paths: [
      'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z',
      'M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    ],
  },

  // Clock face icon (dealer hours)
  clock: {
    paths: [
      'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z',
      'M12 6v6l4 2',
    ],
  },

  // Shield / protection icon (insurance card)
  shield: {
    paths: [
      'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    ],
  },
};

export { ICONS };
export default ICONS;
