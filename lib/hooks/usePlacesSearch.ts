import { useState, useCallback, useRef } from 'react';
import { PLACES_DEBOUNCE_MS } from '../constants/map';
import { fetchPlaceAutocomplete, type PlacePrediction } from '../services/places';

const cache = new Map<string, PlacePrediction[]>();
const CACHE_MAX_AGE_MS = 60_000; // 1 min
const cacheTimestamps = new Map<string, number>();

function getCached(key: string): PlacePrediction[] | undefined {
  const ts = cacheTimestamps.get(key);
  if (ts && Date.now() - ts < CACHE_MAX_AGE_MS) return cache.get(key);
  cache.delete(key);
  cacheTimestamps.delete(key);
  return undefined;
}

function setCached(key: string, value: PlacePrediction[]) {
  cache.set(key, value);
  cacheTimestamps.set(key, Date.now());
}

export function usePlacesSearch() {
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const search = useCallback((input: string) => {
    if (!input.trim()) {
      setPredictions([]);
      setLoading(false);
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      debounceRef.current = null;
      const key = input.trim().toLowerCase();
      const cached = getCached(key);
      if (cached !== undefined) {
        setPredictions(cached);
        setLoading(false);
        return;
      }
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();
      setLoading(true);
      setError(null);
      try {
        const results = await fetchPlaceAutocomplete(input);
        setCached(key, results);
        setPredictions(results);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Search failed');
        setPredictions([]);
      } finally {
        setLoading(false);
        abortRef.current = null;
      }
    }, PLACES_DEBOUNCE_MS);
  }, []);

  const clear = useCallback(() => {
    setPredictions([]);
    setError(null);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
  }, []);

  return { predictions, loading, error, search, clear };
}
