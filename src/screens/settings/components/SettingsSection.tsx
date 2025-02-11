import React from "react";
import { View } from "react-native";
import tw from "../../../utils/tailwind";

interface SettingsSectionProps {
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ children }) => (
  <View style={tw`bg-white rounded-2xl mb-2.5 py-2.5 overflow-hidden`}>
    {children}
  </View>
);

export default SettingsSection;
