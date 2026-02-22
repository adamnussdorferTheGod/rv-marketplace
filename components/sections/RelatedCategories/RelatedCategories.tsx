import ActionChip from '@components/ui/ActionChip/ActionChip';
import styles from './RelatedCategories.module.css';

interface RelatedCategoriesProps {
  categories: string[];
}

export default function RelatedCategories({ categories }: RelatedCategoriesProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Related categories</h2>
      <div className={styles.chipGrid}>
        {categories.map((category) => (
          <ActionChip key={category} label={category} />
        ))}
      </div>
    </section>
  );
}
