import styles from './Divider.module.css';

interface DividerProps {
  className?: string;
}

export default function Divider({ className }: DividerProps) {
  return (
    <hr className={`${styles.divider} ${className || ''}`.trim()} />
  );
}
