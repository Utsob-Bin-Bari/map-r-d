import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { RoleProvider } from '../lib/context';

export default function RootLayout() {
  return (
    <RoleProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="map" />
        <Stack.Screen name="font-test" />
      </Stack>
    </RoleProvider>
  );
}
