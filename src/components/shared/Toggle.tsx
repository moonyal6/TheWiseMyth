import React from "react";
import { Pressable, Animated, View } from "react-native";
import tw from "../../utils/tailwind";

interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ value, onValueChange }) => {
  const translateX = React.useRef(new Animated.Value(value ? 20 : 0)).current;

  React.useEffect(() => {
    Animated.spring(translateX, {
      toValue: value ? 15.5 : 0,
      useNativeDriver: true,
      bounciness: 4,
    }).start();
  }, [value]);

  return (
    <Pressable
      onPress={() => onValueChange(!value)}
      style={[
        tw`w-9 h-5 rounded-full justify-center px-0.5`,
        { backgroundColor: value ? "#2C2287" : "#E5E7EB" },
      ]}
    >
      <Animated.View
        style={[
          tw`w-4 h-4 rounded-full bg-white shadow-sm`,
          {
            transform: [{ translateX }],
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 2,
          },
        ]}
      />
    </Pressable>
  );
};

export default Toggle;
