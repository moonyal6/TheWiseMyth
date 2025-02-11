import React from "react";
import { Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SvgXml } from "react-native-svg";
import tw from "../../../utils/tailwind";

interface QuickActionProps {
  icon: string;
  isSelected: boolean;
  gradient: {
    colors: readonly [string, string];
    start: { x: number; y: number };
    end: { x: number; y: number };
  };
  onPress: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({
  icon,
  isSelected,
  gradient,
  onPress,
}) => {
  const containerSize = isSelected ? 78 : 50;
  const iconSize = containerSize * (isSelected ? 0.6 : 0.55); // Larger ratio when selected

  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={gradient.colors}
        start={gradient.start}
        end={gradient.end}
        style={[
          tw`rounded-full items-center justify-center`,
          {
            width: containerSize,
            height: containerSize,
          },
        ]}
      >
        <SvgXml xml={icon} width={iconSize} height={iconSize} />
      </LinearGradient>
    </Pressable>
  );
};

export default QuickAction;
