import { useMemo } from 'react';
import { useTowVehicle } from '../TowVehicleContext';
import {
  calculateTowCompatibility,
  type TowableRVSpecs,
} from '../../../../app/src/data/towCompatibility';
import type { TowCheckResult, TowVerdict } from '../../../../app/src/data/towTypes';
import Icon from '@components/ui/Icon/Icon';
import styles from './TowVehicleSetupPrompt.module.css';

// ─── Props ──────────────────────────────────────────────────────────

interface TowVehicleSetupPromptProps {
  rvSpecs?: TowableRVSpecs;
  rvName?: string;
  rvImageUrl?: string;
}

// ─── Helpers ────────────────────────────────────────────────────────

function verdictIcon(verdict: TowVerdict) {
  switch (verdict) {
    case 'good': return 'check';
    case 'marginal': return 'alert_triangle';
    case 'not_recommended': return 'x_close';
  }
}

function verdictTitle(verdict: TowVerdict) {
  switch (verdict) {
    case 'good': return 'Good tow match';
    case 'marginal': return 'Marginal tow match';
    case 'not_recommended': return 'Not good tow match';
  }
}

function verdictDescription(
  verdict: TowVerdict,
  vehicleName: string,
  rvName: string,
) {
  switch (verdict) {
    case 'good':
      return `${vehicleName} can tow this ${rvName}.`;
    case 'marginal':
      return `${vehicleName} may struggle towing this ${rvName}.`;
    case 'not_recommended':
      return `${vehicleName} can't tow this ${rvName}.`;
  }
}

function statusColor(status: 'green' | 'yellow' | 'red') {
  switch (status) {
    case 'green': return '#11a94e';
    case 'yellow': return '#eab308';
    case 'red': return '#d8202e';
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
          {check.status === 'green' ? 'OK' : 'FAIL'}
        </span>
      )}
    </div>
  );
}

// ─── Component ──────────────────────────────────────────────────────

export default function TowVehicleSetupPrompt({
  rvSpecs,
  rvName = 'RV',
  rvImageUrl,
}: TowVehicleSetupPromptProps) {
  const { savedVehicle, openSetupModal } = useTowVehicle();

  const result = useMemo(() => {
    if (!savedVehicle || !rvSpecs?.gvwr) return null;
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
  const vehicleName = `${savedVehicle.make} ${savedVehicle.model} ${savedVehicle.trim}`;

  return (
    <div className={`${styles.matchCard} ${verdictClass(verdict)}`}>
      {/* Header */}
      <div className={styles.matchHeader}>
        <div className={styles.matchVerdict}>
          <span className={styles.matchVerdictIcon}>
            <Icon name={verdictIcon(verdict)} size={24} />
          </span>
          <span className={styles.matchVerdictTitle}>
            {verdictTitle(verdict)}
          </span>
        </div>
        <button type="button" className={styles.editButton} onClick={openSetupModal}>
          <Icon name="edit" size={20} />
          Edit
        </button>
      </div>

      {/* Description */}
      <p className={styles.matchDescription}>
        {verdictDescription(verdict, vehicleName, rvName)}
      </p>

      {/* Content row: images + checks */}
      <div className={styles.matchContent}>
        {/* Overlapping vehicle/RV images */}
        <div className={styles.matchImages}>
          <div className={styles.matchImageCircle}>
            <img
              src="/images/tow-vehicle-placeholder.png"
              alt={vehicleName}
              className={styles.matchImagePhoto}
            />
          </div>
          <div className={`${styles.matchImageCircle} ${styles.matchImageOverlap}`}>
            {rvImageUrl ? (
              <img
                src={rvImageUrl}
                alt={rvName}
                className={styles.matchImagePhoto}
              />
            ) : (
              <span className={styles.matchImageFallback}>RV</span>
            )}
          </div>
        </div>

        {/* Check rows */}
        <div className={styles.matchChecks}>
          {keyChecks.map(c => (
            <CheckRow key={c.label} check={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
