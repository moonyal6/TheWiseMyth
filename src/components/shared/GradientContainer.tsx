import React from "react";
import { ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface GradientContainerProps {
  children: React.ReactNode;
  colors?: [string, string];
  style?: ViewStyle;
}

const DEFAULT_COLORS = ["#D9259A", "#412787"] as const;
const DEFAULT_START = { x: 0.065, y: 0.085 };
const DEFAULT_END = { x: 0.935, y: 0.915 };

const GradientContainer: React.FC<GradientContainerProps> = ({
  children,
  colors = DEFAULT_COLORS,
  style,
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={DEFAULT_START}
      end={DEFAULT_END}
      style={style}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientContainer;
