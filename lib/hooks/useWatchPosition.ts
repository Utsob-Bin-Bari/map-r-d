import { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { LOCATION_WATCH_OPTIONS } from '../constants/map';

export type WatchedCoords = {
  latitude: number;
  longitude: number;
} | null;

export function useWatchPosition(enabled: boolean, hasPermission: boolean) {
  const [position, setPosition] = useState<WatchedCoords>(null);
  const [error, setError] = useState<string | null>(null);
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    if (!enabled || !hasPermission) {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
      return;
    }

    let mounted = true;
    (async () => {
      try {
        const sub = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: LOCATION_WATCH_OPTIONS.timeInterval,
            distanceInterval: LOCATION_WATCH_OPTIONS.distanceInterval,
          },
          (loc) => {
            if (mounted) {
              setPosition({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
              });
              setError(null);
            }
          }
        );
        subscriptionRef.current = sub;
      } catch (e) {
        if (mounted) {
          setError(e instanceof Error ? e.message : 'Location watch failed');
        }
      }
    })();

    return () => {
      mounted = false;
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
    };
  }, [enabled, hasPermission]);

  return { position, error };
}
