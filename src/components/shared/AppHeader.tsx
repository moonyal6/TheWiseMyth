import React from "react";
import { View } from "react-native";
import tw from "../../utils/tailwind";
import ArabicText from "./ArabicText";

interface AppHeaderProps {
  title: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title }) => {
  return (
    <View style={tw`bg-white rounded-b-4xl pt-6 pb-3.5`}>
      <View style={tw`px-8`}>
        <ArabicText style={tw`text-xl font-bold text-black text-center`}>
          {title}
        </ArabicText>
      </View>
    </View>
  );
};

export default AppHeader;
