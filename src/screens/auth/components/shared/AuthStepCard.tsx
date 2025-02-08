import React from "react";
import { View, ViewStyle } from "react-native";
import tw from "../../../../utils/tailwind";

interface AuthStepCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  withBackground?: boolean;
}

const AuthStepCard: React.FC<AuthStepCardProps> = ({
  children,
  style,
  withBackground = true,
}) => {
  return (
    <View
      style={[
        tw`w-full flex-1 rounded-[10px] overflow-hidden`,
        withBackground && tw`bg-white/90`,
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default AuthStepCard;
