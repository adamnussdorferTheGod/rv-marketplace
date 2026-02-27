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
    thumbnail:
      'https://images.unsplash.com/photo-1668503237794-00b1212b5749?w=60&h=40&fit=crop&auto=format',
  },
  {
    value: 'class-b',
    label: RV_TYPE_LABELS['class-b'],
    thumbnail:
      'https://images.unsplash.com/photo-1565126703573-3537bb43cd46?w=60&h=40&fit=crop&auto=format',
  },
  {
    value: 'class-c',
    label: RV_TYPE_LABELS['class-c'],
    thumbnail:
      'https://images.unsplash.com/photo-1613142078060-88d5609458c4?w=60&h=40&fit=crop&auto=format',
  },
  {
    value: 'travel-trailer',
    label: RV_TYPE_LABELS['travel-trailer'],
    thumbnail:
      'https://images.unsplash.com/photo-1721495669193-2746e9f82598?w=60&h=40&fit=crop&auto=format',
  },
  {
    value: 'fifth-wheel',
    label: RV_TYPE_LABELS['fifth-wheel'],
    thumbnail:
      'https://images.unsplash.com/photo-1649621991444-6ff6ca66b0b9?w=60&h=40&fit=crop&auto=format',
  },
  {
    value: 'toy-hauler',
    label: RV_TYPE_LABELS['toy-hauler'],
    thumbnail:
      'https://images.unsplash.com/photo-1693482968534-41993f5a9594?w=60&h=40&fit=crop&auto=format',
  },
  {
    value: 'pop-up',
    label: RV_TYPE_LABELS['pop-up'],
    thumbnail:
      'https://images.unsplash.com/photo-1513309993343-cf3bfa51f700?w=60&h=40&fit=crop&auto=format',
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
