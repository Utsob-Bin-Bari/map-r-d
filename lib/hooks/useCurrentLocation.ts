import { useState, useCallback } from 'react';
import * as Location from 'expo-location';

export type LocationCoords = {
  latitude: number;
  longitude: number;
} | null;

export function useCurrentLocation() {
  const [location, setLocation] = useState<LocationCoords>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
      return { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to get location';
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { location, loading, error, getCurrent };
}
