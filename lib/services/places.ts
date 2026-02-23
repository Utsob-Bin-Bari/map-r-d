import {
  GOOGLE_PLACES_AUTOCOMPLETE_BASE,
  GOOGLE_PLACE_DETAILS_BASE,
} from '../constants/api';
import { getGoogleMapsApiKey } from '../constants/config';

export type PlacePrediction = {
  place_id: string;
  description: string;
  structured_formatting?: { main_text: string; secondary_text?: string };
};

export type PlaceDetails = {
  place_id: string;
  geometry: { location: { lat: number; lng: number } };
  formatted_address?: string;
  name?: string;
};

export async function fetchPlaceAutocomplete(
  input: string,
  sessionToken?: string
): Promise<PlacePrediction[]> {
  const apiKey = getGoogleMapsApiKey();
  if (!apiKey || !input.trim()) return [];

  const params = new URLSearchParams({
    input: input.trim(),
    key: apiKey,
    types: 'establishment|geocode',
  });
  if (sessionToken) params.set('sessiontoken', sessionToken);

  const res = await fetch(`${GOOGLE_PLACES_AUTOCOMPLETE_BASE}?${params}`);
  const data = await res.json();

  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    throw new Error(data.error_message ?? 'Places request failed');
  }
  return data.predictions ?? [];
}

export async function fetchPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
  const apiKey = getGoogleMapsApiKey();
  if (!apiKey || !placeId) return null;

  const params = new URLSearchParams({
    place_id: placeId,
    key: apiKey,
    fields: 'place_id,geometry,formatted_address,name',
  });

  const res = await fetch(`${GOOGLE_PLACE_DETAILS_BASE}?${params}`);
  const data = await res.json();

  if (data.status !== 'OK') {
    throw new Error(data.error_message ?? 'Place details failed');
  }
  return data.result ?? null;
}
