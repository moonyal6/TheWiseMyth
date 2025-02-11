import React from "react";
import { View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import tw from "../utils/tailwind";
import ArabicText from "../components/shared/ArabicText";
import Card from "../components/shared/Card";
import GradientBackground from "../components/shared/GradientBackground";
import AppHeader from "../components/shared/AppHeader";
import { LinearGradient } from "expo-linear-gradient";
import { subscriptionImage, infinityIcon } from "../constants/icons";

const SubscriptionScreen = () => {
  const navigation = useNavigation();

  const handleSubscribe = () => {
    // Handle subscription logic
  };

  return (
    <GradientBackground hideTopBlob>
      <SafeAreaView style={tw`flex-1`}>
        <View style={tw`bg-white rounded-b-[10px] justify-end pb-4 pt-10 `}>
          <View style={tw`items-center px-8`}>
            <View style={tw`w-6`} />
            <ArabicText style={tw`text-xl font-bold text-black`}>
              الاشتراك
            </ArabicText>
          </View>
        </View>

        {/* Main Content */}
        <View style={tw`flex-1 px-8 mt-6`}>
          {/* Subscription Image */}
          <View style={tw`items-center mb-6`}>
            <SvgXml xml={subscriptionImage} width={191} height={191} />
          </View>

          {/* Title & Description */}
          <View style={tw`items-center mb-7`}>
            <ArabicText
              style={tw`text-[2rem] leading-[2.4rem] font-bold mb-1.5`}
            >
              الاشتراك سنوي
            </ArabicText>
            <ArabicText
              style={tw`text-sm text-[#9491AE] text-center leading-6`}
            >
              سوف تحصل على كافة المميزات والتحديثات على مدار{"\n"}العام وتحصل
              على كافة التحديثات
            </ArabicText>
          </View>

          {/* Subscription Options */}
          <View style={tw`flex-row justify-between items-end px-4.5`}>
            {/* Monthly Package */}
            <View style={tw`items-center opacity-50 pb-5.5`}>
              <ArabicText style={tw`text-[2.5rem] font-bold leading-[2.4rem]`}>
                1
              </ArabicText>
              <ArabicText style={tw`text-base font-medium`}>شهري</ArabicText>

              <ArabicText
                style={tw`text-2xl font-extrabold text-[#2C2287] mt-6`}
              >
                5 $
              </ArabicText>
            </View>

            {/* Yearly Package */}
            <View style={tw`bg-white rounded-[14px] px-8.5 pb-4.5 pt-16`}>
              <View
                style={tw`h-10 bg-[#412787] absolute top-0 left-0 right-0 items-center justify-center rounded-t-[14px]`}
              >
                <ArabicText style={tw`text-white font-medium`}>
                  الأكثر مبيعاً
                </ArabicText>
              </View>
              <View style={tw`items-center`}>
                <ArabicText
                  style={tw`text-[2.5rem] font-bold leading-[2.4rem]`}
                >
                  12
                </ArabicText>
                <ArabicText style={tw`text-base font-medium`}>سنوي</ArabicText>

                <ArabicText
                  style={tw`text-2xl font-extrabold text-[#2C2287] mt-3`}
                >
                  30 $
                </ArabicText>
              </View>
            </View>

            {/* Lifetime Package */}
            <View style={tw`items-center opacity-50 pb-5.5`}>
              <View style={tw` h-[2.5rem] items-center justify-end pb-1`}>
                <SvgXml xml={infinityIcon} width={40} height={40} />
              </View>
              <ArabicText style={tw`text-base font-medium`}>
                مدة الحياة
              </ArabicText>
              <ArabicText
                style={tw`text-2xl font-extrabold text-[#2C2287] mt-6`}
              >
                60 $
              </ArabicText>
            </View>
          </View>

          {/* Buttons */}
          <View style={tw`mt-auto mb-8`}>
            {/* Subscribe Button */}
            <Pressable
              onPress={handleSubscribe}
              style={({ pressed }) => [
                tw`w-full h-14 rounded-xl justify-center items-center mb-2`,
                { backgroundColor: "#2C2287" },
                pressed && { opacity: 0.8 },
              ]}
            >
              <ArabicText style={tw`text-white font-bold text-lg`}>
                اشترك الآن
              </ArabicText>
            </Pressable>

            {/* Back Button */}
            <Pressable
              onPress={() => navigation.goBack()}
              style={({ pressed }) => [
                tw`w-full h-14 rounded-xl justify-center items-center border-2`,
                { borderColor: "#2C2287" },
                pressed && { opacity: 0.8 },
              ]}
            >
              <ArabicText style={tw.style(`font-bold text-lg`, { color: "#2C2287" })}>
                رجوع
              </ArabicText>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default SubscriptionScreen;
