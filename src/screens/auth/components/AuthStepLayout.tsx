import React from "react";
import { View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "../../../components/shared/GradientBackground";
import ArabicText from "../../../components/shared/ArabicText";
import AuthButton from "./AuthButton";
import tw from "../../../utils/tailwind";

interface AuthStepLayoutProps {
  children: React.ReactNode;
  step: string; // e.g., "4/1"
  title: string;
  onNext: () => void;
  isLoading?: boolean;
  buttonTitle?: string;
  contentContainerStyle?: ViewStyle;
  showWarning?: boolean;
}

const AuthStepLayout: React.FC<AuthStepLayoutProps> = ({
  children,
  step,
  title,
  onNext,
  isLoading = false,
  buttonTitle = "التالي",
  contentContainerStyle,
  showWarning = true,
}) => {
  return (
    <GradientBackground>
      <SafeAreaView style={tw`flex-1`}>
        <View style={tw`flex-1`}>
          {/* Header */}
          <View style={tw`flex-row items-center justify-between px-8 py-4`}>
            <View style={tw`w-8`} /> {/* Placeholder for back button */}
            <ArabicText style={tw`text-lg font-bold`}>{step}</ArabicText>
            <View style={tw`w-8`} /> {/* Balance the layout */}
          </View>

          {/* Title */}
          <View style={tw`px-8 mb-4`}>
            <ArabicText variant='title' style={tw`text-center`}>
              {title}
            </ArabicText>
          </View>

          {/* Warning Text */}
          {showWarning && (
            <View style={tw`px-8 mb-6`}>
              <ArabicText style={tw`text-center text-sm opacity-60`}>
                يرجى ادخال معلومات صحيحة وموثقة عند ادخالك المعلومات تحفظ
                النتائج ولا تظهر معلومات صحيحة
              </ArabicText>
            </View>
          )}

          {/* Main Content */}
          <View style={[tw`flex-1 px-8`, contentContainerStyle]}>
            {children}
          </View>

          {/* Bottom Button */}
          <View style={tw`px-8 mb-8`}>
            <AuthButton
              title={buttonTitle}
              onPress={onNext}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default AuthStepLayout;
