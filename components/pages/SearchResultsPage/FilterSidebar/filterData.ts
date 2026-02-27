import type { RVType } from '@app/src/data/srpTypes.ts';
import { RV_TYPE_LABELS } from '@app/src/data/srpTypes.ts';

// ─── RV Type filter options with thumbnails ─────────────────────────

export interface RVTypeOption {
  value: RVType;
  label: string;
  thumbnail: string;
}

export const RV_TYPE_OPTIONS: RVTypeOption[] = [
  {
    value: 'class-a',
    label: RV_TYPE_LABELS['class-a'],
    thumbnail: '/images/rv-types/class-a.png',
  },
  {
    value: 'class-b',
    label: RV_TYPE_LABELS['class-b'],
    thumbnail: '/images/rv-types/class-b.png',
  },
  {
    value: 'class-c',
    label: RV_TYPE_LABELS['class-c'],
    thumbnail: '/images/rv-types/class-c.png',
  },
  {
    value: 'travel-trailer',
    label: RV_TYPE_LABELS['travel-trailer'],
    thumbnail: '/images/rv-types/travel-trailer.png',
  },
  {
    value: 'fifth-wheel',
    label: RV_TYPE_LABELS['fifth-wheel'],
    thumbnail: '/images/rv-types/fifth-wheel.png',
  },
  {
    value: 'toy-hauler',
    label: RV_TYPE_LABELS['toy-hauler'],
    thumbnail: '/images/rv-types/toy-hauler.png',
  },
  {
    value: 'pop-up',
    label: RV_TYPE_LABELS['pop-up'],
    thumbnail: '/images/rv-types/pop-up-camper.png',
  },
];

// ─── Make & Model hierarchical tree ─────────────────────────────────

export interface MakeModelNode {
  make: string;
  models: string[];
}

/**
 * Static make/model data extracted from sample SRP listings.
 * Sorted alphabetically by make name.
 */
export const MAKE_MODEL_TREE: MakeModelNode[] = [
  { make: 'Airstream', models: ['Flying Cloud', 'Interstate'] },
  { make: 'Coachmen', models: ['Catalina', 'Clipper', 'Leprechaun'] },
  { make: 'Fleetwood', models: ['Discovery LXE'] },
  {
    make: 'Forest River',
    models: ['Cardinal', 'Flagstaff', 'Rockwood', 'XLR Nitro'],
  },
  { make: 'Grand Design', models: ['Imagine', 'Momentum', 'Reflection'] },
  { make: 'Heartland', models: ['Bighorn', 'Torque'] },
  { make: 'Jayco', models: ['Jay Feather', 'Jay Sport', 'Redhawk'] },
  { make: 'Keystone', models: ['Fuzion', 'Montana', 'Passport'] },
  { make: 'Newmar', models: ['Bay Star'] },
  {
    make: 'Thor Motor Coach',
    models: ['Four Winds', 'Palazzo', 'Tranquility'],
  },
  { make: 'Tiffin', models: ['Allegro Bus'] },
  { make: 'Winnebago', models: ['Revel', 'View'] },
];
