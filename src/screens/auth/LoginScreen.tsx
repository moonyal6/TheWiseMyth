import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "../../components/shared/GradientBackground";
import Logo from "../../components/shared/Logo";
import AuthInput from "./components/AuthInput";
import AuthButton from "./components/AuthButton";
import SocialButtons from "../../components/shared/SocialButtons";
import ArabicText from "../../components/shared/ArabicText";
import tw from "../../utils/tailwind";
import strings from "../../localization";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList>;
};

const LoginScreen = ({ navigation }: Props) => {
  const rootNavigation = useNavigation();
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validation
  const validateForm = () => {
    let isValid = true;

    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Email validation
    if (!email.trim()) {
      setEmailError(strings.auth.login.email.required);
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(strings.auth.login.email.invalid);
      isValid = false;
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError(strings.auth.login.password.required);
      isValid = false;
    }

    return isValid;
  };

  // Handle login
  const handleLogin = async () => {
    // Bypass validation for development
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate to MainApp and set initial route to Home
      rootNavigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "MainApp",
              state: {
                routes: [{ name: "Home" }],
              },
            },
          ],
        }),
      );
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle social login
  const handleSocialLogin = (provider: "email" | "google" | "apple") => {
    console.log(`Social login with ${provider}`);
  };

  return (
    <GradientBackground>
      <SafeAreaView style={tw`flex-1`}>
        <View style={tw`flex-1 items-center`}>
          {/* Top space */}
          <View style={tw`h-11`} />

          {/* Logo */}
          <Logo />

          {/* Space between logo and text */}
          <View style={tw`flex-4`} />

          {/* Title */}
          <View style={tw`mt-8 mb-8`}>
            <ArabicText variant='title' style={tw`text-center`}>
              {strings.auth.login.title}
            </ArabicText>
          </View>

          {/* Space between title and form */}
          <View style={tw`flex-4`} />

          {/* Form */}
          <View style={tw`px-8`}>
            <View style={tw`gap-y-6`}>
              <AuthInput
                label={strings.auth.login.email.label}
                placeholder={strings.auth.login.email.placeholder}
                keyboardType='email-address'
                autoCapitalize='none'
                value={email}
                onChangeText={setEmail}
                error={emailError}
              />

              <AuthInput
                label={strings.auth.login.password.label}
                placeholder={strings.auth.login.password.placeholder}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                error={passwordError}
              />
            </View>

            <View style={tw`mt-8`}>
              <AuthButton
                title={strings.auth.login.title}
                onPress={handleLogin}
                loading={isLoading}
                disabled={isLoading}
              />
            </View>

            <SocialButtons
              containerStyle={tw`mt-6`}
              onEmailPress={() => handleSocialLogin("email")}
              onGooglePress={() => handleSocialLogin("google")}
              onApplePress={() => handleSocialLogin("apple")}
            />
          </View>

          {/* Space between form and bottom link */}
          <View style={tw`flex-4`} />

          {/* Bottom Link */}
          <TouchableOpacity
            style={tw`mt-6 mb-11`}
            onPress={() => navigation.replace("SignUp")}
          >
            <ArabicText style={tw`text-center font-medium`}>
              {strings.auth.login.noAccount}{" "}
              <ArabicText style={tw`font-bold`}>
                {strings.auth.login.createAccount}
              </ArabicText>
            </ArabicText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default LoginScreen;
