import React, { useState } from "react";
import { View, Pressable, Dimensions, Modal, SafeAreaView } from "react-native";
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
import { useDateContext } from "../contexts/DateContext";
import {
  GRADIENT_COLORS,
  GRADIENT_START,
  GRADIENT_END,
  getCalendarWeek,
  QUICK_ACTIONS,
} from "./home/constants";
import { planet1, planet2, polygon } from "../constants/icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const HomeScreen = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedQuickAction, setSelectedQuickAction] =
    useState<string>("location");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { selectedDate } = useDateContext();

  const handleQuickAction = (actionId: string) => {
    setSelectedQuickAction(actionId);

    switch (actionId) {
      case "birth":
        navigation.navigate("DateSelection");
        break;
      case "location":
        setShowPopup(true);
        break;
      case "eclipse":
        navigation.navigate("DailyHoroscope");
        break;
      case "eclipse-location":
        navigation.navigate("TipsAndTricks");
        break;
    }
  };

  // Generate calendar data based on selected date
  const calendarData = getCalendarWeek(
    new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day),
  );

  return (
    <GradientBackground hideTopBlob hideBottomBlob>
      <SafeAreaView style={tw`flex-1`}>
        {/* Header Container */}
        <View style={tw`bg-white rounded-b-4xl pt-12 pb-3.5 px-8`}>
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

            <HeaderProfile
              name='حسين'
              date={`${selectedDate.day} يناير ${selectedDate.year}`}
            />
          </View>

          {/* Calendar Section */}
          <Pressable
            onPress={() => navigation.navigate("DateSelection")}
            style={tw`flex-row justify-between mt-3`}
          >
            {calendarData.map((item) => (
              <View key={`${item.day}-${item.date}`} style={tw`items-center`}>
                <CalendarDay {...item} />
              </View>
            ))}
          </Pressable>
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
            tw`flex-row justify-center gap-4 pb-8 items-center self-center`,
            { width: SCREEN_WIDTH * 0.8, maxWidth: 500 },
          ]}
        >
          {QUICK_ACTIONS.map((action) => (
            <QuickAction
              key={action.id}
              {...action}
              isSelected={selectedQuickAction === action.id}
              onPress={() => handleQuickAction(action.id)}
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
          {/* make the background color 80% opacity  */}
          <View
            style={tw`flex-1 bg-[#2C2287]/80 justify-center items-center px-6`}
          >
            <Pressable
              style={tw`absolute inset-0`}
              onPress={() => setShowPopup(false)}
            />
            <View style={tw`w-full max-w-md`}>
              <Card style={tw`overflow-visible`} backCardHeight={32}>
                <View style={tw`p-4 pt-16 overflow-visable`}>
                  <View
                    style={tw`flex-row items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2 right-1/2 -top-10`}
                  >
                    <SvgXml xml={planet1} width={105} height={105} />
                    <View style={tw`mt-4`}>
                      <SvgXml xml={polygon} width={27} height={27} />
                    </View>
                    <SvgXml xml={planet2} width={105} height={105} />
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
