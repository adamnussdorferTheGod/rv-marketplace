import { useState, useCallback } from 'react';
import type { TowVehicle, VINDecodeResult } from '../../../../app/src/data/towTypes';
import { decodeVin } from '../../../../app/src/data/towVinDecoder';
import Button from '../../../ui/Button/Button';
import styles from './VINEntry.module.css';

interface VINEntryProps {
  onVehicleSelected: (vehicle: TowVehicle) => void;
}

export default function VINEntry({ onVehicleSelected }: VINEntryProps) {
  const [vin, setVin] = useState('');
  const [result, setResult] = useState<VINDecodeResult | null>(null);
  const [isDecoding, setIsDecoding] = useState(false);

  const handleDecode = useCallback(() => {
    if (!vin.trim()) return;

    setIsDecoding(true);

    // Simulate brief decode delay for UX polish
    setTimeout(() => {
      const decoded = decodeVin(vin);
      setResult(decoded);
      setIsDecoding(false);

      if (decoded.vehicle) {
        onVehicleSelected(decoded.vehicle);
      }
    }, 300);
  }, [vin, onVehicleSelected]);

  const handleReset = useCallback(() => {
    setVin('');
    setResult(null);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleDecode();
      }
    },
    [handleDecode],
  );

  // Show confirmation card if vehicle was found
  if (result?.vehicle) {
    const v = result.vehicle;
    return (
      <div className={styles.confirmationCard}>
        <div className={styles.confirmationHeader}>
          <h4 className={styles.vehicleTitle}>
            {v.year} {v.make} {v.model} {v.trim}
          </h4>
          <p className={styles.vehicleEngine}>{v.engine}</p>
        </div>

        <div className={styles.confirmationSpecs}>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Cab</span>
            <span className={styles.specValue}>{v.cab}</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Bed</span>
            <span className={styles.specValue}>{v.bed}</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>VIN</span>
            <span className={styles.specValue}>{result.vin}</span>
          </div>
        </div>

        <button
          type="button"
          className={styles.tryAgainLink}
          onClick={handleReset}
        >
          Try a different VIN
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputRow}>
        <input
          type="text"
          className={styles.vinInput}
          value={vin}
          onChange={(e) => setVin(e.target.value.toUpperCase())}
          onKeyDown={handleKeyDown}
          placeholder="Enter 17-character VIN"
          maxLength={17}
          autoComplete="off"
          spellCheck={false}
        />
        <Button
          variant="primary"
          size="lg"
          onClick={handleDecode}
          disabled={vin.trim().length < 17 || isDecoding}
          className={styles.decodeButton}
        >
          {isDecoding ? 'Decoding...' : 'Decode'}
        </Button>
      </div>

      {result?.error && (
        <p className={styles.errorMessage}>{result.error}</p>
      )}

      <p className={styles.hint}>
        Find your VIN on the driver's side dashboard or door jamb sticker
      </p>
    </div>
  );
}
