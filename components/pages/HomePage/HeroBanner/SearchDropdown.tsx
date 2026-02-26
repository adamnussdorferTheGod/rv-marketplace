import { useNavigate } from 'react-router-dom';
import ActionChip from '@components/ui/ActionChip/ActionChip';
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
    navigate(`/search?type=${slug}`);
    onClose();
  };

  const handleSearchClick = (query: string) => {
    navigate(`/search?${query}`);
    onClose();
  };

  const handleMakeClick = (slug: string) => {
    navigate(`/search?make=${slug}`);
    onClose();
  };

  const handleDealerClick = (slug: string) => {
    navigate(`/search?dealer=${slug}`);
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
        <h3 className={styles.sectionHeading}>RV Types</h3>
        <div className={styles.typeGrid}>
          {RV_TYPES.map((type) => (
            <button
              key={type.slug}
              type="button"
              className={styles.typeCard}
              onClick={() => handleTypeClick(type.slug)}
            >
              <img
                src={type.imageUrl}
                alt={type.label}
                className={styles.typeImage}
                loading="lazy"
              />
              <span className={styles.typeLabel}>{type.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Section 2: Popular searches */}
      <section>
        <h3 className={styles.sectionHeading}>Popular searches</h3>
        <div className={styles.chipWrap}>
          {POPULAR_SEARCHES.map((search) => (
            <ActionChip
              key={search.label}
              label={search.label}
              onClick={() => handleSearchClick(search.query)}
            />
          ))}
        </div>
      </section>

      {/* Section 3: Popular makes */}
      <section>
        <h3 className={styles.sectionHeading}>Popular makes</h3>
        <div className={styles.chipWrap}>
          {POPULAR_MAKES.map((make) => (
            <ActionChip
              key={make.slug}
              label={make.label}
              onClick={() => handleMakeClick(make.slug)}
            />
          ))}
        </div>
      </section>

      {/* Section 4: Featured dealers */}
      <section>
        <h3 className={styles.sectionHeading}>Featured from dealers near you</h3>
        <div className={styles.chipWrap}>
          {FEATURED_DEALERS.map((dealer) => (
            <button
              key={dealer.slug}
              type="button"
              className={styles.dealerChip}
              onClick={() => handleDealerClick(dealer.slug)}
            >
              <span
                className={styles.dealerDot}
                style={{ backgroundColor: dealer.color }}
              />
              {dealer.name}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
