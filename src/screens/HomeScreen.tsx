import React, { useState } from "react";
import { View, Pressable, Dimensions, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import tw from "../utils/tailwind";
import ArabicText from "../components/shared/ArabicText";
import Card from "../components/shared/Card";
import GradientBackground from "../components/shared/GradientBackground";
import { premiumIcon } from "../constants/icons";
import HeaderProfile from "./home/components/HeaderProfile";
import CalendarDay from "./home/components/CalendarDay";
import QuickAction from "./home/components/QuickAction";
import {
  GRADIENT_COLORS,
  GRADIENT_START,
  GRADIENT_END,
  CALENDAR_DATA,
  QUICK_ACTIONS,
} from "./home/constants";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const HomeScreen = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <GradientBackground hideTopBlob hideBottomBlob>
      <SafeAreaView style={tw`flex-1`}>
        {/* Header Container */}
        <View style={tw`bg-white rounded-b-4xl pt-6 pb-3.5 px-8`}>
          {/* Top Row */}
          <View style={tw`flex-row items-center justify-between`}>
            {/* Logo with Premium Icon */}
            <Pressable onPress={() => navigation.navigate("Subscription")}>
              <LinearGradient
                colors={GRADIENT_COLORS}
                start={GRADIENT_START}
                end={GRADIENT_END}
                style={tw`w-13 h-13 rounded-full pb-1 pr-0.5 overflow-hidden justify-center items-center`}
              >
                <SvgXml xml={premiumIcon} width={30} height={30} />
              </LinearGradient>
            </Pressable>

            <HeaderProfile name='حسين' date='24 يناير 1990' />
          </View>

          {/* Calendar Section */}
          <View style={tw`flex-row justify-between mt-3`}>
            {CALENDAR_DATA.map((item) => (
              <Pressable
                key={item.date}
                style={tw`items-center`}
                onPress={() => navigation.navigate("DateSelection")}
              >
                <CalendarDay {...item} />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Main Content Area */}
        <View style={tw`flex-1 items-center justify-center`}>
          <Pressable onPress={() => setShowPopup(true)}>
            <View
              style={[
                tw`bg-[#f7f3f6] rounded-full`,
                {
                  width: SCREEN_WIDTH - 48,
                  height: SCREEN_WIDTH - 48,
                  maxWidth: 600,
                  maxHeight: 600,
                  shadowColor: "#0000007f",
                  shadowOffset: {
                    width: 0,
                    height: 12,
                  },
                  shadowOpacity: 0.08,
                  shadowRadius: 48,
                  elevation: 6,
                },
              ]}
            />
          </Pressable>
        </View>

        {/* Quick Actions */}
        <View
          style={[
            tw`flex-row justify-around pb-8 items-center self-center`,
            { width: SCREEN_WIDTH * 0.8, maxWidth: 500 },
          ]}
        >
          {QUICK_ACTIONS.map((action) => (
            <QuickAction
              key={action.id}
              {...action}
              onPress={() => console.log(`Pressed ${action.id}`)}
            />
          ))}
        </View>

        {/* Popup Modal */}
        <Modal
          visible={showPopup}
          transparent
          animationType='fade'
          onRequestClose={() => setShowPopup(false)}
        >
          <View style={tw`flex-1 bg-black/50 justify-center items-center px-6`}>
            <Pressable
              style={tw`absolute inset-0`}
              onPress={() => setShowPopup(false)}
            />
            <View style={tw`w-full max-w-md`}>
              <Card>
                <View style={tw`p-4 `}>
                  <View style={tw`flex-row items-center justify-center`}>
                    {/* <SvgXml xml={planet1} width={30} height={30} />
                    <SvgXml xml={polygon} width={30} height={30} />
                    <SvgXml xml={planet2} width={30} height={30} /> */}
                  </View>
                  <ArabicText
                    style={tw`text-2xl font-bold mt-3.5 mb-2 text-center`}
                  >
                    اسم الكوكب
                  </ArabicText>
                  <ArabicText style={tw`text-base font-medium text-center`}>
                    {`هناك حقيقة مثبتة منذ زمن طويل وهي ان المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص او شكل توضع الفقرات في الصفحة التي يقراها. ولذلك يتم استخدام طريقة لوريم ايبسوم لانها تعطي توزيعاً طبيعياً -الى حد ما- للاحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (اي الاحرف) وكانها نص مقروء.`}
                  </ArabicText>
                </View>
              </Card>
            </View>
      </View>
        </Modal>
    </SafeAreaView>
    </GradientBackground>
  );
};

export default HomeScreen;
