import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Svg, { Path, G } from "react-native-svg";
import tw from "../../utils/tailwind";
import strings from "../../localization";

const { width } = Dimensions.get("window");
const BUTTON_HEIGHT = 56; // Fixed height
const MIN_BUTTON_WIDTH = 44; // Minimum width
const MAX_GAP = 24; // Maximum gap between buttons
const CONTAINER_PADDING = 32; // Horizontal padding from screen edges (px-8)
const ICON_SIZE = 22;

const EmailIcon = () => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox='0 0 19 15'>
    <G>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13.9451 0C15.152 0 16.313 0.436471 17.1671 1.21965C18.0221 2.00118 18.5 3.05529 18.5 4.15882V10.6647C18.5 12.9624 16.457 14.8235 13.9451 14.8235H5.054C2.5421 14.8235 0.5 12.9624 0.5 10.6647V4.15882C0.5 1.86118 2.5331 0 5.054 0H13.9451ZM15.3771 5.38587L15.4491 5.31999C15.6642 5.08117 15.6642 4.73528 15.4392 4.49646C15.3141 4.37375 15.1422 4.29881 14.9631 4.28234C14.7741 4.27328 14.5941 4.33175 14.4582 4.44705L10.4001 7.41176C9.87814 7.80787 9.13024 7.80787 8.60014 7.41176L4.55014 4.44705C4.27024 4.25764 3.88324 4.28234 3.65014 4.5047C3.40714 4.72705 3.38014 5.08117 3.58624 5.32823L3.70414 5.43528L7.79914 8.35881C8.30314 8.72117 8.91424 8.91881 9.55414 8.91881C10.1922 8.91881 10.8141 8.72117 11.3172 8.35881L15.3771 5.38587Z'
        fill='black'
      />
    </G>
  </Svg>
);

const GoogleIcon = () => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox='0 0 19 19'>
    <G>
      <Path
        d='M18.6739 9.71046C18.6739 8.93159 18.612 8.36322 18.4782 7.7738H9.7724V11.2892H14.8825C14.7795 12.1629 14.2232 13.4786 12.9868 14.3626L12.9695 14.4803L15.7221 16.6588L15.9128 16.6783C17.6642 15.0258 18.6739 12.5944 18.6739 9.71046Z'
        fill='#4285F4'
      />
      <Path
        d='M9.77241 18.9729C12.2759 18.9729 14.3776 18.1308 15.9128 16.6783L12.9868 14.3627C12.2038 14.9205 11.1529 15.31 9.77241 15.31C7.32039 15.31 5.23927 13.6575 4.49741 11.3735L4.38867 11.383L1.52647 13.6459L1.48904 13.7522C3.01382 16.8467 6.14584 18.9729 9.77241 18.9729Z'
        fill='#34A853'
      />
      <Path
        d='M4.4974 11.3736C4.30165 10.7842 4.18836 10.1526 4.18836 9.50004C4.18836 8.84742 4.30165 8.21592 4.4871 7.62651L4.48191 7.50098L1.58385 5.20166L1.48903 5.24774C0.860597 6.53185 0.5 7.97386 0.5 9.50004C0.5 11.0262 0.860597 12.4682 1.48903 13.7523L4.4974 11.3736Z'
        fill='#FBBC05'
      />
      <Path
        d='M9.77242 3.68991C11.5135 3.68991 12.688 4.45826 13.3577 5.10036L15.9746 2.49004C14.3674 0.963864 12.2759 0.0270996 9.77242 0.0270996C6.14584 0.0270996 3.01382 2.15321 1.48904 5.24766L4.48711 7.62643C5.23927 5.34242 7.3204 3.68991 9.77242 3.68991Z'
        fill='#EB4335'
      />
    </G>
  </Svg>
);

// Calculate button size and gap based on screen width
const calculateLayout = () => {
  const availableWidth = width - CONTAINER_PADDING * 2;
  const idealGap = MAX_GAP;
  const buttonWidth = Math.max(
    MIN_BUTTON_WIDTH,
    (availableWidth - idealGap * 2) / 3,
  );
  const actualGap = Math.min(MAX_GAP, (availableWidth - buttonWidth * 3) / 2);

  return { buttonWidth, gap: actualGap };
};

type SocialButtonsProps = {
  containerStyle?: ViewStyle;
  showLabel?: boolean;
  labelStyle?: ViewStyle;
  onEmailPress?: () => void;
  onGooglePress?: () => void;
  onApplePress?: () => void;
};

const SocialButtons: React.FC<SocialButtonsProps> = ({
  containerStyle,
  showLabel = true,
  labelStyle,
  onEmailPress,
  onGooglePress,
  onApplePress,
}) => {
  const { buttonWidth, gap } = calculateLayout();

  return (
    <View style={containerStyle}>
      {showLabel && (
        <View style={tw`flex-row items-center justify-center mb-6`}>
          <View style={tw`flex-1 ml-2`}>
            <View style={[tw`h-[1px] bg-white opacity-20`]} />
          </View>
          <Text
            style={[
              tw`text-center font-medium text-base text-black opacity-80 mx-4`,
              labelStyle,
            ]}
          >
            {strings.auth.welcome.orSignUpWith}
          </Text>
          <View style={tw`flex-1 mr-2`}>
            <View style={[tw`h-[1px] bg-white opacity-20`]} />
          </View>
        </View>
      )}
      <View style={[tw`flex-row justify-center`, { gap }]}>
        <TouchableOpacity
          style={[styles.button, { width: buttonWidth }]}
          onPress={onEmailPress}
        >
          <EmailIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { width: buttonWidth }]}
          onPress={onGooglePress}
        >
          <GoogleIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { width: buttonWidth }]}
          onPress={onApplePress}
        >
          <AntDesign name='apple1' size={ICON_SIZE} color='#000' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: BUTTON_HEIGHT,
    backgroundColor: "white",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SocialButtons;
