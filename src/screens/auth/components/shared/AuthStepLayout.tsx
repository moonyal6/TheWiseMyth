import React from "react";
import { View, Animated, Dimensions, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "../../../../components/shared/GradientBackground";
import AuthStepHeader from "./AuthStepHeader";
import ArabicText from "../../../../components/shared/ArabicText";
import tw from "../../../../utils/tailwind";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface AuthStepLayoutProps {
  children: React.ReactNode;
  title: string;
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  isInitialScreen?: boolean;
  contentContainerStyle?: ViewStyle;
  showWarningText?: boolean;
}

const AuthStepLayout: React.FC<AuthStepLayoutProps> = ({
  children,
  title,
  currentStep,
  totalSteps,
  onBack,
  isInitialScreen = false,
  contentContainerStyle,
  showWarningText = true,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <GradientBackground hideTopBlob>
      <SafeAreaView style={tw`flex-1`}>
        {/* Fixed Header */}
        <AuthStepHeader
          title={title}
          currentStep={currentStep}
          totalSteps={totalSteps -1}
          onBack={onBack}
          isInitialScreen={isInitialScreen}
        />

        {/* Animated Content */}
        <Animated.View
          style={[
            tw`flex-1 px-8`,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
            contentContainerStyle,
          ]}
        >
          {/* Warning Text */}
          {showWarningText && (
            <View style={tw`py-6 px-8`}>
              <ArabicText style={tw`text-center text-sm leading-5 opacity-80`}>
                يرجى ادخال معلومات صحيحة وموثقة عند ادخالك المعلومات تحفظ
                النتائج ولا تظهر معلومات صحيحة
              </ArabicText>
            </View>
          )}

          {/* Main Content */}
          <View style={tw`flex-1 justify-between`}>{children}</View>
        </Animated.View>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default AuthStepLayout;
