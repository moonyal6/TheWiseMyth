import React from "react";
import { Text, TextStyle, TextProps } from "react-native";
import tw from "../../utils/tailwind";

interface ArabicTextProps extends TextProps {
  style?: TextStyle;
  variant?: "title" | "body" | "link";
}

const ArabicText: React.FC<ArabicTextProps> = ({
  children,
  style,
  variant = "body",
  ...props
}) => {
  const variantStyles = {
    title: tw`text-3xl font-bold`,
    body: tw`text-base`,
    link: tw`text-base`,
  };

  return (
    <Text
      style={[tw`text-black opacity-80`, variantStyles[variant], style]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default ArabicText;
