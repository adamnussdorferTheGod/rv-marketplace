import { useMemo } from 'react';
import type { FilterCriteria, RVType } from '@app/src/data/srpTypes.ts';
import type { SRPListing } from '@app/src/data/srpTypes.ts';
import styles from './PopularFilters.module.css';

interface PopularFilterDef {
  key: string;
  label: string;
  /** Returns true if this filter is currently active */
  isActive: (filters: FilterCriteria) => boolean;
  /** Apply this filter */
  apply: (
    setFilter: (key: keyof FilterCriteria, value: unknown) => void,
    toggleArrayFilter: (key: keyof FilterCriteria, value: string) => void,
  ) => void;
  /** Count listings matching this filter from unfiltered set */
  count: (allListings: SRPListing[]) => number;
}

const POPULAR_FILTERS: PopularFilterDef[] = [
  {
    key: 'new',
    label: 'New',
    isActive: (f) => f.condition === 'new',
    apply: (set) => set('condition', 'new'),
    count: (all) => all.filter((l) => l.condition === 'new').length,
  },
  {
    key: 'used',
    label: 'Used',
    isActive: (f) => f.condition === 'used',
    apply: (set) => set('condition', 'used'),
    count: (all) => all.filter((l) => l.condition === 'used').length,
  },
  {
    key: 'travel-trailer',
    label: 'Travel Trailer',
    isActive: (f) => f.rvTypes.includes('travel-trailer'),
    apply: (_set, toggle) => toggle('rvTypes', 'travel-trailer'),
    count: (all) => all.filter((l) => l.rvType === 'travel-trailer').length,
  },
  {
    key: 'class-a',
    label: 'Class A',
    isActive: (f) => f.rvTypes.includes('class-a'),
    apply: (_set, toggle) => toggle('rvTypes', 'class-a'),
    count: (all) => all.filter((l) => l.rvType === 'class-a').length,
  },
  {
    key: 'class-b',
    label: 'Class B',
    isActive: (f) => f.rvTypes.includes('class-b'),
    apply: (_set, toggle) => toggle('rvTypes', 'class-b'),
    count: (all) => all.filter((l) => l.rvType === 'class-b').length,
  },
  {
    key: 'class-c',
    label: 'Class C',
    isActive: (f) => f.rvTypes.includes('class-c'),
    apply: (_set, toggle) => toggle('rvTypes', 'class-c'),
    count: (all) => all.filter((l) => l.rvType === 'class-c').length,
  },
  {
    key: 'fifth-wheel',
    label: 'Fifth Wheel',
    isActive: (f) => f.rvTypes.includes('fifth-wheel'),
    apply: (_set, toggle) => toggle('rvTypes', 'fifth-wheel'),
    count: (all) => all.filter((l) => l.rvType === 'fifth-wheel').length,
  },
  {
    key: 'toy-hauler',
    label: 'Toy Hauler',
    isActive: (f) => f.rvTypes.includes('toy-hauler'),
    apply: (_set, toggle) => toggle('rvTypes', 'toy-hauler'),
    count: (all) => all.filter((l) => l.rvType === 'toy-hauler').length,
  },
  {
    key: 'under-50k',
    label: 'Under $50,000',
    isActive: (f) => f.priceMax === 50000,
    apply: (set) => set('priceMax', 50000),
    count: (all) => all.filter((l) => l.currentPrice <= 50000).length,
  },
  {
    key: 'under-100k',
    label: 'Under $100,000',
    isActive: (f) => f.priceMax === 100000,
    apply: (set) => set('priceMax', 100000),
    count: (all) => all.filter((l) => l.currentPrice <= 100000).length,
  },
  {
    key: 'great-deal',
    label: 'Great deal',
    isActive: (f) => f.keyword === 'great deal',
    apply: (set) => set('keyword', 'great deal'),
    count: (all) => all.filter((l) => l.dealRating === 'great').length,
  },
];

interface PopularFiltersProps {
  filters: FilterCriteria;
  allListings: SRPListing[];
  setFilter: (key: keyof FilterCriteria, value: unknown) => void;
  toggleArrayFilter: (key: keyof FilterCriteria, value: string) => void;
}

export default function PopularFilters({
  filters,
  allListings,
  setFilter,
  toggleArrayFilter,
}: PopularFiltersProps) {
  const counts = useMemo(
    () =>
      POPULAR_FILTERS.map((f) => ({
        ...f,
        countValue: f.count(allListings),
      })),
    [allListings],
  );

  return (
    <div className={styles.card}>
      <h3 className={styles.heading}>Popular filters</h3>
      <ul className={styles.list}>
        {counts.map((filter) => {
          const active = filter.isActive(filters);
          return (
            <li key={filter.key} className={styles.row}>
              <label className={styles.label}>
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => filter.apply(setFilter, toggleArrayFilter)}
                  className={styles.checkbox}
                />
                <span className={styles.text}>{filter.label}</span>
              </label>
              <span className={styles.count}>{filter.countValue}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
