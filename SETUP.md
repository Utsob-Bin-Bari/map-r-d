# Google Maps Setup

## 1. Environment & API key

1. Copy the example env file:
   ```bash
   cp .env.example .env
   ```
2. Get a Google Maps API key:
   - Go to [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
   - Create or select a project
   - Enable these APIs:
     - **Maps SDK for Android**
     - **Maps SDK for iOS** (if building for iOS)
     - **Places API** (for search)
     - **Directions API** (for directions)
   - Create credentials → API key
   - (Recommended) Restrict the key by API and by app (Android: package name + SHA-1; iOS: bundle ID)
3. Put the key in `.env`:
   ```env
   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_key_here
   ```

## 2. Run the app

- **Expo Go (quick test):**  
  `npx expo start`  
  Then scan the QR code. Note: Google Maps may not work in Expo Go on device; use a **development build** for full map support.

- **Development build (recommended for maps):**
  1. Prebuild: `npx expo prebuild`
  2. Run:
     - Android: `npx expo run:android`
     - iOS: `npx expo run:ios`

After changing the API key in `.env`, run prebuild again (or at least a clean build); the key is baked in at build time.

## 3. Android: SHA-1 for release

For release or Google Play, add your app’s SHA-1 in the Google Cloud API key restrictions. Get debug SHA-1 with:

```bash
cd android && ./gradlew signingReport
```

Add the SHA-1 to your API key in the Cloud Console.

## 4. Cost-saving behavior in the app

- **Places:** Search is debounced (400 ms) and results are cached for 1 minute.
- **Directions:** Requested only when you tap “Get direction”; same route is cached for the session.
- **Location:** Updates every 5 s or 10 m, whichever comes first, to limit battery and re-renders.
