import React from "react";
import { View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import tw from "../../../utils/tailwind";
import ArabicText from "../../../components/shared/ArabicText";

interface SettingItemProps {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  iconBackground?: string;
  hideLeftIcon?: boolean;
  onPress: () => void;
  leftIcon?: keyof typeof Feather.glyphMap;
  leftElement?: React.ReactNode;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  label,
  onPress,
  iconBackground = "#007AFF",
  leftIcon,
  hideLeftIcon = false,
  leftElement,
}) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      tw`flex-row items-center justify-between py-2 px-4`,
      pressed && { opacity: 0.7 },
    ]}
  >
    <View style={tw`flex-row items-center`}>
      <View style={tw`flex-row justify-start items-center`}>
        {!hideLeftIcon && (
          <View style={tw`w-9 justify-start`}>
            {leftIcon && <Feather name={leftIcon} size={24} color='#9491AE' />}
          </View>
        )}
        {leftElement}
      </View>
    </View>
    <View style={tw`flex-row items-center`}>
      <ArabicText style={tw`text-base font-medium mr-4`}>{label}</ArabicText>
      <View
        style={[
          tw`w-8 h-8 rounded-[6.5px] items-center justify-center`,
          { backgroundColor: iconBackground },
        ]}
      >
        <Feather name={icon} size={20} color='white' />
      </View>
    </View>
  </Pressable>
);

export default SettingItem;
