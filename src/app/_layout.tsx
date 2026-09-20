import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#121214" },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Feed de Posts" }} />
      <Stack.Screen
        name="login"
        options={{ presentation: "modal", title: "Login" }}
      />
      <Stack.Screen
        name="create-post"
        options={{ presentation: "modal", title: "Novo Artigo" }}
      />
    </Stack>
  );
}
