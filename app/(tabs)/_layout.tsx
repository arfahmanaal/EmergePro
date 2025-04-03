import React from "react";
import { Tabs } from "expo-router";
import { Home, BarChart2, Award, UserRound } from "lucide-react-native";
import colors from "@/constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.light.subtext,
        tabBarStyle: {
          backgroundColor: colors.light.background,
          borderTopColor: colors.light.border,
        },
        headerStyle: {
          backgroundColor: colors.light.background,
        },
        headerTitleStyle: {
          fontWeight: '600',
          color: colors.light.text,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progress",
          tabBarIcon: ({ color, size }) => <BarChart2 size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="certificates"
        options={{
          title: "Certificates",
          tabBarIcon: ({ color, size }) => <Award size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <UserRound size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}