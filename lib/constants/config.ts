import Constants from 'expo-constants';

/**
 * Google Maps API key from env (injected at build time via app.config.js).
 * Use this in services instead of reading Constants/process.env directly.
 */
export function getGoogleMapsApiKey(): string {
  return (
    Constants.expoConfig?.extra?.googleMapsApiKey ??
    (typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY) ??
    ''
  );
}
