import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Providers } from '../lib/providers';

export default function RootLayout() {
  return (
    <Providers>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="map" />
        <Stack.Screen name="font-test" />
      </Stack>
    </Providers>
  );
}
