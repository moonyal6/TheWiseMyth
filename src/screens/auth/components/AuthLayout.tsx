import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "../../../utils/tailwind";
import { COLORS } from "../../../constants/theme";
import GradientBackground from "../../../components/shared/GradientBackground";

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
  showSocial?: boolean;
  bottomLinkText?: string;
  onBottomLinkPress?: () => void;
  variant?: "welcome" | "form";
};

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  showSocial = true,
  bottomLinkText,
  onBottomLinkPress,
  variant = "form",
}) => {
  const columnStyle = [
    tw`flex-1 justify-start`,
    variant === "welcome" && tw`flex-3`,
  ];

  const contentStyle = [
    tw`flex-1`,
    variant === "welcome" ? tw`justify-end mb-4` : tw`justify-center`,
  ];

  return (
    <GradientBackground>
      <SafeAreaView style={tw`flex-1`}>
        <View style={tw`flex-1`}>
          {/* Welcome screen extra top space */}
          {variant === "welcome" && <View style={tw`flex-1`} />}

          {/* Main column */}
          <View style={columnStyle}>
            {/* 1. Logo Section */}
            <View style={tw`items-center mb-6`}>
              <Text style={[tw`text-6xl`, styles.logoText]}>ASTRO</Text>
              <Text style={[tw`text-6xl`, styles.logoText]}>FUTURE</Text>
            </View>

            {/* 2. Text Section */}
            <View style={tw`mb-8`}>
              <Text style={[tw`text-2xl text-center`, styles.arabicText]}>
                {title}
              </Text>
            </View>

            {/* 3. Content Section */}
            <View style={contentStyle}>
              {/* Main content (forms or welcome buttons) */}
              <View style={tw`px-8 mb-8`}>{children}</View>

              {/* Social buttons */}
              {showSocial && (
                <View style={tw`px-8 mb-6`}>
                  <Text style={[tw`text-center mb-4`, styles.arabicText]}>
                    أو قم بالتسجيل مع
                  </Text>
                  <View style={tw`flex-row justify-center space-x-4`}>
                    <View style={styles.socialButton} />
                    <View style={styles.socialButton} />
                    <View style={styles.socialButton} />
                  </View>
                </View>
              )}

              {/* 4. Bottom Link (only for form screens) */}
              {bottomLinkText && variant === "form" && (
                <View style={tw`px-8 mt-3`}>
                  <Text
                    style={[tw`text-center`, styles.arabicText]}
                    onPress={onBottomLinkPress}
                  >
                    {bottomLinkText}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  logoText: {
    color: COLORS.primary.magenta,
    fontWeight: Platform.select({ ios: "800", android: "bold" }),
    letterSpacing: 2,
  },
  arabicText: {
    color: "#000",
    opacity: 0.8,
    fontWeight: "500",
  },
  socialButton: {
    width: 48,
    height: 48,
    backgroundColor: "white",
    borderRadius: 12,
  },
});

export default AuthLayout;
