require('dotenv').config({ quiet: true });

const appConfig = require('./app.json');
const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

const expo = {
  ...appConfig.expo,
  ios: {
    ...appConfig.expo.ios,
    config: { ...appConfig.expo.ios?.config, googleMapsApiKey: apiKey },
  },
  android: {
    ...appConfig.expo.android,
    config: {
      ...appConfig.expo.android?.config,
      googleMaps: { ...appConfig.expo.android?.config?.googleMaps, apiKey },
    },
  },
  extra: { ...appConfig.expo.extra, googleMapsApiKey: apiKey },
};

module.exports = { expo };
