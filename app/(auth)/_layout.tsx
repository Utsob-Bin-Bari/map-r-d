import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="reset-link-sent" />
      <Stack.Screen name="new-password" />
      <Stack.Screen name="reset-confirmation" />
      <Stack.Screen name="verify-phone" />
    </Stack>
  );
}
