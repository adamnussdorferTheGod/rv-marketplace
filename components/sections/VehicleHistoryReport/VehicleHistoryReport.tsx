import Icon from '@components/ui/Icon/Icon';
import Button from '@components/ui/Button/Button';
import styles from './VehicleHistoryReport.module.css';

interface VehicleHistoryReportProps {
  vhrAvailable: boolean;
}

const VHR_GRID = [
  [ // column 1
    { icon: 'clipboard', label: 'Accidents' },
    { icon: 'document', label: 'Title status' },
  ],
  [ // column 2
    { icon: 'wrench', label: 'Safety recalls' },
    { icon: 'list', label: 'And more!' },
  ],
] as const;

function ShieldCheck() {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        fill="currentColor"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function VehicleHistoryReport({ vhrAvailable }: VehicleHistoryReportProps) {
  if (!vhrAvailable) return null;

  return (
    <div className={styles.card}>
      <div className={styles.headerRow}>
        <span className={styles.shieldBadge}>
          <ShieldCheck />
        </span>
        <h3 className={styles.heading}>Free vehicle history report</h3>
      </div>

      <p className={styles.description}>
        Don&apos;t buy a lemon and make a costly mistake! <strong>Free</strong> report for accidents, title status, recalls, liens and more.
      </p>

      <div className={styles.bottomRow}>
        <div className={styles.grid}>
          {VHR_GRID.map((column, ci) => (
            <div key={ci} className={styles.gridColumn}>
              {column.map((item) => (
                <div key={item.label} className={styles.gridItem}>
                  <Icon name={item.icon} size={24} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.ctaCell}>
          <Button variant="tertiary" size="lg">
            Get report
          </Button>
        </div>
      </div>
    </div>
  );
}
