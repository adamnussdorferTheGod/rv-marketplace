import { useEffect, useRef, useState } from 'react';
import type { DealScoreData } from '../../../../../app/src/data/dealKitTypes';
import styles from './DealScoreSection.module.css';

interface DealScoreSectionProps {
  data: DealScoreData;
}

function ScoreGauge({ score, label }: { score: number; label: string }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let current = 0;
          const step = score / 40;
          const timer = setInterval(() => {
            current += step;
            if (current >= score) {
              setAnimatedScore(score);
              clearInterval(timer);
            } else {
              setAnimatedScore(Math.round(current));
            }
          }, 25);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [score]);

  // Use stroke-dasharray on a semicircle path for a clean gauge
  const cx = 100;
  const cy = 100;
  const r = 80;
  // Semicircle path from left (180deg) to right (0deg), sweeping clockwise over the top
  const arcPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
  const halfCircumference = Math.PI * r; // length of the semicircle
  const scoreDash = (animatedScore / 100) * halfCircumference;

  const labelMap: Record<string, string> = {
    great: 'Great Deal',
    good: 'Good Deal',
    fair: 'Fair Deal',
    poor: 'Poor Deal',
  };

  return (
    <svg ref={ref} viewBox="0 0 200 120" className={styles.gauge}>
      {/* Background track */}
      <path
        d={arcPath}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="14"
        strokeLinecap="round"
      />
      {/* Score fill */}
      <path
        d={arcPath}
        fill="none"
        stroke="var(--rv-primary)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray={`${halfCircumference}`}
        strokeDashoffset={`${halfCircumference - scoreDash}`}
        style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
      />
      {/* Score number */}
      <text
        x={cx}
        y={cy - 16}
        textAnchor="middle"
        className={styles.scoreText}
        fill="var(--rv-on-surface)"
      >
        {animatedScore}
      </text>
      {/* Label */}
      <text
        x={cx}
        y={cy + 8}
        textAnchor="middle"
        className={styles.labelText}
        fill="var(--rv-primary)"
      >
        {labelMap[label] || 'Deal Score'}
      </text>
    </svg>
  );
}

export default function DealScoreSection({ data }: DealScoreSectionProps) {
  return (
    <section id="deal-score" className={styles.section}>
      <h2 className={styles.heading}>Walk-In Deal Kit</h2>
      <div className={styles.card}>
        <div className={styles.gaugeWrap}>
          <ScoreGauge score={data.score} label={data.label} />
        </div>
        <p className={styles.summary}>{data.summary}</p>
        <div className={styles.grid}>
          {data.marketComparison.map((item) => (
            <div key={item.label} className={styles.gridItem}>
              <span className={styles.gridLabel}>{item.label}</span>
              <span className={styles.gridValue}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
