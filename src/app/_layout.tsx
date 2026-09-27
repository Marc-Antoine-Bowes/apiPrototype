import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#F8FAFC",
        },
        headerTintColor: "#1E293B",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ title: "Accueil" }} 
      />
      <Stack.Screen 
        name="[name]" 
        options={({ route }) => ({
          title: (route.params as { name?: string })?.name ?? "Détail de la journée",
        })} 
      />
    </Stack>
  );
}
