// app/_layout.tsx

import { Stack } from 'expo-router';

// Main layout for the app
export default function RootLayout() {
  return (
    <Stack>
      {/* Screens in my app */}
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="league" options={{ title: 'The League' }} />
    </Stack>
  );
}