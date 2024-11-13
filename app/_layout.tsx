import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // This hides the header for all screens in the stack
      }}
    />
  );
}
