import { useState, useMemo, useRef, useEffect } from 'react';
import Icon from '@components/ui/Icon/Icon';
import BrandLogo from './brandLogos';
import styles from './TowVehicleModal.module.css';

// ─── Popular vehicles (quick-pick) ─────────────────────────────────

interface PopularVehicle {
  make: string;
  model: string;
}

const POPULAR_VEHICLES: PopularVehicle[] = [
  { make: 'Ford', model: 'F-150' },
  { make: 'Ram', model: '1500' },
  { make: 'Chevrolet', model: 'Silverado 1500' },
  { make: 'Toyota', model: 'Tundra' },
  { make: 'GMC', model: 'Sierra 1500' },
  { make: 'Ford', model: 'F-250' },
  { make: 'Ram', model: '2500' },
  { make: 'Toyota', model: 'Tacoma' },
  { make: 'Jeep', model: 'Gladiator' },
  { make: 'Chevrolet', model: 'Tahoe' },
];

// ─── Component ──────────────────────────────────────────────────────

interface WizardStepIntroProps {
  onQuickPick: (make: string, model: string) => void;
  onBrowseByMake: () => void;
  onSwitchToVIN: () => void;
}

export default function WizardStepIntro({ onQuickPick, onBrowseByMake, onSwitchToVIN }: WizardStepIntroProps) {
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredPopular = useMemo(() => {
    if (!search.trim()) return POPULAR_VEHICLES;
    const q = search.toLowerCase();
    return POPULAR_VEHICLES.filter(v =>
      `${v.make} ${v.model}`.toLowerCase().includes(q) ||
      v.make.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className={styles.stepContent}>
      <h2 className={styles.stepHeadingCenter}>What's your vehicle?</h2>

      {/* Search */}
      <div className={styles.wizardSearchBar}>
        <Icon name="search" size={20} />
        <input
          ref={inputRef}
          type="text"
          className={styles.wizardSearchInput}
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search make or model..."
        />
        {search && (
          <button
            type="button"
            className={styles.wizardSearchClear}
            onClick={() => setSearch('')}
            aria-label="Clear search"
          >
            <Icon name="x_close" size={16} />
          </button>
        )}
      </div>

      {/* Popular vehicles */}
      {filteredPopular.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionLabelNormal}>Popular</h3>
          <div className={styles.popularList}>
            {filteredPopular.map(v => (
              <button
                key={`${v.make}-${v.model}`}
                type="button"
                className={styles.popularRow}
                onClick={() => onQuickPick(v.make, v.model)}
              >
                <BrandLogo make={v.make} size={32} />
                <span className={styles.popularName}>
                  {v.make} {v.model}
                </span>
                <svg className={styles.popularChevron} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredPopular.length === 0 && search.trim() && (
        <p className={styles.noResults}>No vehicles match "{search}"</p>
      )}

      {/* Links */}
      <div className={styles.introLinks}>
        <button type="button" className={styles.viewMoreLink} onClick={onBrowseByMake}>
          Don't see yours? Browse by make
        </button>
        <button type="button" className={styles.vinLink} onClick={onSwitchToVIN}>
          Have your VIN? Enter it instead
        </button>
      </div>
    </div>
  );
}
