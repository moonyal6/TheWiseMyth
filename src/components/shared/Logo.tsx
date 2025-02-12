import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../../utils/tailwind";
import { astroFutrueLogo } from "../../constants/icons";

type LogoProps = {
  containerStyle?: ViewStyle;
};

const Logo: React.FC<LogoProps> = ({ containerStyle }) => {
  return (
    <View style={[tw`items-center`, containerStyle]}>
      <SvgXml xml={astroFutrueLogo} width={210} height={127} />
    </View>
  );
};

export default Logo;
