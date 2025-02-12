import React from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import tw from "../utils/tailwind";
import AppHeader from "../components/shared/AppHeader";
import ArabicText from "../components/shared/ArabicText";
import GradientBackground from "../components/shared/GradientBackground";
const TipsAndTricksScreen = () => {
  return (
    <GradientBackground hideTopBlob>
      <SafeAreaView style={tw`flex-1`}>
        <View style={tw`bg-white rounded-b-[10px] justify-end pb-4 pt-10 `}>
          <View style={tw`items-center px-8`}>
            <View style={tw`w-6`} />
            <ArabicText style={tw`text-xl font-bold text-black`}>
              نصائح وحيل
            </ArabicText>

          </View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default TipsAndTricksScreen;
 