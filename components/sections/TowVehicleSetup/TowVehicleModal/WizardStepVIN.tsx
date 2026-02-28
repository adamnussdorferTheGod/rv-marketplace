import { useState } from 'react';
import type { TowVehicle } from '../../../../app/src/data/towTypes';
import { decodeVin } from '../../../../app/src/data/towVinDecoder';
import styles from './TowVehicleModal.module.css';

interface WizardStepVINProps {
  onVehicleDecoded: (vehicle: TowVehicle) => void;
  onContinue: () => void;
  onSwitchToYMMT: () => void;
}

export default function WizardStepVIN({ onVehicleDecoded, onContinue, onSwitchToYMMT }: WizardStepVINProps) {
  const [vin, setVin] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [decodedVehicle, setDecodedVehicle] = useState<TowVehicle | null>(null);

  const handleDecode = async () => {
    setIsDecoding(true);
    setError(null);

    // Simulate network delay
    await new Promise(r => setTimeout(r, 300));

    const result = decodeVin(vin);
    setIsDecoding(false);

    if (result.error) {
      setError(result.error);
    } else if (result.vehicle) {
      setDecodedVehicle(result.vehicle);
      onVehicleDecoded(result.vehicle);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && vin.length === 17 && !isDecoding) {
      handleDecode();
    }
  };

  const handleTryAgain = () => {
    setVin('');
    setError(null);
    setDecodedVehicle(null);
  };

  if (decodedVehicle) {
    return (
      <div className={styles.stepContent}>
        <h2 className={styles.stepHeadingCenter}>Vehicle found</h2>
        <div className={styles.vinConfirmCard}>
          <p className={styles.vinVehicleName}>
            {decodedVehicle.year} {decodedVehicle.make} {decodedVehicle.model} {decodedVehicle.trim}
          </p>
          <p className={styles.vinVehicleDetail}>{decodedVehicle.engine}</p>
          <p className={styles.vinVehicleDetail}>{decodedVehicle.cab} &middot; {decodedVehicle.bed}</p>
        </div>
        <div className={styles.vinActions}>
          <button type="button" className={styles.vinContinueBtn} onClick={onContinue}>
            Continue
          </button>
          <button type="button" className={styles.vinLink} onClick={handleTryAgain}>
            Try a different VIN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.stepContent}>
      <h2 className={styles.stepHeadingCenter}>Enter your VIN</h2>
      <p className={styles.stepSubtext}>
        Find your VIN on the driver's side dashboard or door jamb sticker
      </p>
      <div className={styles.vinInputRow}>
        <input
          type="text"
          className={styles.vinInput}
          value={vin}
          onChange={e => setVin(e.target.value.toUpperCase().slice(0, 17))}
          onKeyDown={handleKeyDown}
          placeholder="Enter 17-character VIN"
          maxLength={17}
          autoFocus
        />
        <button
          type="button"
          className={styles.vinDecodeBtn}
          onClick={handleDecode}
          disabled={vin.length !== 17 || isDecoding}
        >
          {isDecoding ? 'Decoding...' : 'Decode'}
        </button>
      </div>
      {error && <p className={styles.vinError}>{error}</p>}
      <button type="button" className={styles.vinLink} onClick={onSwitchToYMMT}>
        Or select your vehicle manually
      </button>
    </div>
  );
}
