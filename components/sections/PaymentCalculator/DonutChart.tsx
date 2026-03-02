import styles from './PaymentCalculator.module.css';

interface DonutChartProps {
  principal: number;
  interest: number;
  monthlyPayment: number;
}

const SIZE = 140;
const STROKE = 18;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function formatCompact(n: number): string {
  return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

export default function DonutChart({ principal, interest, monthlyPayment }: DonutChartProps) {
  const total = principal + interest;
  const principalFrac = total > 0 ? principal / total : 1;
  const interestFrac = total > 0 ? interest / total : 0;

  const principalLen = principalFrac * CIRCUMFERENCE;
  const interestLen = interestFrac * CIRCUMFERENCE;

  return (
    <div className={styles.donut}>
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden="true"
      >
        {/* Principal arc (blue) */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="#3870E9"
          strokeWidth={STROKE}
          strokeDasharray={`${principalLen} ${CIRCUMFERENCE}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          style={{ transition: 'stroke-dasharray 400ms ease-out' }}
        />
        {/* Interest arc (red-orange) */}
        {interestLen > 0.5 && (
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="#EC5B3E"
            strokeWidth={STROKE}
            strokeDasharray={`${interestLen} ${CIRCUMFERENCE}`}
            strokeDashoffset={-principalLen}
            strokeLinecap="round"
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
            style={{
              transition:
                'stroke-dasharray 400ms ease-out, stroke-dashoffset 400ms ease-out',
            }}
          />
        )}
      </svg>
      <span className={styles.donutCenter}>
        ${formatCompact(Math.round(monthlyPayment))}/m
      </span>
    </div>
  );
}
