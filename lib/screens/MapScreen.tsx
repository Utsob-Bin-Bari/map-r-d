import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import type { Region } from 'react-native-maps';
import {
  useLocationPermission,
  useCurrentLocation,
  useWatchPosition,
  usePlacesSearch,
  useDirection,
} from '../hooks';
import { useRole } from '../context';
import { fetchPlaceDetails } from '../services/places';
import { SearchBar, PlaceList, Button } from '../ui';
import {
  DEFAULT_REGION,
  MAP_ANIMATION_DURATION,
  JOURNEY_PATH_MIN_DISTANCE_M,
  THERAPIST_APPROACH_RADIUS_M,
} from '../constants/map';
import type { PlacePrediction } from '../services/places';
import { colors, spacing } from '../styles/theme';

type LatLng = { latitude: number; longitude: number };
type DestinationCoords = LatLng | null;

function distanceMeters(a: LatLng, b: LatLng): number {
  const R = 6371000; // Earth radius in meters
  const dLat = ((b.latitude - a.latitude) * Math.PI) / 180;
  const dLon = ((b.longitude - a.longitude) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((a.latitude * Math.PI) / 180) *
      Math.cos((b.latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return R * c;
}

export function MapScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const { role, setRole, userLocation, setUserLocation, therapistPosition, setTherapistPosition } = useRole();
  const { status: permissionStatus, request: requestPermission } = useLocationPermission();
  const { location: initialLocation, getCurrent: getCurrentLocation, loading: locationLoading } = useCurrentLocation();
  const [trackingEnabled, setTrackingEnabled] = useState(true);
  const { position: livePosition } = useWatchPosition(
    trackingEnabled,
    permissionStatus === 'granted'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const { predictions, loading: searchLoading, search, clear: clearSearch } = usePlacesSearch();
  const [destination, setDestination] = useState<DestinationCoords>(null);
  const [destinationName, setDestinationName] = useState<string | null>(null);
  const { polyline, distanceText, durationText, loading: directionLoading, getDirection, clearRoute } = useDirection();
  const [locationEventFired, setLocationEventFired] = useState(false);

  const [isJourneyActive, setIsJourneyActive] = useState(false);
  const [startPosition, setStartPosition] = useState<LatLng | null>(null);
  const [pathTraveled, setPathTraveled] = useState<LatLng[]>([]);

  // User location is updatable (context). Therapist = real-time device location.
  const userCoords = userLocation;
  const therapistCoords = role === 'therapist' ? (livePosition ?? initialLocation) : null;
  const deviceCoords = livePosition ?? initialLocation;

  // Clear route when switching roles so User does not see Therapist route
  const prevRoleRef = useRef<typeof role>(role);
  useEffect(() => {
    if (prevRoleRef.current !== role) {
      prevRoleRef.current = role;
      clearRoute();
    }
  }, [role, clearRoute]);

  // Therapist: publish position to context for User view (driver location)
  useEffect(() => {
    if (role === 'therapist' && therapistCoords) {
      setTherapistPosition(therapistCoords);
    }
  }, [role, therapistCoords?.latitude, therapistCoords?.longitude, setTherapistPosition]);

  // Therapist: directions to user (user's set location), distance/duration, and location-based event
  useEffect(() => {
    if (role !== 'therapist' || !therapistCoords) return;
    getDirection(therapistCoords, userLocation);
  }, [role, therapistCoords?.latitude, therapistCoords?.longitude, userLocation.latitude, userLocation.longitude, getDirection]);

  useEffect(() => {
    if (role !== 'therapist' || !therapistCoords) {
      setLocationEventFired(false);
      return;
    }
    const d = distanceMeters(therapistCoords, userLocation);
    if (d <= THERAPIST_APPROACH_RADIUS_M && !locationEventFired) {
      setLocationEventFired(true);
    } else if (d > THERAPIST_APPROACH_RADIUS_M) {
      setLocationEventFired(false);
    }
  }, [role, therapistCoords?.latitude, therapistCoords?.longitude, userLocation.latitude, userLocation.longitude, locationEventFired]);

  // Journey path only relevant for Therapist (user is hardcoded, doesn't move)
  useEffect(() => {
    if (role !== 'therapist' || !isJourneyActive || !deviceCoords) return;
    setPathTraveled((prev) => {
      if (prev.length === 0) return [deviceCoords];
      const last = prev[prev.length - 1];
      if (distanceMeters(last, deviceCoords) < JOURNEY_PATH_MIN_DISTANCE_M) return prev;
      return [...prev, deviceCoords];
    });
  }, [role, isJourneyActive, deviceCoords?.latitude, deviceCoords?.longitude]);

  const centerOnMe = useCallback(() => {
    const coords = role === 'therapist' ? therapistCoords : userCoords;
    if (role === 'therapist' && !coords) {
      getCurrentLocation();
      return;
    }
    if (!coords) return;
    mapRef.current?.animateToRegion(
      {
        ...coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      MAP_ANIMATION_DURATION
    );
  }, [role, therapistCoords, userCoords, getCurrentLocation]);

  useEffect(() => {
    if (permissionStatus === 'undetermined') {
      requestPermission();
    }
  }, [permissionStatus, requestPermission]);

  useEffect(() => {
    if (role === 'therapist') {
      const coords = livePosition ?? initialLocation;
      if (!coords) return;
      mapRef.current?.animateToRegion(
        { ...coords, latitudeDelta: 0.01, longitudeDelta: 0.01 },
        MAP_ANIMATION_DURATION
      );
    }
  }, [role, initialLocation?.latitude, initialLocation?.longitude, livePosition?.latitude, livePosition?.longitude]);

  const handlePlaceSelect = useCallback(
    async (item: PlacePrediction) => {
      Keyboard.dismiss();
      clearSearch();
      setSearchQuery(item.description);
      try {
        const details = await fetchPlaceDetails(item.place_id);
        if (details?.geometry?.location) {
          const { lat, lng } = details.geometry.location;
          setDestination({ latitude: lat, longitude: lng });
          setDestinationName(details.name ?? details.formatted_address ?? item.description);
          mapRef.current?.animateToRegion(
            {
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            },
            MAP_ANIMATION_DURATION
          );
        }
      } catch (e) {
        Alert.alert('Error', e instanceof Error ? e.message : 'Failed to get place details');
      }
    },
    [clearSearch]
  );

  const handleStartJourney = useCallback(() => {
    if (!therapistCoords) {
      Alert.alert('Need location', 'Allow location access and wait for therapist position.');
      return;
    }
    setStartPosition(therapistCoords);
    setPathTraveled([therapistCoords]);
    setIsJourneyActive(true);
    getDirection(therapistCoords, userLocation);
  }, [therapistCoords, userLocation.latitude, userLocation.longitude, getDirection]);

  const handleEndJourney = useCallback(() => {
    setIsJourneyActive(false);
    setStartPosition(null);
    setPathTraveled([]);
  }, []);

  const handleGetDirection = useCallback(() => {
    if (!destination) {
      Alert.alert('Choose destination', 'Search and select a destination first.');
      return;
    }
    getDirection(userCoords, destination);
  }, [userCoords, destination, getDirection]);

  const handleClearDestination = useCallback(() => {
    setDestination(null);
    setDestinationName(null);
    setSearchQuery('');
    clearRoute();
    if (!isJourneyActive) return;
    setStartPosition(null);
    setPathTraveled([]);
    setIsJourneyActive(false);
  }, [clearRoute, isJourneyActive]);

  const centerCoords = role === 'therapist'
    ? (therapistCoords ?? userLocation)
    : userCoords;
  const initialRegion: Region = centerCoords
    ? {
        ...centerCoords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : DEFAULT_REGION;

  const provider = PROVIDER_GOOGLE;

  if (permissionStatus === 'denied') {
    return (
      <View style={styles.denied}>
        <Text style={styles.deniedText}>Location access is required for the map.</Text>
        <Button title="Open settings" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={initialRegion}
        provider={provider}
        showsUserLocation={false}
        showsMyLocationButton={false}
        onLongPress={
          role === 'user'
            ? (e) => {
                const { latitude, longitude } = e.nativeEvent.coordinate;
                setUserLocation({ latitude, longitude });
                Alert.alert('Location set', 'My location updated to the point on the map.');
              }
            : undefined
        }
      >
        {role === 'therapist' ? (
          <>
            <Marker
              coordinate={userLocation}
              title="User"
              pinColor={colors.error}
            />
            {therapistCoords && (
              <Marker
                coordinate={therapistCoords}
                title="Therapist"
                pinColor={colors.primary}
              />
            )}
            {startPosition && (
              <Marker coordinate={startPosition} title="Start" pinColor="#22c55e" />
            )}
            {isJourneyActive && pathTraveled.length >= 1 && therapistCoords && (
              <Polyline
                coordinates={
                  pathTraveled.length === 1
                    ? [pathTraveled[0], therapistCoords]
                    : [...pathTraveled, therapistCoords]
                }
                strokeColor="#22c55e"
                strokeWidth={5}
              />
            )}
            {polyline.length > 1 && (
              <Polyline
                coordinates={polyline}
                strokeColor={colors.primary}
                strokeWidth={4}
              />
            )}
          </>
        ) : (
          <>
            <Marker
              coordinate={userCoords}
              title="You"
              pinColor={colors.primary}
            />
            {therapistPosition && (
              <Marker
                coordinate={therapistPosition}
                title="Driver"
                pinColor="#f59e0b"
              />
            )}
            {destination && (
              <Marker
                coordinate={destination}
                title={destinationName ?? 'Destination'}
                pinColor={colors.error}
              />
            )}
            {polyline.length > 1 && (
              <Polyline
                coordinates={polyline}
                strokeColor={colors.primary}
                strokeWidth={4}
              />
            )}
          </>
        )}
      </MapView>

      <View style={[styles.topBar, { top: insets.top + spacing.sm }]}>
        <View style={styles.roleSwitcher}>
          <TouchableOpacity
            style={[styles.roleBtn, role === 'user' && styles.roleBtnActive]}
            onPress={() => setRole('user')}
            activeOpacity={0.8}
          >
            <Text style={[styles.roleBtnText, role === 'user' && styles.roleBtnTextActive]}>
              User
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleBtn, role === 'therapist' && styles.roleBtnActive]}
            onPress={() => setRole('therapist')}
            activeOpacity={0.8}
          >
            <Text style={[styles.roleBtnText, role === 'therapist' && styles.roleBtnTextActive]}>
              Therapist
            </Text>
          </TouchableOpacity>
        </View>

        {role === 'therapist' ? (
          <View style={styles.therapistPanel}>
            {(distanceText || durationText) && (
              <View style={styles.distanceRow}>
                {distanceText != null && (
                  <Text style={styles.distanceText}>Distance: {distanceText}</Text>
                )}
                {durationText != null && (
                  <Text style={styles.distanceText}>Time remaining: {durationText}</Text>
                )}
              </View>
            )}
            {locationEventFired && (
              <View style={styles.eventBanner}>
                <Text style={styles.eventBannerText}>Approaching user (within {THERAPIST_APPROACH_RADIUS_M}m)</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.searchWrap}>
            <Text style={styles.mapHint}>Long-press on map to set my location</Text>
            <SearchBar
              value={searchQuery}
              onChangeText={(t) => {
                setSearchQuery(t);
                search(t);
              }}
              placeholder="Search places..."
              loading={searchLoading}
              onClear={() => {
                setSearchQuery('');
                clearSearch();
                handleClearDestination();
              }}
            />
            {predictions.length > 0 && (
              <View style={styles.predictionsWrap}>
                <PlaceList predictions={predictions} onSelect={handlePlaceSelect} />
              </View>
            )}
          </View>
        )}
      </View>

      <View style={[styles.controls, { bottom: insets.bottom + spacing.lg }]}>
        <Button
          title="Test fonts"
          variant="secondary"
          onPress={() => router.push('/font-test')}
          style={styles.fontTestBtn}
        />
        <TouchableOpacity
          style={styles.fab}
          onPress={centerOnMe}
          activeOpacity={0.8}
        >
          <Text style={styles.fabText}>📍</Text>
        </TouchableOpacity>
        {role === 'therapist' && (
          <TouchableOpacity
            style={[styles.fab, styles.trackToggle]}
            onPress={() => setTrackingEnabled((v) => !v)}
            activeOpacity={0.8}
          >
            <Text style={styles.fabText}>{trackingEnabled ? '🔴' : '⚪'}</Text>
          </TouchableOpacity>
        )}
        {role === 'user' && (
          <>
            <Button
              title={locationLoading ? 'Getting...' : 'Use current location'}
              variant="secondary"
              loading={locationLoading}
              onPress={async () => {
                const pos = await getCurrentLocation();
                if (pos) {
                  setUserLocation(pos);
                  Alert.alert('Updated', 'My location set to current position.');
                } else {
                  Alert.alert('Need location', 'Allow location access and try again.');
                }
              }}
              style={styles.directionBtn}
            />
            <Button
              title="Set on map"
              variant="secondary"
              onPress={() =>
                Alert.alert(
                  'Set location on map',
                  'Long-press anywhere on the map to set that point as your location.'
                )
              }
              style={styles.directionBtn}
            />
            {destination && (
              <Button
                title="Set as my location"
                variant="secondary"
                onPress={() => {
                  setUserLocation(destination);
                  Alert.alert('Updated', 'My location set to selected place.');
                }}
                style={styles.directionBtn}
              />
            )}
            {destination && !isJourneyActive && (
              <>
                <Button
                  title={directionLoading ? 'Loading...' : 'Get direction'}
                  onPress={handleGetDirection}
                  loading={directionLoading}
                  style={styles.directionBtn}
                />
                <Button
                  title="Clear"
                  variant="secondary"
                  onPress={handleClearDestination}
                  style={styles.clearBtn}
                />
              </>
            )}
          </>
        )}
        {role === 'therapist' && !isJourneyActive && (
          <Button
            title="Start journey to user"
            onPress={handleStartJourney}
            style={styles.directionBtn}
          />
        )}
        {role === 'therapist' && isJourneyActive && (
          <>
            <Button
              title="End journey"
              variant="secondary"
              onPress={handleEndJourney}
              style={styles.directionBtn}
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  denied: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  deniedText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: spacing.md,
    right: spacing.md,
  },
  roleSwitcher: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  roleBtn: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  roleBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  roleBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  roleBtnTextActive: {
    color: colors.background,
  },
  therapistPanel: {
    marginTop: spacing.xs,
  },
  distanceRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.xs,
  },
  distanceText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  eventBanner: {
    backgroundColor: '#fef3c7',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    marginTop: spacing.xs,
  },
  eventBannerText: {
    fontSize: 13,
    color: '#92400e',
    fontWeight: '600',
  },
  searchWrap: {
    position: 'relative',
  },
  mapHint: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  predictionsWrap: {
    marginTop: spacing.xs,
  },
  controls: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.md,
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  fab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  trackToggle: {
    marginTop: spacing.xs,
  },
  fabText: {
    fontSize: 24,
  },
  directionBtn: {
    marginTop: spacing.sm,
    minWidth: 140,
  },
  clearBtn: {
    minWidth: 100,
  },
  fontTestBtn: {
    marginBottom: spacing.sm,
    minWidth: 120,
  },
});
