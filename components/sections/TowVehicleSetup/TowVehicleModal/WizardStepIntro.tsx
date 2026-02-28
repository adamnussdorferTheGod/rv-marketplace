import { useState, useMemo, useRef, useEffect } from 'react';
import Icon from '@components/ui/Icon/Icon';
import { getAllMakeModels } from '../../../../app/src/data/towVehicleDatabase';
import BrandLogo from './brandLogos';
import styles from './TowVehicleModal.module.css';

// ─── Data ────────────────────────────────────────────────────────────

const ALL_VEHICLES = getAllMakeModels();

const POPULAR_KEYS = new Set([
  'Ford|F-150',
  'Ram|1500',
  'Chevrolet|Silverado 1500',
  'Toyota|Tundra',
  'GMC|Sierra 1500',
  'Ford|F-250',
  'Ram|2500',
  'Toyota|Tacoma',
  'Jeep|Gladiator',
  'Chevrolet|Tahoe',
]);

const POPULAR_VEHICLES = ALL_VEHICLES.filter(v => POPULAR_KEYS.has(`${v.make}|${v.model}`));

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

  const isSearching = search.trim().length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const q = search.toLowerCase();
    return ALL_VEHICLES.filter(v =>
      `${v.make} ${v.model}`.toLowerCase().includes(q),
    );
  }, [search, isSearching]);

  const displayList = isSearching ? searchResults : POPULAR_VEHICLES;
  const sectionLabel = isSearching ? 'Results' : 'Popular';

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

      {/* Vehicle list */}
      {displayList.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionLabelNormal}>{sectionLabel}</h3>
          <div className={styles.popularList}>
            {displayList.map(v => (
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

      {displayList.length === 0 && isSearching && (
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
