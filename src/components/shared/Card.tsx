import React from "react";
import { View, ViewStyle } from "react-native";
import tw from "../../utils/tailwind";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  withBackground?: boolean;
  withBorder?: boolean;
  withBackCard?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  withBackground = true,
  withBorder = false,
  withBackCard = true,
}) => {
  return (
    <View style={tw`relative`}>
      {/* Background Card */}
      {withBackCard && (
        <View
          style={[
            tw`absolute -top-4.5 h-1/2 left-4.5 right-4.5 flex-1 rounded-[28px] bg-[#FAF4FA]`,
            { opacity: 1 },
          ]}
        />
      )}

      {/* Main Card */}
      <View
        style={[
          tw`w-full rounded-[28px] overflow-hidden`,
          withBackground && tw`bg-white`,
          withBorder && tw`border border-gray-100`,
          style,
        ]}
      >
        {children}
      </View>
    </View>
  );
};

export default Card;
