import React, { useEffect } from "react";
import { Pressable, Animated, View } from "react-native";
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

const BASE_SIZE = 50;
const SELECTED_SIZE = 78;
const SCALE_RATIO = SELECTED_SIZE / BASE_SIZE;
const EXTRA_SPACE = (SELECTED_SIZE - BASE_SIZE) / 2;

const QuickAction: React.FC<QuickActionProps> = ({
  icon,
  isSelected,
  gradient,
  onPress,
}) => {
  const sizeAnim = React.useRef(new Animated.Value(isSelected ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(sizeAnim, {
      toValue: isSelected ? 1 : 0,
      useNativeDriver: true,
      friction: 8,
      tension: 100,
    }).start();
  }, [isSelected]);

  return (
    <Pressable onPress={onPress} style={tw`flex-1 items-center`}>
      <View
        style={{
          width: SELECTED_SIZE,
          height: SELECTED_SIZE,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View
          style={[
            {
              transform: [
                {
                  scale: sizeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, SCALE_RATIO],
                  }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={gradient.colors}
            start={gradient.start}
            end={gradient.end}
            style={[
              tw`rounded-full items-center justify-center`,
              {
                width: BASE_SIZE,
                height: BASE_SIZE,
              },
            ]}
          >
            <Animated.View
              style={{
                transform: [
                  {
                    scale: sizeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.1],
                    }),
                  },
                ],
              }}
            >
              <SvgXml
                xml={icon}
                width={BASE_SIZE * 0.55}
                height={BASE_SIZE * 0.55}
              />
            </Animated.View>
          </LinearGradient>
        </Animated.View>
      </View>
    </Pressable>
  );
};

export default QuickAction;
