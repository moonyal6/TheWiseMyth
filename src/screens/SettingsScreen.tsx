import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "../utils/tailwind";

const SettingsScreen = () => {
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1 items-center justify-center p-4`}>
        <Text style={tw`text-2xl font-bold text-primary-navy`}>Settings</Text>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
