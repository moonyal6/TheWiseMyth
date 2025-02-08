import React from "react";
import { View, Animated } from "react-native";
import tw from "../../../../utils/tailwind";

const StepIndicator = () => {
  const inactiveStepStyle = tw`w-5 h-[4px] rounded-full bg-[#cfb0f0]`;
  const activeStepStyle = tw`w-5 h-[4px] rounded-full bg-primary-purple`;

  // Steps array (already in RTL order)
  const steps = [
    { active: false },
    { active: false },
    { active: false },
    { active: false },
  ];

  const animations = steps.map(() => React.useRef(new Animated.Value(0)).current);

  React.useEffect(() => {
    const sequence = Animated.stagger(
      100,
      // Reverse the animations array to make the stagger effect start from right
      [...animations].reverse().map((anim) =>
        Animated.spring(anim, {
          toValue: 1,
          friction: 8,
          tension: 100,
          useNativeDriver: true,
        })
      )
    );
    sequence.start();
  }, []);

  const AnimatedView = Animated.createAnimatedComponent(View);

  return (
    <View style={tw`flex-row justify-center gap-x-2 mb-8`}>
      {steps.map((step, index) => (
        <AnimatedView
          key={index}
          style={[
            step.active ? activeStepStyle : inactiveStepStyle,
            {
              transform: [
                {
                  scale: animations[index],
                },
                {
                  translateY: animations[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [10, 0],
                  }),
                },
              ],
              opacity: animations[index],
            },
          ]}
        />
      ))}
    </View>
  );
};

export default StepIndicator;
