import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Training Platform",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}