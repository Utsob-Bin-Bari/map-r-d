# Cost Estimation: Journey + Real-Time Location (Google Maps)

This document outlines **which API calls happen**, **where costs are added**, and **rough estimates** for:

1. **Current flow**: One user starts a journey to a destination with real-time location tracking.
2. **Extended flow**: Same + other users can see the journey and live position.

Prices below are indicative (Google Maps Platform pay-as-you-go; check [current pricing](https://developers.google.com/maps/billing-and-pricing)). Free monthly tiers apply per SKU.

---

## 0. Clarifications

### 0.1 Autocomplete: per request, not “1–5” as a product

- **Billing is per Autocomplete request.** Each HTTP call to the Places Autocomplete API = 1 billable event (or 1 “session usage” if you use a session token and end with Place Details).
- **“1–5”** in this doc means: in one typical “search for a place” flow, the user might trigger **1 to 5 requests** because we debounce (e.g. they type “c”, “co”, “cof”, “coff”, “coffee” → up to ~5 debounced requests). So **N = number of requests** in that flow; each of those is billed.
- **Price per operation** (approximate; check [pricing](https://developers.google.com/maps/billing-and-pricing/pricing#places)):
  - **Autocomplete (per request):** ~\$2.83 per 1,000 requests (after free tier) → **~\$0.00283 per request**. First 10,000 requests/month are free.
  - **Place Details:** ~\$17 per 1,000 → **~\$0.017 per request** (Essentials).
  - **Directions / Routes:** ~\$5 per 1,000 → **~\$0.005 per request** (Essentials).
  - **Map load (Maps SDK):** ~\$7 per 1,000 loads → **~\$0.007 per load**.

So: **each Autocomplete call = one billable event**, priced per 1,000 as above.

### 0.2 Supabase WebSockets: your lat/lng + avatar + “direction towards me” + ETA

You send **latitude/longitude via Supabase (e.g. Realtime)** and on the other side show an avatar and “direction towards me” with estimated time. Cost breakdown:

**(1) Getting your own latitude and longitude (from map or GPS)**  
- **Source:** Use the device **GPS** (e.g. `expo-location`: `getCurrentPositionAsync` / `watchPositionAsync`). The map does not “give” you lat/lng; the OS/location service does.  
- **Google cost:** **\$0**. No Google API is called to get your position.  
- **Supabase cost:** Only if you also write that position to Supabase (writes/bandwidth per your plan).

**(2) On the other side: show avatar at that lat/lng + direction towards you + estimated time**  
- **Avatar at (lat, lng):** Draw a **Marker** (or custom view) at the coordinates you received via Supabase. This is just map overlay; **no extra Google API call**.  
  - **Google cost:** **\$0** (beyond the map load they already have).  
- **“Direction towards me” + estimated time:** To get route and ETA from “their position” to “your position” you must call **Directions API** (or Routes API): origin = their lat/lng, destination = your lat/lng.  
  - **Google cost:** **Yes.** Each such request = **1 Directions/Route request** (~\$5 per 1,000 → **~\$0.005 per request**).  
  - If you refresh that “direction to me” every 30 seconds, that’s **2 requests/minute** → ~\$0.01/min per viewer. To reduce cost: refresh less often (e.g. every 2–5 minutes) or only when positions change by a minimum distance.

**Summary (Supabase + avatar + direction/ETA):**

| What | Google cost |
|------|-------------|
| Get my own lat/lng (GPS) | \$0 |
| Receive their lat/lng via Supabase | \$0 (Supabase only) |
| Show avatar at their lat/lng on map | \$0 |
| Show “direction from them to me” + ETA (Directions API) | **~\$0.005 per request**; more if you poll often |

---

## 1. API calls in the current app (single user, no sharing)

| Step | What happens | Google product | Billable event | Where cost is added |
|------|-------------------------------|----------------|----------------|---------------------|
| Open map | Map view loads (Android/iOS) | **Maps SDK for Android / iOS** | 1 × **Map load** | Google Cloud: **Maps SDK** (Dynamic Maps / Maps SDK SKU). Per session when the map is created. |
| Search destination | User types in search box | **Places API** | **1 billable event per Autocomplete request** | Google Cloud: **Places – Autocomplete**. Each API call = 1 billable event. Debouncing reduces how many calls (e.g. 1–5 per search); each is billed. |
| Select a place | App fetches lat/lng for selected suggestion | **Places API** | 1 × **Place Details** | Google Cloud: **Places – Place Details**. One request per place selection. |
| Tap “Get direction” or “Start journey” | App requests route from current location to destination | **Directions API** (or Routes API) | 1 × **Route request** | Google Cloud: **Routes: Compute Routes** (or legacy Directions). One request per “get direction” / start journey with destination. |
| Real-time location | Device GPS updates (expo-location) | — | **None** | No Google API call. Location is on-device only. |
| Map tiles / pan / zoom | User moves the map | **Maps SDK** | **Map load** only (no per-tile in SDK) | Cost is the initial map load; pan/zoom don’t add extra Maps SDK cost. |

So for **one journey (current app)**:

- **1** map load (driver)
- **N** Autocomplete requests (N = number of API calls; each call = 1 billable event; e.g. 1–5 per search session)
- **1** Place Details (when user selects a place)
- **1** Directions/Route (when user gets direction / starts journey)
- **0** extra Google API calls for “real-time location” (that’s device GPS only).

All of the above cost is in **Google Maps Platform** (Google Cloud billing), under:

- **Maps** → Maps SDK (map load)
- **Places** → Autocomplete, Place Details
- **Routes** → Directions / Compute Routes

---

## 2. Extended flow: “Other users can see the journey” (real-time sharing)

To let **other users** see:

- That a journey has started
- Start point, destination, and **live position** of the driver

you need **your own backend + real-time channel**. Google Maps does **not** provide “share my trip with another user” as a single API; you build it yourself.

### 2.1 Extra components (not Google Maps)

| Component | Role | Where cost is added |
|-----------|------|---------------------|
| **Backend / DB** | Store: journey id, driver id, start, destination, status, path history. | Your backend (e.g. Cloud Run, Firebase, AWS). |
| **Real-time updates** | Push driver’s live location and path to other users. | Real-time DB or messaging (e.g. **Firebase Realtime DB**, **Firestore**, **WebSockets**, Pub/Sub). |
| **App (viewer)** | Other user opens a “view journey” screen, sees map + shared journey. | Same app; viewer also loads a map. |

So:

- **Driver app** → Same Google API usage as above, **plus**:
  - Your backend: e.g. “Create journey”, “Update location” (every X seconds / meters).
- **Viewer app** → No Directions/Places for the shared journey; it just:
  - Loads a **map** (1 map load per viewer),
  - Receives journey data (start, destination, path, live position) from **your backend/realtime DB**, not from Google.

### 2.2 API calls (who calls what)

| Actor | Action | Google API call | Billable event |
|-------|--------|------------------|----------------|
| **Driver** | Open map, search, select place, get direction, start journey | Same as section 1 | 1 map load, N Autocomplete, 1 Place Details, 1 Directions |
| **Driver** | Move (real-time) | None to Google | — |
| **Driver** | Send location/path to server | None to Google | — (your backend / Firebase) |
| **Viewer** | Open “view journey” screen | Map loads | 1 map load **per viewer** |
| **Viewer** | See journey (start, path, live position) | None to Google | Data comes from your backend/Firebase |

So **extra Google cost** when others watch = **one Maps SDK map load per viewer** (and per map open). No extra Places or Directions for viewers if you don’t let them search or compute routes.

### 2.3 Where cost is added (summary)

| Cost type | Where it’s added |
|-----------|-------------------|
| **Google Maps Platform** | Map loads (driver + each viewer), Places (search + place details), Directions/Routes (driver only). All in **Google Cloud Console** → Billing → Maps Platform. |
| **Real-time / backend** | **Firebase** (Realtime DB or Firestore): reads/writes for journey + location updates. Or your own server + WebSockets/Pub/Sub. Billed by Firebase or your cloud provider. |
| **Real-time location** | No extra Google API; device GPS only. Sending that to your backend is your backend’s cost (writes, bandwidth). |

---

## 3. Per-journey cost (rough)

Assume:

- 1 driver, 1 journey, 1 destination, 1 “Get direction” / “Start journey”.
- Optional: V viewers watching that journey (each opens map once).

| Item | Quantity | Typical unit price (check current) | Rough cost |
|------|----------|-------------------------------------|------------|
| Map load (driver) | 1 | ~\$7 / 1,000 loads | ~\$0.007 |
| Map load (viewers) | V | ~\$7 / 1,000 loads | ~\$0.007 × V |
| Autocomplete | N (per request) | ~\$2.83 / 1,000 → **~\$0.00283 per request** (first 10k/mo free) | N × \$0.00283 |
| Place Details | 1 | ~\$17 / 1,000 (after free tier) | ~\$0.017 |
| Directions / Routes | 1 | ~\$5 / 1,000 (Essentials) | ~\$0.005 |
| **Google total (driver only)** | | | **~\$0.02–0.05 per journey** |
| **Google total (driver + V viewers)** | | | **~\$0.02–0.05 + ~\$0.007 × V** |
| Firebase (e.g. Realtime DB) | Writes from driver, reads by viewers | Per GB + operations | Depends on update frequency and V; often cents per journey for moderate use. |

So:

- **Google cost** is driven by: **map loads** (driver + each viewer), **Places** (search + 1 place details), **Directions** (1 route).
- **Real-time location** itself does **not** add Google API cost; it adds **backend/realtime DB** cost (writes/reads).

---

## 4. What to enable in Google Cloud (and what triggers billing)

| API / product | Enable in Cloud Console | What in your app triggers it |
|---------------|-------------------------|------------------------------|
| **Maps SDK for Android** | Maps SDK for Android | Opening the map (MapView). |
| **Maps SDK for iOS** | Maps SDK for iOS | Same on iOS. |
| **Places API** | Places API (New) or legacy | Autocomplete URL, Place Details URL. |
| **Directions API** or **Routes API** | Directions API or Routes API | `fetchDirections()` in `lib/services/directions.ts`. |

Restrict the API key by API (and by app package/bundle ID) to avoid misuse.

---

## 5. Minimizing cost (already in the app + optional)

- **Debounced search** → Fewer Autocomplete requests.
- **Cache Place Details / Directions** (e.g. same origin/destination) → Fewer repeat calls.
- **Directions only on “Get direction” / “Start journey”** → One route per journey.
- **Real-time location** → No Google call; only backend writes (throttle update frequency to reduce backend cost).
- **Viewers** → Don’t call Directions/Places for the shared journey; only load the map and consume your backend data.
- **“Direction towards me” + ETA** → Each refresh = 1 Directions request. Refresh less often (e.g. every 2–5 min or when position changes) to limit cost.

If you want, the next step is to add a small “Cost” or “Billing” section in the app (or README) that links to this file and to [Google Maps Platform pricing](https://developers.google.com/maps/billing-and-pricing).
