import { useState, useCallback, useEffect } from 'react';
import * as Location from 'expo-location';

export type PermissionStatus = 'undetermined' | 'granted' | 'denied';

export function useLocationPermission() {
  const [status, setStatus] = useState<PermissionStatus>('undetermined');
  const [loading, setLoading] = useState(true);

  const check = useCallback(async () => {
    const { status: s } = await Location.getForegroundPermissionsAsync();
    setStatus(s === 'granted' ? 'granted' : s === 'denied' ? 'denied' : 'undetermined');
    setLoading(false);
  }, []);

  const request = useCallback(async () => {
    setLoading(true);
    const { status: s } = await Location.requestForegroundPermissionsAsync();
    setStatus(s === 'granted' ? 'granted' : s === 'denied' ? 'denied' : 'undetermined');
    setLoading(false);
    return s === 'granted';
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  return { status, loading, request, check };
}
