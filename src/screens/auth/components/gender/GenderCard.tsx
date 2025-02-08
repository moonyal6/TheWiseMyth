import React from "react";
import { Pressable, Animated, View } from "react-native";
import { COLORS } from "../../../../constants/theme";
import tw from "../../../../utils/tailwind";
import ArabicText from "../../../../components/shared/ArabicText";
import strings from "../../../../localization";
import GenderImage from "./GenderImage";

type Gender = "male" | "female" | null;

interface GenderCardProps {
  gender: Gender;
  isSelected: boolean;
  onSelect: (gender: Gender) => void;
}

const GenderCard: React.FC<GenderCardProps> = ({
  gender,
  isSelected,
  onSelect,
}) => {
  const scale = React.useRef(new Animated.Value(1)).current;
  const borderAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: isSelected ? 1.02 : 1,
        friction: 8,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.timing(borderAnim, {
        toValue: isSelected ? 1 : 0,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isSelected]);

  const borderWidth = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View
      style={[
        tw`w-full flex-1 h-45 rounded-[10px] bg-white overflow-hidden`,
        {
          borderWidth,
          borderColor: COLORS.primary.purple,
        },
      ]}
    >
      <Pressable
        onPress={() => onSelect(gender)}
        style={({ pressed }) => [
          tw`w-full h-full rounded-[10px] justify-center items-center`,
          pressed && { opacity: 0.7 },
        ]}
      >
        <Animated.View
          style={[
            tw`items-center`,
            {
              transform: [{ scale }],
            },
          ]}
        >
          <GenderImage gender={gender} isSelected={isSelected} />
          <ArabicText
            style={tw`text-lg font-medium mt-2 text-black opacity-80`}
          >
            {gender === "male"
              ? strings.auth.steps.gender.male
              : strings.auth.steps.gender.female}
          </ArabicText>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

export default GenderCard;
