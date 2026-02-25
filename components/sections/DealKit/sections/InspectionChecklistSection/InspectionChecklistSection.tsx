import { useState } from 'react';
import Icon from '@components/ui/Icon/Icon';
import type { ChecklistItem, ChecklistCategory } from '../../../../../app/src/data/dealKitTypes';
import { useDealKit } from '../../DealKitContext';
import styles from './InspectionChecklistSection.module.css';

interface InspectionChecklistSectionProps {
  items: ChecklistItem[];
}

const CATEGORY_LABELS: Record<ChecklistCategory, string> = {
  exterior: 'Exterior',
  interior: 'Interior',
  mechanical: 'Mechanical',
  systems: 'Systems',
  documents: 'Documents',
};

const CATEGORY_ORDER: ChecklistCategory[] = [
  'exterior',
  'interior',
  'mechanical',
  'systems',
  'documents',
];

export default function InspectionChecklistSection({
  items,
}: InspectionChecklistSectionProps) {
  const { checkedItems, toggleChecklistItem } = useDealKit();
  const [expandedCategories, setExpandedCategories] = useState<Set<ChecklistCategory>>(
    new Set(CATEGORY_ORDER),
  );

  const toggleCategory = (cat: ChecklistCategory) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    label: CATEGORY_LABELS[cat],
    items: items.filter((i) => i.category === cat),
  }));

  const totalChecked = checkedItems.size;
  const totalItems = items.length;

  return (
    <section id="inspection" className={styles.section}>
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>Inspection Checklist</h2>
        <span className={styles.counter}>
          {totalChecked}/{totalItems} checked
        </span>
      </div>
      <div className={styles.progressTrack}>
        <div
          className={styles.progressFill}
          style={{ width: `${(totalChecked / totalItems) * 100}%` }}
        />
      </div>
      <div className={styles.groups}>
        {grouped.map((group) => (
          <div key={group.category} className={styles.group}>
            <button
              className={styles.groupHeader}
              onClick={() => toggleCategory(group.category)}
            >
              <span className={styles.groupLabel}>
                {group.label}
                <span className={styles.groupCount}>
                  ({group.items.filter((i) => checkedItems.has(i.id)).length}/
                  {group.items.length})
                </span>
              </span>
              <Icon
                name={
                  expandedCategories.has(group.category)
                    ? 'expand_less'
                    : 'expand_more'
                }
                size={20}
              />
            </button>
            {expandedCategories.has(group.category) && (
              <div className={styles.itemList}>
                {group.items.map((item) => (
                  <label key={item.id} className={styles.item}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={checkedItems.has(item.id)}
                      onChange={() => toggleChecklistItem(item.id)}
                    />
                    <div className={styles.itemContent}>
                      <span
                        className={`${styles.itemLabel} ${checkedItems.has(item.id) ? styles.checked : ''}`}
                      >
                        {item.label}
                        {item.isModelSpecific && (
                          <span className={styles.badge}>Airstream-specific</span>
                        )}
                      </span>
                      <span className={styles.itemDetail}>{item.detail}</span>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
