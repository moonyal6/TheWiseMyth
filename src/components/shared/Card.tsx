import React from "react";
import { View, ViewStyle } from "react-native";
import tw from "../../utils/tailwind";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  withBackCard?: boolean;
  backCardHeight?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  withBackCard = true,
  backCardHeight = 18,
}) => {
  return (
    <View style={tw`relative mt-4.5`}>
      {/* Background Card */}
      {withBackCard && (
        <View
          style={[
            tw`absolute h-1/2 left-4.5 right-4.5 flex-1 rounded-[28px] bg-white/48`,
            { top: -backCardHeight },
          ]}
        />
      )}

      {/* Main Card */}
      <View
        style={[
          tw`w-full rounded-[28px] overflow-hidden bg-white`,
          style,
        ]}
      >
        {children}
      </View>
    </View>
  );
};

export default Card;
