import { useNavigate } from 'react-router-dom';
import Icon from '@components/ui/Icon/Icon';
import {
  RV_TYPES,
  POPULAR_SEARCHES,
  POPULAR_MAKES,
  FEATURED_DEALERS,
} from './heroData';
import styles from './SearchDropdown.module.css';

interface SearchDropdownProps {
  onClose: () => void;
}

export default function SearchDropdown({ onClose }: SearchDropdownProps) {
  const navigate = useNavigate();

  const handleTypeClick = (slug: string) => {
    navigate(`/search?rvTypes=${slug}`);
    onClose();
  };

  const handleSearchClick = (query: string) => {
    navigate(`/search?${query}`);
    onClose();
  };

  const handleMakeClick = (label: string) => {
    navigate(`/search?makes=${encodeURIComponent(label)}`);
    onClose();
  };

  const handleDealerClick = (slug: string) => {
    navigate(`/search?keyword=${encodeURIComponent(slug.replace(/-/g, ' '))}`);
    onClose();
  };

  return (
    <div className={styles.dropdown}>
      <button
        type="button"
        className={styles.mobileClose}
        onClick={onClose}
        aria-label="Close search dropdown"
      >
        <Icon name="x_close" size={18} />
      </button>

      {/* Section 1: RV Types */}
      <section>
        <h3 className={styles.sectionHeading}>RV types</h3>
        <div className={styles.typeGrid}>
          {RV_TYPES.map((type) => (
            <button
              key={type.slug}
              type="button"
              className={styles.typeCard}
              onClick={() => handleTypeClick(type.slug)}
            >
              <span className={styles.typeLabel}>{type.label}</span>
              <img
                src={type.imageUrl}
                alt={type.label}
                className={styles.typeImage}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </section>

      {/* Section 2: Popular searches */}
      <section>
        <h3 className={styles.sectionHeading}>Popular searches</h3>
        <div className={styles.chipWrap}>
          {POPULAR_SEARCHES.map((search) => (
            <button
              key={search.label}
              type="button"
              className={styles.searchChip}
              onClick={() => handleSearchClick(search.query)}
            >
              <Icon name="search" size={20} />
              {search.label}
            </button>
          ))}
        </div>
      </section>

      {/* Section 3: Popular makes */}
      <section>
        <h3 className={styles.sectionHeading}>Popular makes</h3>
        <div className={styles.chipWrap}>
          {POPULAR_MAKES.map((make) => (
            <button
              key={make.slug}
              type="button"
              className={styles.searchChip}
              onClick={() => handleMakeClick(make.label)}
            >
              <Icon name="search" size={20} />
              {make.label}
            </button>
          ))}
        </div>
      </section>

      {/* Section 4: Featured dealers */}
      <section>
        <div className={styles.sectionHeadingRow}>
          <h3 className={styles.sectionHeading}>Featured from dealers near you</h3>
          <span className={styles.sponsoredBadge}>Sponsored</span>
        </div>
        <div className={styles.chipWrap}>
          {FEATURED_DEALERS.map((dealer) => (
            <button
              key={dealer.slug}
              type="button"
              className={styles.searchChip}
              onClick={() => handleDealerClick(dealer.slug)}
            >
              <Icon name="search" size={20} />
              {dealer.name}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
