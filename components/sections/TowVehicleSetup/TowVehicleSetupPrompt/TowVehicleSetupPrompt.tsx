import { useMemo } from 'react';
import { useTowVehicle } from '../TowVehicleContext';
import {
  calculateTowCompatibility,
  getVerdictLabel,
  type TowableRVSpecs,
} from '../../../../app/src/data/towCompatibility';
import type { TowCheckResult, TowVerdict } from '../../../../app/src/data/towTypes';
import Icon from '@components/ui/Icon/Icon';
import styles from './TowVehicleSetupPrompt.module.css';

// ─── Props ──────────────────────────────────────────────────────────

interface TowVehicleSetupPromptProps {
  rvSpecs?: TowableRVSpecs;
}

// ─── Helpers ────────────────────────────────────────────────────────

function verdictIcon(verdict: TowVerdict) {
  switch (verdict) {
    case 'good': return 'check';
    case 'marginal': return 'alert_triangle';
    case 'not_recommended': return 'x_close';
  }
}

function statusColor(status: 'green' | 'yellow' | 'red') {
  switch (status) {
    case 'green': return 'var(--color-green-200, #22c55e)';
    case 'yellow': return 'var(--color-yellow-200, #eab308)';
    case 'red': return 'var(--color-red-200, #ef4444)';
  }
}

function verdictClass(verdict: TowVerdict) {
  switch (verdict) {
    case 'good': return styles.verdictGood;
    case 'marginal': return styles.verdictMarginal;
    case 'not_recommended': return styles.verdictBad;
  }
}

function CheckRow({ check }: { check: TowCheckResult }) {
  const color = statusColor(check.status);
  const pct = check.label === 'Hitch Class' ? null : check.percentUsed;

  return (
    <div className={styles.checkRow}>
      <span className={styles.checkDot} style={{ background: color }} />
      <span className={styles.checkLabel}>{check.label}</span>
      {pct != null && (
        <span className={styles.checkPct} style={{ color }}>
          {Math.round(pct)}%
        </span>
      )}
      {pct == null && (
        <span className={styles.checkPct} style={{ color }}>
          {check.status === 'green' ? 'OK' : 'Fail'}
        </span>
      )}
    </div>
  );
}

// ─── Component ──────────────────────────────────────────────────────

export default function TowVehicleSetupPrompt({ rvSpecs }: TowVehicleSetupPromptProps) {
  const { savedVehicle, openSetupModal, clearVehicle } = useTowVehicle();

  const result = useMemo(() => {
    if (!savedVehicle || !rvSpecs) return null;
    return calculateTowCompatibility(savedVehicle, rvSpecs);
  }, [savedVehicle, rvSpecs]);

  // No vehicle saved — show setup prompt
  if (!savedVehicle) {
    return (
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <img
            src="/images/icons/car-pickup.svg"
            alt=""
            width={24}
            height={24}
          />
        </div>
        <div className={styles.content}>
          <p className={styles.heading}>Tow-Match</p>
          <p className={styles.subtext}>
            Add your vehicle to see if this is a match for this RV.
          </p>
        </div>
        <button type="button" className={styles.addButton} onClick={openSetupModal}>
          Add vehicle
        </button>
      </div>
    );
  }

  // Vehicle saved but no RV specs (e.g. SRP sidebar) — show vehicle summary
  if (!result) {
    return (
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <img
            src="/images/icons/car-pickup.svg"
            alt=""
            width={24}
            height={24}
          />
        </div>
        <div className={styles.content}>
          <p className={styles.heading}>
            {savedVehicle.make} {savedVehicle.model}
          </p>
          <p className={styles.subtext}>
            {savedVehicle.trim} · {savedVehicle.engine}
          </p>
        </div>
        <button type="button" className={styles.changeButton} onClick={openSetupModal}>
          Change
        </button>
      </div>
    );
  }

  // Vehicle saved + RV specs — show compatibility result
  const { verdict, checks } = result;
  const keyChecks = [checks.towWeight, checks.payload, checks.hitchClass];

  return (
    <div className={`${styles.matchCard} ${verdictClass(verdict)}`}>
      {/* Header */}
      <div className={styles.matchHeader}>
        <div className={styles.matchVerdict}>
          <span className={styles.matchVerdictIcon}>
            <Icon name={verdictIcon(verdict)} size={18} />
          </span>
          <span className={styles.matchVerdictLabel}>
            {getVerdictLabel(verdict)}
          </span>
        </div>
        <button type="button" className={styles.changeButton} onClick={openSetupModal}>
          Change
        </button>
      </div>

      {/* Vehicle */}
      <p className={styles.matchVehicle}>
        {savedVehicle.make} {savedVehicle.model} {savedVehicle.trim}
      </p>

      {/* Key checks */}
      <div className={styles.matchChecks}>
        {keyChecks.map(c => (
          <CheckRow key={c.label} check={c} />
        ))}
      </div>

      {/* Actions */}
      <div className={styles.matchActions}>
        <button type="button" className={styles.detailsLink} onClick={openSetupModal}>
          View all checks
        </button>
        <button type="button" className={styles.removeLink} onClick={clearVehicle}>
          Remove vehicle
        </button>
      </div>
    </div>
  );
}
