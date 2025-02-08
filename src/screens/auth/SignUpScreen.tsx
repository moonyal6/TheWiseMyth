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

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList>;
};

const SignUpScreen = ({ navigation }: Props) => {
  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error state
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // Validation
  const validateForm = () => {
    let isValid = true;

    // Reset all errors
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Username validation
    if (!username.trim()) {
      setUsernameError(strings.auth.signup.username.required);
      isValid = false;
    } else if (username.trim().length < 3) {
      setUsernameError(strings.auth.signup.username.tooShort);
      isValid = false;
    }

    // Email validation
    if (!email.trim()) {
      setEmailError(strings.auth.signup.email.required);
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(strings.auth.signup.email.invalid);
      isValid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError(strings.auth.signup.password.required);
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError(strings.auth.signup.password.tooShort);
      isValid = false;
    }

    // Confirm password validation
    if (!confirmPassword) {
      setConfirmPasswordError(strings.auth.signup.confirmPassword.required);
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(strings.auth.signup.confirmPassword.mismatch);
      isValid = false;
    }

    return isValid;
  };

  // Handle sign up
  const handleSignUp = async () => {
    // TODO: Remove this bypass in production
    navigation.replace("AccountSetup");
    return;
  };

  // Handle social sign up
  const handleSocialSignUp = (provider: "email" | "google" | "apple") => {
    console.log(`Social sign up with ${provider}`);
  };

  return (
    <GradientBackground>
      <SafeAreaView style={tw`flex-1`}>
        <View style={tw`flex-1 my-11`}>
          {/* Logo */}
          <Logo />

          {/* Space between logo and title */}
          <View style={tw`flex-1`} />

          {/* Title */}
          <View>
            <ArabicText variant='title' style={tw`text-center`}>
              {strings.auth.signup.title}
            </ArabicText>
          </View>

          {/* Space between title and form */}
          <View style={tw`flex-1`} />

          {/* Form */}
          <View style={tw`px-8`}>
            <View style={tw`gap-y-6`}>
              <AuthInput
                label={strings.auth.signup.username.label}
                placeholder={strings.auth.signup.username.placeholder}
                autoCapitalize='none'
                value={username}
                onChangeText={setUsername}
                error={usernameError}
              />

              <AuthInput
                label={strings.auth.signup.email.label}
                placeholder={strings.auth.signup.email.placeholder}
                keyboardType='email-address'
                autoCapitalize='none'
                value={email}
                onChangeText={setEmail}
                error={emailError}
              />

              <AuthInput
                label={strings.auth.signup.password.label}
                placeholder={strings.auth.signup.password.placeholder}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                error={passwordError}
              />

              <AuthInput
                label={strings.auth.signup.confirmPassword.label}
                placeholder={strings.auth.signup.confirmPassword.placeholder}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                error={confirmPasswordError}
              />
            </View>

            <View style={tw`mt-8`}>
              <AuthButton
                title={strings.auth.signup.title}
                onPress={handleSignUp}
                loading={isLoading}
                disabled={isLoading}
              />
            </View>

            <SocialButtons
              containerStyle={tw`mt-6`}
              onEmailPress={() => handleSocialSignUp("email")}
              onGooglePress={() => handleSocialSignUp("google")}
              onApplePress={() => handleSocialSignUp("apple")}
            />
          </View>

          {/* Space between form and bottom link */}
          <View style={tw`flex-1`} />

          {/* Bottom Link */}
          <TouchableOpacity
            style={tw`mt-6`}
            onPress={() => navigation.replace("Login")}
          >
            <ArabicText style={tw`text-center`}>
              {strings.auth.signup.hasAccount}{" "}
              <ArabicText style={tw`font-bold`}>
                {strings.auth.signup.login}
              </ArabicText>
            </ArabicText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default SignUpScreen;
