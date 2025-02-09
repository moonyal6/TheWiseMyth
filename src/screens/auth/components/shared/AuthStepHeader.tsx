import React from "react";
import { View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import tw from "../../../../utils/tailwind";
import ArabicText from "../../../../components/shared/ArabicText";
import StepIndicator from "./StepIndicator";

interface AuthStepHeaderProps {
  title: string;
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  isInitialScreen?: boolean;
}

const AuthStepHeader: React.FC<AuthStepHeaderProps> = ({
  title,
  currentStep,
  totalSteps,
  onBack,
  isInitialScreen = false,
}) => {
  return (
    <View
      style={[
        tw`bg-white/80 backdrop-blur-md`,
        { borderBottomLeftRadius: 15, borderBottomRightRadius: 15 },
      ]}
    >
      <View style={tw`flex-row items-center justify-between px-8 pt-10 pb-4`}>
        <View style={tw`w-6`} />
        <ArabicText style={tw`text-xl font-bold text-black`}>
          {`${title} ${currentStep}/${totalSteps}`}
        </ArabicText>
        <Pressable
          onPress={onBack}
          style={({ pressed }) => [
            tw`w-6 items-center`,
            pressed && { opacity: 0.7 },
          ]}
        >
          <Feather name='arrow-right' size={20} color='#1C1B1F' />
        </Pressable>
      </View>
      <StepIndicator
        currentStep={currentStep - 1}
        totalSteps={totalSteps}
        isInitialScreen={isInitialScreen}
      />
    </View>
  );
};

export default AuthStepHeader;
