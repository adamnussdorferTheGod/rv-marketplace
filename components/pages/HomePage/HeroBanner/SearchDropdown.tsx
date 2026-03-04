import { useNavigate } from 'react-router-dom';
import Icon from '@components/ui/Icon/Icon';
import {
  RV_TYPES,
  POPULAR_SEARCHES,
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

  const handleAiChipClick = (chipText: string) => {
    navigate(`/search?aiChip=${encodeURIComponent(chipText)}`);
    onClose();
  };

  const handleAskAnything = () => {
    navigate('/search?aiOpen=1');
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

      {/* Section 1: RV Types — horizontal scroll */}
      <section>
        <div className={styles.typeScroll}>
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

      {/* Section 2: Ask anything — AI chips */}
      <section className={styles.askSection}>
        <div className={styles.askGlow} />
        <div className={styles.askInner}>
          <h3 className={styles.askHeading}>
            Ask anything
            <Icon name="sparkles" size={20} />
          </h3>
          <div className={styles.askChipRows}>
            <div className={styles.askChipRow}>
              <button type="button" className={styles.askChip} onClick={() => handleAiChipClick('Help me choose an RV type')}>Help me choose an RV type</button>
              <button type="button" className={styles.askChip} onClick={() => handleAiChipClick('Towable or motorhome?')}>Towable or motorhome?</button>
              <button type="button" className={styles.askChip} onClick={() => handleAiChipClick('What are the best RV brands?')}>What are the best RV brands?</button>
            </div>
            <div className={styles.askChipRow}>
              <button type="button" className={styles.askChip} onClick={() => handleAiChipClick('First RV — where do I start?')}>First RV — where do I start?</button>
              <button type="button" className={styles.askChip} onClick={() => handleAiChipClick('What can I get for my budget?')}>What can I get for my budget?</button>
              <button type="button" className={styles.askCta} onClick={handleAskAnything}>
                <Icon name="sparkles" size={16} />
                Ask any question
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Popular searches */}
      <section>
        <h3 className={styles.sectionHeading}>Popular searches</h3>
        <div className={styles.chipWrap}>
          {POPULAR_SEARCHES.slice(0, 3).map((search) => (
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
    </div>
  );
}
