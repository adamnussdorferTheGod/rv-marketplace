import styles from './PaymentCalculator.module.css';

interface DonutChartProps {
  principal: number;
  interest: number;
  monthlyPayment: number;
}

const STROKE = 12;
const BG_STROKE = STROKE + 14; /* 26px white ring */
const SIZE = 160; /* large enough to fit the thick white ring */
const RADIUS = (SIZE - BG_STROKE) / 2; /* sized to the thickest stroke */
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CX = SIZE / 2;
const CY = SIZE / 2;

function formatCompact(n: number): string {
  return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

export default function DonutChart({ principal, interest, monthlyPayment }: DonutChartProps) {
  const total = principal + interest;
  const interestFrac = total > 0 ? interest / total : 0;
  const principalFrac = total > 0 ? principal / total : 1;

  const interestLen = interestFrac * CIRCUMFERENCE;
  const principalLen = principalFrac * CIRCUMFERENCE;

  return (
    <div className={styles.donut}>
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden="true"
      >
        {/* White background ring — thicker so it peeks out behind colored arcs */}
        <circle
          cx={CX}
          cy={CY}
          r={RADIUS}
          fill="none"
          stroke="#ffffff"
          strokeWidth={BG_STROKE}
        />
        {/* Interest arc — red, starts from top going clockwise */}
        {interestLen > 0.5 && (
          <circle
            cx={CX}
            cy={CY}
            r={RADIUS}
            fill="none"
            stroke="#EC5B3E"
            strokeWidth={STROKE}
            strokeDasharray={`${interestLen} ${CIRCUMFERENCE - interestLen}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            transform={`rotate(-90 ${CX} ${CY})`}
            style={{
              transition: 'stroke-dasharray 400ms ease-out',
            }}
          />
        )}
        {/* Principal arc — blue, starts after interest */}
        <circle
          cx={CX}
          cy={CY}
          r={RADIUS}
          fill="none"
          stroke="#3870E9"
          strokeWidth={STROKE}
          strokeDasharray={`${principalLen} ${CIRCUMFERENCE - principalLen}`}
          strokeDashoffset={-interestLen}
          strokeLinecap="round"
          transform={`rotate(-90 ${CX} ${CY})`}
          style={{
            transition:
              'stroke-dasharray 400ms ease-out, stroke-dashoffset 400ms ease-out',
          }}
        />
      </svg>
      <span className={styles.donutCenter}>
        ${formatCompact(Math.round(monthlyPayment))}/m
      </span>
    </div>
  );
}
