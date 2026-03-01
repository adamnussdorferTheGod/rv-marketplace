#!/usr/bin/env node

/**
 * Transform scraped RV Trader data into SRPListing format.
 *
 * Reads:  scripts/output/listings.json  (from scrape-rvtrader.mjs)
 * Writes: scripts/output/srpListings.ts  (drop-in replacement for sampleSrpListings.ts)
 *
 * Also copies photos from scripts/output/photos/ to app/public/images/scraped/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INPUT_FILE = path.join(__dirname, 'output', 'listings.json');
const OUTPUT_TS = path.join(__dirname, 'output', 'srpListings.ts');
const PHOTOS_SRC = path.join(__dirname, 'output', 'photos');
const PHOTOS_DEST = path.join(__dirname, '..', 'app', 'public', 'images', 'scraped');

// ─── Helpers ─────────────────────────────────────────────────────────

function parsePrice(raw) {
  if (typeof raw === 'number') return raw;
  const match = String(raw).replace(/,/g, '').match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

function estimateMonthly(price) {
  return Math.round(price * 0.0078);
}

function extractSpec(specs, ...keys) {
  for (const key of keys) {
    for (const [k, v] of Object.entries(specs)) {
      if (k.toLowerCase().includes(key.toLowerCase())) {
        return v;
      }
    }
  }
  return null;
}

function parseLength(specs) {
  const raw = extractSpec(specs, 'length', 'overall length');
  if (!raw) return 25; // default
  const match = String(raw).match(/(\d+)/);
  return match ? parseInt(match[1]) : 25;
}

function parseSleeping(specs) {
  const raw = extractSpec(specs, 'sleep', 'berth');
  if (!raw) return 4;
  const match = String(raw).match(/(\d+)/);
  return match ? Math.min(parseInt(match[1]), 10) : 4;
}

function parseGVWR(specs) {
  const raw = extractSpec(specs, 'gvwr', 'gross vehicle weight', 'gross weight');
  if (!raw) return null;
  const match = String(raw).replace(/,/g, '').match(/(\d+)/);
  return match ? parseInt(match[1]) : null;
}

function parseMileage(specs) {
  const raw = extractSpec(specs, 'mileage', 'miles', 'odometer');
  if (!raw) return null;
  const match = String(raw).replace(/,/g, '').match(/(\d+)/);
  return match ? parseInt(match[1]) : null;
}

function parseFuelType(specs, rvType) {
  if (['travel-trailer', 'fifth-wheel', 'toy-hauler', 'pop-up'].includes(rvType)) return 'n/a';
  const raw = extractSpec(specs, 'fuel', 'engine');
  if (!raw) return 'gas';
  const lower = raw.toLowerCase();
  if (lower.includes('diesel')) return 'diesel';
  if (lower.includes('electric')) return 'electric';
  return 'gas';
}

function parseFloorPlan(specs) {
  const raw = extractSpec(specs, 'floor plan', 'floorplan', 'layout');
  return raw || null;
}

function assignDealRating(price, condition) {
  // Semi-random but deterministic based on price
  const mod = price % 7;
  if (mod < 2) return 'great';
  if (mod < 4) return 'good';
  if (mod < 5) return 'fair';
  if (mod < 6) return 'high';
  return null;
}

function assignTagBadge(daysOnSite, price, originalPrice) {
  if (daysOnSite <= 5) return 'Newly listed';
  if (originalPrice && originalPrice > price) return 'Price reduced';
  if (daysOnSite <= 10) return 'New arrival';
  if (price % 11 === 0) return 'Hot deal';
  return null;
}

// Approximate lat/lng for state capitals (good enough for demo distances)
const stateCoords = {
  'FL': { lat: 27.95, lng: -82.46 }, 'TX': { lat: 29.76, lng: -95.37 },
  'CO': { lat: 39.74, lng: -104.99 }, 'AZ': { lat: 33.45, lng: -112.07 },
  'OR': { lat: 45.52, lng: -122.68 }, 'WA': { lat: 47.61, lng: -122.33 },
  'TN': { lat: 36.16, lng: -86.78 }, 'NC': { lat: 35.23, lng: -80.84 },
  'ID': { lat: 43.62, lng: -116.20 }, 'UT': { lat: 40.76, lng: -111.89 },
  'NM': { lat: 35.08, lng: -106.65 }, 'GA': { lat: 33.75, lng: -84.39 },
  'CA': { lat: 38.58, lng: -121.49 }, 'NV': { lat: 36.17, lng: -115.14 },
  'AL': { lat: 32.38, lng: -86.30 }, 'OH': { lat: 39.96, lng: -82.99 },
  'PA': { lat: 40.27, lng: -76.88 }, 'MI': { lat: 42.73, lng: -84.56 },
  'NY': { lat: 42.65, lng: -73.76 }, 'IN': { lat: 39.77, lng: -86.16 },
  'MO': { lat: 38.58, lng: -92.17 }, 'MN': { lat: 44.96, lng: -93.27 },
  'WI': { lat: 43.07, lng: -89.40 }, 'IA': { lat: 41.59, lng: -93.62 },
  'KS': { lat: 39.05, lng: -95.69 }, 'OK': { lat: 35.47, lng: -97.52 },
  'AR': { lat: 34.75, lng: -92.29 }, 'MS': { lat: 32.30, lng: -90.18 },
  'LA': { lat: 30.45, lng: -91.19 }, 'SC': { lat: 34.00, lng: -81.03 },
  'VA': { lat: 37.54, lng: -77.44 }, 'WV': { lat: 38.35, lng: -81.63 },
  'KY': { lat: 38.19, lng: -84.88 }, 'IL': { lat: 39.80, lng: -89.65 },
  'MT': { lat: 46.59, lng: -112.04 }, 'WY': { lat: 41.14, lng: -104.82 },
  'NE': { lat: 40.81, lng: -96.70 }, 'SD': { lat: 44.37, lng: -100.35 },
  'ND': { lat: 46.81, lng: -100.78 }, 'ME': { lat: 44.31, lng: -69.78 },
  'NH': { lat: 43.21, lng: -71.54 }, 'VT': { lat: 44.26, lng: -72.58 },
  'MA': { lat: 42.36, lng: -71.06 }, 'CT': { lat: 41.76, lng: -72.68 },
  'RI': { lat: 41.82, lng: -71.41 }, 'NJ': { lat: 40.22, lng: -74.76 },
  'DE': { lat: 39.16, lng: -75.52 }, 'MD': { lat: 38.97, lng: -76.49 },
  'DC': { lat: 38.91, lng: -77.04 }, 'HI': { lat: 21.31, lng: -157.86 },
  'AK': { lat: 58.30, lng: -134.42 },
};

function getCoords(state) {
  return stateCoords[state] || { lat: 39.83, lng: -98.58 }; // center of US fallback
}

// ─── Tow helpers (from existing codebase) ────────────────────────────

const MOTORHOME_TYPES = new Set(['class-a', 'class-b', 'class-c']);

function computeTongueWeight(gvwr, rvType, index) {
  const variation = ((index * 7) % 5) / 100;
  switch (rvType) {
    case 'fifth-wheel': return Math.round(gvwr * (0.18 + variation));
    case 'toy-hauler': return Math.round(gvwr * (0.14 + variation));
    default: return Math.round(gvwr * (0.11 + variation));
  }
}

function determineHitchType(rvType, gvwr) {
  if (rvType === 'fifth-wheel') return 'fifth-wheel';
  if (rvType === 'toy-hauler' && gvwr > 12000) return 'fifth-wheel';
  return 'bumper-pull';
}

// ─── Main transform ─────────────────────────────────────────────────

function main() {
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`Input file not found: ${INPUT_FILE}`);
    console.error('Run scrape-rvtrader.mjs first.');
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'));
  console.log(`Loaded ${raw.length} scraped listings`);

  // Copy photos to public directory
  if (fs.existsSync(PHOTOS_SRC)) {
    fs.mkdirSync(PHOTOS_DEST, { recursive: true });
    copyRecursive(PHOTOS_SRC, PHOTOS_DEST);
    console.log(`Photos copied to ${PHOTOS_DEST}`);
  }

  // Transform each listing
  const listings = raw.map((item, index) => {
    const price = parsePrice(item.price);
    const gvwr = parseGVWR(item.specs || {});
    const rvType = item.rvType;
    const isTowable = !MOTORHOME_TYPES.has(rvType) && gvwr != null;
    const daysOnSite = Math.floor(Math.random() * 120) + 1;

    const coords = getCoords(item.location?.state || 'TX');

    return {
      id: item.id,
      title: item.title || `${item.year} ${item.make} ${item.modelAndTrim}`,
      year: item.year,
      make: item.make,
      model: item.modelAndTrim?.split(' ')[0] || '',
      trim: item.modelAndTrim?.split(' ').slice(1).join(' ') || '',
      rvType,
      condition: item.condition || 'used',
      currentPrice: price,
      originalPrice: price > 50000 && index % 4 === 0 ? Math.round(price * 1.1) : null,
      monthlyPayment: estimateMonthly(price),
      dealRating: assignDealRating(price, item.condition),
      photos: (item.photos || []).map(p => ({
        url: p.url,
        alt: p.alt || `${item.title} photo`,
      })),
      tagBadge: assignTagBadge(daysOnSite, price, null),
      isFeatured: index % 8 === 0,
      isSponsored: index % 15 === 0,
      isFavorited: false,
      dealer: {
        name: item.dealerName || 'RV Dealer',
        city: item.location?.city || '',
        state: item.location?.state || '',
        distanceMiles: Math.round(Math.random() * 200 + 5),
      },
      location: {
        city: item.location?.city || '',
        state: item.location?.state || '',
        zip: '00000',
        lat: coords.lat + (Math.random() * 2 - 1),
        lng: coords.lng + (Math.random() * 2 - 1),
      },
      lengthFt: parseLength(item.specs || {}),
      sleepingCapacity: parseSleeping(item.specs || {}),
      fuelType: parseFuelType(item.specs || {}, rvType),
      floorPlan: parseFloorPlan(item.specs || {}),
      grossVehicleWeight: gvwr,
      ...(isTowable ? {
        gvwr,
        tongueWeight: computeTongueWeight(gvwr, rvType, index),
        hitchType: determineHitchType(rvType, gvwr),
      } : {}),
      mileage: parseMileage(item.specs || {}),
      daysOnSite,
      isTrustedPartner: index % 3 === 0,
    };
  });

  // Generate TypeScript file
  const ts = `// Auto-generated from scraped RV Trader data
// Generated: ${new Date().toISOString()}
// Source: scripts/scrape-rvtrader.mjs → scripts/transform-listings.mjs

import type { SRPListing } from './srpTypes';

export const sampleSrpListings: SRPListing[] = ${JSON.stringify(listings, null, 2)} as SRPListing[];
`;

  fs.writeFileSync(OUTPUT_TS, ts);
  console.log(`\nGenerated: ${OUTPUT_TS}`);
  console.log(`Listings: ${listings.length}`);
  console.log(`With photos: ${listings.filter(l => l.photos.length > 0).length}`);
  console.log(`Total photos: ${listings.reduce((sum, l) => sum + l.photos.length, 0)}`);
  console.log(`\nTo use: copy ${OUTPUT_TS} to app/src/data/sampleSrpListings.ts`);
}

function copyRecursive(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

main();
