import React from "react";
import { View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import tw from "../../../utils/tailwind";
import ArabicText from "../../../components/shared/ArabicText";
import { GRADIENT_COLORS, GRADIENT_START, GRADIENT_END } from "../constants";

interface HeaderProfileProps {
  name: string;
  date: string;
}

const HeaderProfile: React.FC<HeaderProfileProps> = ({ name, date }) => {
  return (
    <View style={tw`flex-row items-center`}>
      <View style={tw`items-end mr-3`}>
        <ArabicText style={tw`text-base font-bold`}>{name}</ArabicText>
        <ArabicText style={tw`text-xs text-[#9491AE]`}>{date}</ArabicText>
        <ArabicText style={tw`text-[0.625rem] text-[#BBC1CD]`}>
          لندن-بريطانيا
        </ArabicText>
      </View>
      <View style={tw`relative`}>
        <LinearGradient
          colors={GRADIENT_COLORS}
          start={GRADIENT_START}
          end={GRADIENT_END}
          style={tw`w-13 h-13 rounded-full overflow-hidden`}
        />
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2L5jgOwMoZrw62HmxIVIXZTXKI6Pkg7QPCQ&s",
          }}
          style={[
            tw`absolute rounded-full`,
            {
              top: 2,
              left: 2,
              right: 2,
              bottom: 2,
            },
          ]}
          resizeMode='cover'
        />
      </View>
    </View>
  );
};

export default HeaderProfile;
