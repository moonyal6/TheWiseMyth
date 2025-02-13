import React from "react";
import {
  View,
  Animated,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "../../../../components/shared/GradientBackground";
import ArabicText from "../../../../components/shared/ArabicText";
import tw from "../../../../utils/tailwind";

interface AuthStepContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
  showWarningText?: boolean;
  contentContainerStyle?: ViewStyle;
}

const AuthStepContent: React.FC<AuthStepContentProps> = ({
  children,
  showWarningText = true,
  contentContainerStyle,
  style,
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={tw`flex-1`}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <Animated.View
        style={[
          tw`flex-1`,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
        contentContainerStyle,
        style,
      ]}
    >
      {/* Warning Text */}
      {showWarningText && (
        <View style={tw`py-6 px-8`}>
          <ArabicText style={tw`text-center text-sm leading-5 opacity-80`}>
            يرجى ادخال معلومات صحيحة وموثقة عند ادخالك المعلومات تحفظ النتائج
            ولا تظهر معلومات صحيحة
          </ArabicText>
        </View>
      )}

      {/* Main Content */}
      <View style={tw`flex-1 justify-between px-8`}>{children}</View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default AuthStepContent;
