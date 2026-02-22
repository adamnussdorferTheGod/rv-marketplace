import ExpandableText from '@components/ui/ExpandableText/ExpandableText';
import styles from './Description.module.css';

interface DescriptionProps {
  description: string;
}

export default function Description({ description }: DescriptionProps) {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Description</h2>
      <ExpandableText text={description} maxLines={3} className={styles.body} />
    </div>
  );
}
