import { GOOGLE_DIRECTIONS_BASE } from '../constants/api';
import { getGoogleMapsApiKey } from '../constants/config';

export type LatLng = { latitude: number; longitude: number };

export type DirectionsRoute = {
  overview_polyline: { points: string };
  legs: Array<{
    distance?: { text: string };
    duration?: { text: string };
    duration_in_traffic?: { text: string };
    steps: Array<{
      html_instructions?: string;
      distance?: { text: string };
      duration?: { text: string };
    }>;
  }>;
};

export type DirectionsResult = {
  routes: DirectionsRoute[];
  status: string;
};

/**
 * Decode Google's encoded polyline string to array of {latitude, longitude}.
 */
export function decodePolyline(encoded: string): LatLng[] {
  const points: LatLng[] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let shift = 0;
    let result = 0;
    let byte: number;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    const dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    const dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    points.push({
      latitude: lat / 1e5,
      longitude: lng / 1e5,
    });
  }
  return points;
}

export async function fetchDirections(
  origin: LatLng,
  destination: LatLng
): Promise<DirectionsResult> {
  const apiKey = getGoogleMapsApiKey();
  if (!apiKey) throw new Error('Google Maps API key not configured');

  const params = new URLSearchParams({
    origin: `${origin.latitude},${origin.longitude}`,
    destination: `${destination.latitude},${destination.longitude}`,
    key: apiKey,
    mode: 'driving',
  });

  const res = await fetch(`${GOOGLE_DIRECTIONS_BASE}?${params}`);
  const data = await res.json();

  if (data.status !== 'OK') {
    throw new Error(data.error_message ?? 'Directions request failed');
  }
  return data;
}
