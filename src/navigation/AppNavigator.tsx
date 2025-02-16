import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import tw from "../utils/tailwind";
import ArabicText from "../components/shared/ArabicText";
import AuthNavigator from "./AuthNavigator";
import { DateProvider } from "../contexts/DateContext";

// Screen imports
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SubscriptionScreen from "../screens/SubscriptionScreen";
import DateSelectionScreen from "../screens/DateSelectionScreen";
import TipsAndTricksScreen from "../screens/TipsAndTricksScreen";
import DailyHoroscopeScreen from "../screens/DailyHoroscopeScreen";
import UserSelectionScreen from "../screens/UserSelectionScreen";

// Type definitions
export type RootStackParamList = {
  Auth: undefined;
  MainApp: undefined;
  Subscription: undefined;
  DateSelection: undefined;
  TipsAndTricks: undefined;
  DailyHoroscope: undefined;
  UserSelection: undefined;
};

export type MainTabParamList = {
  Profile: undefined;
  Home: undefined;
  Menu: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const TabIcon = ({
  iconName,
  focused,
}: {
  iconName: keyof typeof Feather.glyphMap;
  focused: boolean;
}) => (
  <View style={tw`items-center h-16 justify-center relative`}>
    <Feather
      name={iconName}
      size={24}
      color={focused ? "#D9259A" : "#BCC1CD"}
    />
  </View>
);

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: tw`h-16 bg-white border-t rounded-t-[15px] border-gray-100`,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName='user' />
          ),
        }}
      />
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName='home' />
          ),
        }}
      />
      <Tab.Screen
        name='Menu'
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName='menu' />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DateProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name='Auth' component={AuthNavigator} />
            <Stack.Screen name='MainApp' component={MainTabs} />
            <Stack.Screen
              name='UserSelection'
              component={UserSelectionScreen}
              options={{
                presentation: "modal",
                animation: "slide_from_bottom",
              }}
            />
            <Stack.Screen name='Subscription' component={SubscriptionScreen} />
            <Stack.Screen
              name='DateSelection'
              component={DateSelectionScreen}
            />
            <Stack.Screen
              name='TipsAndTricks'
              component={TipsAndTricksScreen}
            />
            <Stack.Screen
              name='DailyHoroscope'
              component={DailyHoroscopeScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </DateProvider>
    </GestureHandlerRootView>
  );
};

export default AppNavigator;
