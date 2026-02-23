export const DEFAULT_REGION = {
  latitude: 23.8103,
  longitude: 90.4125,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
} as const;

export const LOCATION_WATCH_OPTIONS = {
  accuracy: 4 as const, // Accuracy.Balanced
  timeInterval: 5000, // 5 seconds
  distanceInterval: 10, // 10 meters - reduces updates and API/battery cost
};

export const PLACES_DEBOUNCE_MS = 400;
export const MAP_ANIMATION_DURATION = 500;

/** Minimum distance (meters) between points in the traveled path to avoid huge arrays. */
export const JOURNEY_PATH_MIN_DISTANCE_M = 3;

/** Hardcoded user location for Therapist view (R&D). */
export const HARDCODED_USER_LOCATION = {
  latitude: 23.8115,
  longitude: 90.414,
} as const;

/** Distance (meters) within which to trigger "approaching user" event in Therapist view. */
export const THERAPIST_APPROACH_RADIUS_M = 500;
