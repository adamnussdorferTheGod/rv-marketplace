import { useRef, useEffect, useState } from 'react';
import Icon from '@components/ui/Icon/Icon';
import ICONS from '@components/ui/Icon/icons';
import styles from './DestinationMap.module.css';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface DestinationMapProps {
  name: string;
  region: string;
  lat?: number;
  lng?: number;
}

interface POI {
  id: string;
  name: string;
  address: string;
  lng: number;
  lat: number;
  category: POICategory;
}

type POICategory = 'restaurant' | 'gas_station' | 'grocery' | 'campground' | 'park' | 'trail' | 'kayaking' | 'attraction';

interface CategoryConfig {
  key: POICategory;
  label: string;
  icon: string;
  query: string;
  color: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined;

const POI_CATEGORIES: CategoryConfig[] = [
  { key: 'campground', label: 'Campgrounds', icon: 'campground', query: 'camping', color: '#006836' },
  { key: 'park', label: 'Parks', icon: 'park', query: 'park', color: '#4CAF50' },
  { key: 'trail', label: 'Trails', icon: 'hiking', query: 'hiking', color: '#8B6914' },
  { key: 'kayaking', label: 'Kayaking', icon: 'kayak', query: 'kayaking', color: '#0288D1' },
  { key: 'attraction', label: 'Things to Do', icon: 'binoculars', query: 'tourist_attraction', color: '#E65100' },
  { key: 'restaurant', label: 'Dining', icon: 'restaurant', query: 'restaurant', color: '#2D6A4F' },
  { key: 'gas_station', label: 'Gas', icon: 'fuel', query: 'gas_station', color: '#494A4C' },
  { key: 'grocery', label: 'Grocery', icon: 'grocery', query: 'grocery', color: '#3870E9' },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Build an SVG string from the icon registry for use in HTML markers. */
function buildIconSVG(iconName: string, size: number, color: string): string {
  const icon = ICONS[iconName];
  if (!icon) return '';
  const viewBox = icon.viewBox || '0 0 24 24';
  const paths = icon.paths
    .map((d, i) => {
      const fill = icon.fill?.[i] || 'none';
      const sw = icon.strokeWidth ?? 2;
      return `<path d="${d}" fill="${fill === 'currentColor' ? color : fill}" stroke="${fill === 'currentColor' ? 'none' : color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
    })
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${viewBox}" fill="none">${paths}</svg>`;
}

/** Create a DOM element for a POI marker (30px circle with icon). */
function createPOIMarkerElement(category: CategoryConfig): HTMLDivElement {
  const el = document.createElement('div');
  el.style.cssText = `
    width:30px;height:30px;border-radius:50%;
    background:${category.color};
    border:2px solid #fff;
    box-shadow:0 2px 6px rgba(0,0,0,0.3);
    display:flex;align-items:center;justify-content:center;
    cursor:pointer;
  `;
  el.innerHTML = buildIconSVG(category.icon, 14, '#fff');
  return el;
}

/** Fetch POIs from Mapbox Search Box API v1 around the given coordinates. */
async function fetchPOIs(lng: number, lat: number): Promise<POI[]> {
  if (!MAPBOX_TOKEN) return [];

  const results = await Promise.all(
    POI_CATEGORIES.map(async (cat) => {
      try {
        const url = `https://api.mapbox.com/search/searchbox/v1/category/${encodeURIComponent(cat.query)}?proximity=${lng},${lat}&limit=5&access_token=${MAPBOX_TOKEN}`;
        const res = await fetch(url);
        if (!res.ok) return [];
        const data = await res.json();
        return (data.features || []).map((f: any): POI => ({
          id: f.properties.mapbox_id,
          name: f.properties.name || '',
          address: f.properties.full_address || f.properties.place_formatted || '',
          lng: f.geometry.coordinates[0],
          lat: f.geometry.coordinates[1],
          category: cat.key,
        }));
      } catch {
        return [];
      }
    })
  );

  return results.flat();
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function DestinationMap({ name, region, lat, lng }: DestinationMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapboxglRef = useRef<typeof import('mapbox-gl') | null>(null);
  const poiMarkersRef = useRef<mapboxgl.Marker[]>([]);

  const [mapError, setMapError] = useState(false);
  const [pois, setPois] = useState<POI[]>([]);

  const canRenderMap = Boolean(MAPBOX_TOKEN && lat != null && lng != null);

  /* ---------- Init map + fetch POIs ---------- */
  useEffect(() => {
    if (!canRenderMap || !containerRef.current) return;

    let map: mapboxgl.Map;
    let cancelled = false;

    (async () => {
      try {
        const mapboxgl = await import('mapbox-gl');
        await import('mapbox-gl/dist/mapbox-gl.css');

        if (cancelled) return;

        mapboxglRef.current = mapboxgl;
        mapboxgl.default.accessToken = MAPBOX_TOKEN!;

        map = new mapboxgl.default.Map({
          container: containerRef.current!,
          style: 'mapbox://styles/mapbox/outdoors-v12',
          center: [lng!, lat!],
          zoom: 12,
        });

        map.addControl(new mapboxgl.default.NavigationControl(), 'top-right');

        // Destination marker
        new mapboxgl.default.Marker({ color: '#2D6A4F' })
          .setLngLat([lng!, lat!])
          .setPopup(
            new mapboxgl.default.Popup({ offset: 25 }).setHTML(
              `<strong>${name}</strong><br/>${region}`
            )
          )
          .addTo(map);

        mapRef.current = map;

        // Fetch POIs after map loads
        const fetchedPois = await fetchPOIs(lng!, lat!);
        if (!cancelled) {
          setPois(fetchedPois);
        }
      } catch {
        if (!cancelled) setMapError(true);
      }
    })();

    return () => {
      cancelled = true;
      poiMarkersRef.current.forEach((m) => m.remove());
      poiMarkersRef.current = [];
      map?.remove();
      mapRef.current = null;
      mapboxglRef.current = null;
    };
  }, [canRenderMap, lat, lng, name, region]);

  /* ---------- Sync POI markers when data arrives ---------- */
  useEffect(() => {
    const map = mapRef.current;
    const mapboxgl = mapboxglRef.current;
    if (!map || !mapboxgl || pois.length === 0) return;

    // Remove old markers
    poiMarkersRef.current.forEach((m) => m.remove());
    poiMarkersRef.current = [];

    const catMap = new Map(POI_CATEGORIES.map((c) => [c.key, c]));

    poiMarkersRef.current = pois.map((poi) => {
      const config = catMap.get(poi.category)!;
      const el = createPOIMarkerElement(config);

      return new mapboxgl.default.Marker({ element: el })
        .setLngLat([poi.lng, poi.lat])
        .setPopup(
          new mapboxgl.default.Popup({ offset: 15, maxWidth: '220px' }).setHTML(
            `<strong>${poi.name}</strong><br/><span style="font-size:12px;color:#666">${poi.address}</span>`
          )
        )
        .addTo(map);
    });
  }, [pois]);

  /* ---------- Placeholder fallback ---------- */
  if (!canRenderMap || mapError) {
    return (
      <div className={styles.mapPlaceholder}>
        <div className={styles.inner}>
          <Icon name="location_pin" size={40} className={styles.pin} />
          <span className={styles.name}>{name}</span>
          <span className={styles.region}>{region}</span>
        </div>
      </div>
    );
  }

  /* ---------- Render ---------- */
  return (
    <div className={styles.mapWrapper}>
      <div ref={containerRef} className={styles.mapContainer} />
      <div className={styles.legend}>
        {POI_CATEGORIES.map((cat) => (
          <span key={cat.key} className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: cat.color }} />
            {cat.label}
          </span>
        ))}
      </div>
    </div>
  );
}
