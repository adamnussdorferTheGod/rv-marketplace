import { useState, useMemo } from 'react';
import Icon from '@components/ui/Icon/Icon';
import CollapsibleSection from './CollapsibleSection';
import { MAKE_MODEL_TREE } from './filterData';
import styles from './MakeModelFilter.module.css';

interface MakeModelFilterProps {
  selectedMakes: string[];
  selectedModels: string[];
  onToggleMake: (make: string) => void;
  onToggleModel: (model: string) => void;
}

const INITIAL_VISIBLE_COUNT = 5;

export default function MakeModelFilter({
  selectedMakes,
  selectedModels,
  onToggleMake,
  onToggleModel,
}: MakeModelFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedMakes, setExpandedMakes] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const filteredTree = useMemo(() => {
    if (!searchTerm.trim()) return MAKE_MODEL_TREE;
    const lower = searchTerm.toLowerCase();
    return MAKE_MODEL_TREE.filter((node) =>
      node.make.toLowerCase().includes(lower),
    );
  }, [searchTerm]);

  const visibleTree =
    showAll || searchTerm.trim()
      ? filteredTree
      : filteredTree.slice(0, INITIAL_VISIBLE_COUNT);

  const hiddenCount = filteredTree.length - INITIAL_VISIBLE_COUNT;

  function toggleExpanded(make: string) {
    setExpandedMakes((prev) => {
      const next = new Set(prev);
      if (next.has(make)) {
        next.delete(make);
      } else {
        next.add(make);
      }
      return next;
    });
  }

  return (
    <CollapsibleSection title="Make &amp; Model">
      {/* Search input */}
      <div className={styles.searchContainer}>
        <span className={styles.searchIcon}>
          <Icon name="search" size={20} />
        </span>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search makes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Make list */}
      <ul className={styles.makeList}>
        {visibleTree.map((node) => {
          const isExpanded = expandedMakes.has(node.make);
          const isMakeChecked = selectedMakes.includes(node.make);

          return (
            <li key={node.make} className={styles.makeItem}>
              <div className={styles.makeRow}>
                <label className={styles.makeLabel}>
                  <input
                    type="checkbox"
                    className={styles.hiddenCheckbox}
                    checked={isMakeChecked}
                    onChange={() => onToggleMake(node.make)}
                  />
                  <span
                    className={`${styles.checkbox}${isMakeChecked ? ` ${styles.checkboxChecked}` : ''}`}
                    aria-hidden="true"
                  >
                    {isMakeChecked && (
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 5L4.5 8.5L11 1.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span className={styles.makeName}>{node.make}</span>
                </label>
                <button
                  className={styles.expandToggle}
                  onClick={() => toggleExpanded(node.make)}
                  type="button"
                  aria-label={
                    isExpanded
                      ? `Collapse ${node.make} models`
                      : `Expand ${node.make} models`
                  }
                >
                  <Icon
                    name={isExpanded ? 'expand_less' : 'expand_more'}
                    size={20}
                  />
                </button>
              </div>

              {/* Model sub-list */}
              {isExpanded && (
                <ul className={styles.modelList}>
                  {node.models.map((model) => {
                    const isModelChecked = selectedModels.includes(model);
                    return (
                      <li key={model} className={styles.modelItem}>
                        <label className={styles.modelLabel}>
                          <input
                            type="checkbox"
                            className={styles.hiddenCheckbox}
                            checked={isModelChecked}
                            onChange={() => onToggleModel(model)}
                          />
                          <span
                            className={`${styles.checkbox}${isModelChecked ? ` ${styles.checkboxChecked}` : ''}`}
                            aria-hidden="true"
                          >
                            {isModelChecked && (
                              <svg
                                width="12"
                                height="10"
                                viewBox="0 0 12 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1 5L4.5 8.5L11 1.5"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                          <span className={styles.modelName}>{model}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      {/* "See all options" link */}
      {!searchTerm.trim() && hiddenCount > 0 && (
        <button
          className={styles.seeAll}
          onClick={() => setShowAll((prev) => !prev)}
          type="button"
        >
          {showAll
            ? 'Show fewer options'
            : `See all options (${hiddenCount} more)`}
        </button>
      )}
    </CollapsibleSection>
  );
}
