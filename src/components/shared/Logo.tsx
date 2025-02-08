import React from "react";
import { Text, View, StyleSheet, Platform, ViewStyle } from "react-native";
import tw from "../../utils/tailwind";
import { COLORS } from "../../constants/theme";

type LogoProps = {
  containerStyle?: ViewStyle;
};

const Logo: React.FC<LogoProps> = ({ containerStyle }) => {
  return (
    <View style={[tw`items-center`, containerStyle]}>
      <Text style={[tw`text-6xl`, styles.logoText]}>ASTRO</Text>
      <Text style={[tw`text-6xl`, styles.logoText]}>FUTURE</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoText: {
    color: COLORS.primary.magenta,
    fontWeight: Platform.select({ ios: "800", android: "bold" }),
    letterSpacing: 2,
  },
});

export default Logo;
