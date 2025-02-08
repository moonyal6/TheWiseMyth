import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import tw from "../../../utils/tailwind";

type SocialLoginButtonsProps = {
  onGooglePress?: () => void;
  onApplePress?: () => void;
  onMicrosoftPress?: () => void;
};

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  onGooglePress,
  onApplePress,
  onMicrosoftPress,
}) => {
  return (
    <View style={tw`flex-row justify-center space-x-4`}>
      <TouchableOpacity
        style={[tw`bg-white rounded-lg`, styles.button]}
        onPress={onMicrosoftPress}
      >
        {/* Microsoft Icon placeholder */}
      </TouchableOpacity>

      <TouchableOpacity
        style={[tw`bg-white rounded-lg`, styles.button]}
        onPress={onGooglePress}
      >
        {/* Google Icon placeholder */}
      </TouchableOpacity>

      <TouchableOpacity
        style={[tw`bg-white rounded-lg`, styles.button]}
        onPress={onApplePress}
      >
        {/* Apple Icon placeholder */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SocialLoginButtons;
