import { useState } from 'react';
import styles from './SellRvCard.module.css';

const YEARS = Array.from({ length: 30 }, (_, i) => String(2025 - i));
const CATEGORIES = ['Motorhome', 'Travel Trailer', 'Fifth Wheel', 'Toy Hauler', 'Truck Camper', 'Pop-Up Camper', 'Park Model'];
const MAKES = ['Airstream', 'Coachmen', 'Forest River', 'Jayco', 'Keystone', 'Newmar', 'Thor', 'Winnebago'];
const MODELS: Record<string, string[]> = {
  Airstream: ['Flying Cloud', 'Basecamp', 'Interstate', 'Classic'],
  Coachmen: ['Catalina', 'Freelander', 'Leprechaun', 'Apex'],
  'Forest River': ['Rockwood', 'Flagstaff', 'Cherokee', 'Salem'],
  Jayco: ['Jay Flight', 'Jay Feather', 'Eagle', 'Greyhawk'],
  Keystone: ['Passport', 'Cougar', 'Montana', 'Springdale'],
  Newmar: ['Bay Star', 'Canyon Star', 'Dutch Star', 'King Aire'],
  Thor: ['Four Winds', 'Chateau', 'Ace', 'Palazzo'],
  Winnebago: ['Minnie', 'Vista', 'Solis', 'Travato'],
};

export default function SellRvCard() {
  const [mode, setMode] = useState<'selling' | 'trading'>('selling');
  const [year, setYear] = useState('');
  const [category, setCategory] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');

  const availableModels = make && MODELS[make] ? MODELS[make] : [];

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Earn top dollar for your RV</h3>

      <div className={styles.toggle}>
        <button
          type="button"
          className={`${styles.toggleOption} ${mode === 'selling' ? styles.toggleOptionActive : ''}`}
          onClick={() => setMode('selling')}
        >
          Selling
        </button>
        <button
          type="button"
          className={`${styles.toggleOption} ${mode === 'trading' ? styles.toggleOptionActive : ''}`}
          onClick={() => setMode('trading')}
        >
          Trading in
        </button>
      </div>

      <span className={styles.price}>$25,850</span>

      <div className={styles.fields}>
        <div className={styles.field}>
          <select
            className={styles.select}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="" disabled>Year *</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <select
            className={styles.select}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>Category *</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <select
            className={styles.select}
            value={make}
            onChange={(e) => { setMake(e.target.value); setModel(''); }}
          >
            <option value="" disabled>Make *</option>
            {MAKES.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <select
            className={styles.select}
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={!make}
          >
            <option value="" disabled>Model *</option>
            {availableModels.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <button type="button" className={styles.cta}>
          {mode === 'selling' ? 'Sell online today' : 'Get trade-in value'}
        </button>
      </div>
    </div>
  );
}
