import { useState, useCallback, useRef } from 'react';
import {
  fetchDirections,
  decodePolyline,
  type LatLng,
  type DirectionsResult,
} from '../services/directions';

export type RoutePolyline = LatLng[];

type CacheEntry = {
  polyline: RoutePolyline;
  distanceText: string | null;
  durationText: string | null;
};

type CacheKey = string;
function cacheKey(origin: LatLng, dest: LatLng): CacheKey {
  return `${origin.latitude.toFixed(5)},${origin.longitude.toFixed(5)}-${dest.latitude.toFixed(5)},${dest.longitude.toFixed(5)}`;
}

const routeCache = new Map<CacheKey, CacheEntry>();

export function useDirection() {
  const [polyline, setPolyline] = useState<RoutePolyline>([]);
  const [distanceText, setDistanceText] = useState<string | null>(null);
  const [durationText, setDurationText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastRequestRef = useRef<{ origin: LatLng; dest: LatLng } | null>(null);

  const getDirection = useCallback(async (origin: LatLng, destination: LatLng) => {
    const key = cacheKey(origin, destination);
    const cached = routeCache.get(key);
    if (cached && cached.polyline.length > 0) {
      setPolyline(cached.polyline);
      setDistanceText(cached.distanceText);
      setDurationText(cached.durationText);
      setError(null);
      return cached.polyline;
    }

    lastRequestRef.current = { origin, dest: destination };
    setLoading(true);
    setError(null);
    try {
      const result: DirectionsResult = await fetchDirections(origin, destination);
      const route = result.routes?.[0];
      if (route?.overview_polyline?.points) {
        const decoded = decodePolyline(route.overview_polyline.points);
        const leg = route.legs?.[0];
        const distText = leg?.distance?.text ?? null;
        const durText =
          leg?.duration_in_traffic?.text ?? leg?.duration?.text ?? null;
        routeCache.set(key, { polyline: decoded, distanceText: distText, durationText: durText });
        if (
          lastRequestRef.current?.origin === origin &&
          lastRequestRef.current?.dest === destination
        ) {
          setPolyline(decoded);
          setDistanceText(distText);
          setDurationText(durText);
        }
        return decoded;
      }
      setPolyline([]);
      setDistanceText(null);
      setDurationText(null);
      return [];
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Directions failed');
      setPolyline([]);
      setDistanceText(null);
      setDurationText(null);
      return [];
    } finally {
      setLoading(false);
      lastRequestRef.current = null;
    }
  }, []);

  const clearRoute = useCallback(() => {
    setPolyline([]);
    setDistanceText(null);
    setDurationText(null);
    setError(null);
  }, []);

  return { polyline, distanceText, durationText, loading, error, getDirection, clearRoute };
}
