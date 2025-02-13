import React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import tw from "../../utils/tailwind";
import ArabicText from "./ArabicText";
import { Feather } from "@expo/vector-icons";

interface AppHeaderProps {
  title: string;
  onBackPress?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title, onBackPress }) => {
  return (
    <View style={tw`bg-white rounded-b-[15px] justify-end pb-4 pt-14`}>
      <View style={tw`flex-row items-center justify-between px-8`}>
        <View style={tw`w-10`} />

        <ArabicText style={tw`text-xl font-bold text-black`}>{title}</ArabicText>
        <TouchableOpacity onPress={onBackPress} style={tw`p-2`}>
          <Feather name='chevron-right' size={24} color='black' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppHeader;
