import React from "react";
import { View, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthNavigator";
import tw from "../../utils/tailwind";
import GradientBackground from "../../components/shared/GradientBackground";
import Logo from "../../components/shared/Logo";
import ArabicText from "../../components/shared/ArabicText";
import SocialButtons from "../../components/shared/SocialButtons";
import AuthButton from "./components/AuthButton";
import { SafeAreaView } from "react-native-safe-area-context";
import strings, {
  changeLanguage,
  getCurrentLanguage,
} from "../../localization";

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList>;
};

const WelcomeScreen = ({ navigation }: Props) => {
  const handleSocialLogin = (provider: "email" | "google" | "apple") => {
    // Handle social login here
    console.log(`Login with ${provider}`);
  };

  const toggleLanguage = () => {
    const newLang = getCurrentLanguage() === "ar" ? "en" : "ar";
    changeLanguage(newLang);
    // Force re-render
    navigation.replace("Welcome");
  };

  return (
    <GradientBackground>
      <SafeAreaView style={tw`flex-1`}>
        <View style={tw`flex-1 items-center`}>
          {/* Language Switcher */}
          <TouchableOpacity
            style={tw`absolute top-4 right-4 bg-white rounded-lg px-4 py-2 z-50`}
            onPress={toggleLanguage}
          >
            <ArabicText>
              {getCurrentLanguage() === "ar" ? "English" : "عربي"}
            </ArabicText>
          </TouchableOpacity>

          {/* Flex space before content */}
          <View style={tw`flex-4`} />

          {/* Logo */}
          <Logo />

          {/* Space between logo and text */}
          <View style={tw`flex-3`} />

          {/* Text Content */}
          <View style={tw`w-full px-8`}>
            <ArabicText variant='title' style={tw`text-center mb-4`}>
              {strings.auth.welcome.explore}
            </ArabicText>
            <ArabicText style={tw`text-center leading-7`}>
              {strings.auth.welcome.description}
            </ArabicText>
          </View>

          {/* Space between text and buttons */}
          <View style={tw`flex-2`} />

          {/* Bottom Content */}
          <View style={tw`w-full px-8`}>
            <View style={tw`mb-4`}>
              <AuthButton
                title={strings.auth.welcome.login}
                onPress={() => navigation.navigate("Login")}
              />
              <View style={tw`h-3`} />
              <AuthButton
                title={strings.auth.welcome.signup}
                variant='outlined'
                onPress={() => navigation.navigate("SignUp")}
              />
            </View>
            <SocialButtons
              containerStyle={tw`mb-6`}
              onEmailPress={() => handleSocialLogin("email")}
              onGooglePress={() => handleSocialLogin("google")}
              onApplePress={() => handleSocialLogin("apple")}
            />
          </View>

          {/* Flex space after content */}
          <View style={tw`flex-1`} />
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default WelcomeScreen;
