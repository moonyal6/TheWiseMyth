import React from "react";
import { View, Animated } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import GradientBackground from "../components/shared/GradientBackground";
import AuthStepHeader from "../screens/auth/components/shared/AuthStepHeader";
import GenderScreen from "../screens/auth/GenderScreen";
import BirthDateScreen from "../screens/auth/BirthDateScreen";
import BirthTimeScreen from "../screens/auth/BirthTimeScreen";
import NationalityScreen from "../screens/auth/NationalityScreen";
import AccountCreatedScreen from "../screens/auth/AccountCreatedScreen";
import tw from "../utils/tailwind";
import { AuthStackParamList } from "./AuthNavigator";

export type AuthStepParamList = {
  Gender: undefined;
  BirthDate: undefined;
  BirthTime: undefined;
  Nationality: undefined;
  AccountCreated: undefined;
};

const Stack = createNativeStackNavigator<AuthStepParamList>();

const STEPS = {
  Gender: { title: "اختر جنسك", step: 1 },
  BirthDate: { title: "اختر يوم الولادة", step: 2 },
  BirthTime: { title: "اختر وقت الولادة", step: 3 },
  Nationality: { title: "اختر جنسيتك", step: 4 },
  AccountCreated: { title: "تم إنشاء حسابك بنجاح!", step: 5 },
};

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList & AuthStepParamList
>;

const AuthStepNavigator = () => {
  const [currentRoute, setCurrentRoute] = React.useState("Gender");
  const navigation = useNavigation<NavigationProp>();

  const handleBack = () => {
    if (currentRoute === "Gender") {
      // If we're on the first step, replace current screen with SignUp screen
      navigation.replace("SignUp");
    } else {
      // Go back to the previous screen in the stack
      navigation.goBack();
    }
  };

  return (
    <GradientBackground hideTopBlob>
      <SafeAreaView style={tw`flex-1`}>
        {/* Persistent Header */}
        <AuthStepHeader
          title={STEPS[currentRoute as keyof typeof STEPS].title}
          currentStep={STEPS[currentRoute as keyof typeof STEPS].step}
          totalSteps={4}
          onBack={handleBack}
          isInitialScreen={currentRoute === "Gender"}
          isFinalStep={currentRoute === "AccountCreated"}
        />

        {/* Stack Navigator */}
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: "slide_from_left",
            animationDuration: 200,
            animationTypeForReplace: "push",
          }}
          screenListeners={{
            state: (e) => {
              const route = e.data?.state?.routes[e.data.state.index]?.name;
              if (route) {
                setCurrentRoute(route);
              }
            },
          }}
        >
          <Stack.Screen name='Gender' component={GenderScreen} />
          <Stack.Screen name='BirthDate' component={BirthDateScreen} />
          <Stack.Screen name='BirthTime' component={BirthTimeScreen} />
          <Stack.Screen name='Nationality' component={NationalityScreen} />
          <Stack.Screen
            name='AccountCreated'
            component={AccountCreatedScreen}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default AuthStepNavigator;
