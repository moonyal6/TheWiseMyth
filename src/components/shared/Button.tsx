import React from "react";
import { Pressable, ViewStyle } from "react-native";
import tw from "../../utils/tailwind";
import ArabicText from "./ArabicText";

interface ButtonProps {
  onPress: () => void;
  text: string;
  style?: ViewStyle;
  textStyle?: ViewStyle;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  text,
  style,
  textStyle,
  disabled = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        tw`w-full h-14 rounded-xl justify-center items-center bg-[#2C2287]`,
        disabled && tw`opacity-50`,
        pressed && !disabled && { opacity: 0.8 },
        style,
      ]}
    >
      <ArabicText style={[tw`text-white font-bold text-lg`, textStyle]}>
        {text}
      </ArabicText>
    </Pressable>
  );
};

export default Button;
