import React from "react";
import { View, Animated } from "react-native";
import tw from "../../../../utils/tailwind";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  isInitialScreen?: boolean;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  isInitialScreen = false,
}) => {
  const inactiveStepStyle = tw`w-5 h-[4px] rounded-full bg-[#cfb0f0]`;
  const activeStepStyle = tw`w-5 h-[4px] rounded-full bg-primary-purple`;

  // Create steps array based on total steps (in RTL order)
  const steps = Array(totalSteps)
    .fill(null)
    .map((_, index) => ({
      // Step is active if it's less than or equal to current step (in RTL)
      active: totalSteps - index <= currentStep,
    }));

  const animations = steps.map(
    () => React.useRef(new Animated.Value(isInitialScreen ? 0 : 1)).current,
  );

  const progressAnimation = React.useRef(
    new Animated.Value(currentStep),
  ).current;

  React.useEffect(() => {
    if (isInitialScreen) {
      // Initial stagger animation for the first screen, starting from right
      const sequence = Animated.stagger(
        100,
        animations.map((anim) =>
          Animated.spring(anim, {
            toValue: 1,
            friction: 8,
            tension: 100,
            useNativeDriver: true,
          }),
        ),
      );
      sequence.start();
    } else {
      // Smooth transition animation for step progression
      Animated.spring(progressAnimation, {
        toValue: currentStep,
        friction: 8,
        tension: 100,
        useNativeDriver: false,
      }).start();
    }
  }, [isInitialScreen, currentStep]);

  const AnimatedView = Animated.createAnimatedComponent(View);

  return (
    <View style={tw`flex-row justify-center gap-x-2 mb-8`}>
      {steps.map((step, index) => {
        const isActive = totalSteps - index <= currentStep;

        return (
          <AnimatedView
            key={index}
            style={[
              isActive ? activeStepStyle : inactiveStepStyle,
              isInitialScreen
                ? {
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
                  }
                : {
                    transform: [
                      {
                        scale: progressAnimation.interpolate({
                          inputRange: [
                            totalSteps - index - 1,
                            totalSteps - index,
                          ],
                          outputRange: [1, 1.1],
                          extrapolate: "clamp",
                        }),
                      },
                    ],
                  },
            ]}
          />
        );
      })}
    </View>
  );
};

export default StepIndicator;
