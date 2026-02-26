import { useState, useMemo } from 'react';
import type { Destination } from '../../../app/src/data/lifestyleTypes';
import Icon from '../../ui/Icon/Icon';
import { useAiMode } from '../../sections/AiMode/AiModeContext';
import { useNavigation } from '../../pages/NavigationContext';
import DestinationCard from './DestinationCard/DestinationCard';
import styles from './DestinationsTab.module.css';

interface DestinationsTabProps {
  destinations: Destination[];
  rvLengthFt: number;
}

const FILTER_CHIPS = [
  'Recommended',
  'State Parks',
  'RV Resorts',
  'Camping',
  'Pet Friendly',
  'Full Hookups',
  'Near Water',
] as const;

const CHIP_TO_CATEGORY: Record<string, string> = {
  'State Parks': 'State Park',
  'RV Resorts': 'RV Resort',
  'Camping': 'Dry Camping',
  'Pet Friendly': 'Pet Friendly',
  'Full Hookups': 'Full Hookups',
  'Near Water': 'State Park',
};

const AI_PROMPTS = [
  'Plan a 3-day trip itinerary',
  'Best campgrounds with full hookups',
  'Pet-friendly parks near the coast',
];

export default function DestinationsTab({ destinations, rvLengthFt }: DestinationsTabProps) {
  const [activeChip, setActiveChip] = useState('Recommended');
  const { openPanel, sendMessage } = useAiMode();
  const { navigateToDestination } = useNavigation();

  function handlePromptClick(prompt: string) {
    openPanel('plan');
    sendMessage(prompt);
  }

  const filteredDestinations = useMemo(() => {
    let filtered = [...destinations];

    if (activeChip !== 'Recommended') {
      const category = CHIP_TO_CATEGORY[activeChip];
      if (category) {
        filtered = filtered.filter(dest => dest.categories.includes(category));
      }
    }

    filtered.sort((a, b) => a.driveTimeMinutes - b.driveTimeMinutes);
    return filtered;
  }, [destinations, activeChip]);

  return (
    <div className={styles.wrapper}>
      {/* Section title — outside card */}
      <h3 className={styles.title}>Popular destinations near you</h3>

      <div className={styles.card}>
      {/* Subtitle */}
      <p className={styles.subtitle}>
        Find popular destinations near you and explore how you can experience them with this RV.
      </p>

      {/* Filter chips */}
      <div className={styles.chipRow}>
        {FILTER_CHIPS.map(chip => (
          <button
            key={chip}
            className={`${styles.chip} ${activeChip === chip ? styles.chipActive : ''}`}
            onClick={() => setActiveChip(chip)}
            type="button"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Destination cards */}
      {filteredDestinations.length > 0 ? (
        <div className={styles.cardRow}>
          {filteredDestinations.map(dest => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onClick={() => navigateToDestination(dest)}
            />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>No destinations match this filter</div>
      )}

      {/* Plan with AI */}
      <div className={styles.planSection}>
        <h3 className={styles.planTitle}>
          <Icon name="sparkles" size={24} className={styles.planSparkle} />
          Plan with AI
        </h3>
        <div className={styles.planGlow} aria-hidden="true" />
        <div className={styles.planPills}>
          {AI_PROMPTS.map(prompt => (
            <button key={prompt} className={styles.planPill} type="button" onClick={() => handlePromptClick(prompt)}>
              <span className={styles.planPillText}>{prompt}</span>
              <svg className={styles.sparkleIcon} width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" stroke="#6E7072" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M19 2l.6 2L22 4.6 19.6 5.2 19 7.2l-.6-2L16 4.6l2.4-.6L19 2z" stroke="#6E7072" strokeWidth="1" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      </div>

    </div>
    </div>
  );
}
