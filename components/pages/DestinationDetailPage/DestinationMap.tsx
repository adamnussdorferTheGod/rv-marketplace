import { useRef, useEffect, useState } from 'react';
import Icon from '@components/ui/Icon/Icon';
import styles from './DestinationMap.module.css';

interface DestinationMapProps {
  name: string;
  region: string;
  lat?: number;
  lng?: number;
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined;

export default function DestinationMap({ name, region, lat, lng }: DestinationMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapError, setMapError] = useState(false);

  const canRenderMap = Boolean(MAPBOX_TOKEN && lat != null && lng != null);

  useEffect(() => {
    if (!canRenderMap || !containerRef.current) return;

    let map: mapboxgl.Map;

    (async () => {
      try {
        const mapboxgl = await import('mapbox-gl');
        await import('mapbox-gl/dist/mapbox-gl.css');

        mapboxgl.default.accessToken = MAPBOX_TOKEN!;

        map = new mapboxgl.default.Map({
          container: containerRef.current!,
          style: 'mapbox://styles/mapbox/outdoors-v12',
          center: [lng!, lat!],
          zoom: 12,
        });

        map.addControl(new mapboxgl.default.NavigationControl(), 'top-right');

        new mapboxgl.default.Marker({ color: '#2D6A4F' })
          .setLngLat([lng!, lat!])
          .setPopup(
            new mapboxgl.default.Popup({ offset: 25 }).setHTML(
              `<strong>${name}</strong><br/>${region}`
            )
          )
          .addTo(map);

        mapRef.current = map;
      } catch {
        setMapError(true);
      }
    })();

    return () => {
      map?.remove();
      mapRef.current = null;
    };
  }, [canRenderMap, lat, lng, name, region]);

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

  return <div ref={containerRef} className={styles.mapContainer} />;
}
