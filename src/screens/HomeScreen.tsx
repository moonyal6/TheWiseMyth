import React, { useState, useRef, useMemo } from "react";
import {
  View,
  Pressable,
  Dimensions,
  Modal,
  SafeAreaView,
  Animated,
} from "react-native";
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
  generateDateRange,
  QUICK_ACTIONS,
} from "./home/constants";
import { planet1, planet2, polygon } from "../constants/icons";
import { Ionicons } from "@expo/vector-icons";
import CalendarStrip from "react-native-calendar-strip";
import type { Moment, Duration } from "moment";
import moment from "moment";
import type { IDayComponentProps } from "react-native-calendar-strip";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const CustomDay = ({
  date,
  selected,
  onPress,
}: {
  date: any;
  selected: boolean;
  onPress?: () => void;
}) => {
  // Convert the date to a string format that moment can parse
  const dateStr = date.toString();
  const momentDate = moment(dateStr, "ddd MMM DD YYYY");

  return (
    <Pressable onPress={onPress}>
      {selected ? (
        <LinearGradient
          colors={GRADIENT_COLORS}
          start={GRADIENT_START}
          end={GRADIENT_END}
          style={{
            borderRadius: 14,
            width: 42,
            height: 80,
            paddingBottom: 16,

            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 8,
          }}
        >
          <ArabicText style={tw`text-white font-medium text-xs mb-1`}>
            {momentDate.format("ddd").charAt(0)}
          </ArabicText>
          <ArabicText style={tw`text-white font-semibold text-base`}>
            {momentDate.date()}
          </ArabicText>
        </LinearGradient>
      ) : (
        <View
          style={{
            width: 42,
            height: 80,
            paddingBottom: 22,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 8,
          }}
        >
          <ArabicText style={tw`text-[#bcc1cd] font-medium text-xs mb-1`}>
            {momentDate.format("ddd").charAt(0)}
          </ArabicText>
          <ArabicText style={tw`text-[#2c2287] text-base font-semibold`}>
            {momentDate.date()}
          </ArabicText>
        </View>
      )}
    </Pressable>
  );
};

const HomeScreen = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedQuickAction, setSelectedQuickAction] =
    useState<string>("location");
  const [isSelectedDateVisible, setIsSelectedDateVisible] = useState(true);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { selectedDate, setSelectedDate } = useDateContext();
  const calendarRef = useRef<any>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const checkIfDateIsInView = (startDate: Moment) => {
    // Get the week before
    const start = startDate.clone().startOf("week").subtract(1, "week");
    // Get the end of the week after
    const end = startDate.clone().endOf("week").add(1, "week");
    const selectedMoment = moment(
      new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day),
    );

    const isVisible = selectedMoment.isBetween(start, end, "day", "[]");
    setIsSelectedDateVisible(isVisible);

    // Animate the button
    Animated.timing(fadeAnim, {
      toValue: isVisible ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleQuickAction = (actionId: string) => {
    setSelectedQuickAction(actionId);

    switch (actionId) {
      case "birth":
        // navigation.navigate("DateSelection");
        break;
      case "location":
        // setShowPopup(true);
        break;
      case "eclipse":
        // navigation.navigate("DailyHoroscope");
        break;
      case "eclipse-location":
        // navigation.navigate("TipsAndTricks");
        break;
    }
  };

  const handleDateSelect = (date: Moment) => {
    setSelectedDate({
      ...selectedDate,
      day: date.date(),
      month: date.month() + 1,
      year: date.year(),
    });
  };

  const scrollToSelectedDate = () => {
    if (calendarRef.current) {
      const date = moment(
        new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day),
      );
      calendarRef.current.updateWeekView(date);
    }
  };

  return (
    <GradientBackground hideTopBlob hideBottomBlob>
      <SafeAreaView style={tw`flex-1`}>
        {/* Header Container */}
        <View style={tw`bg-white rounded-b-4xl pt-12 pb-3.5 `}>
          {/* Top Row */}
          <View style={tw`flex-row items-center justify-between px-8`}>
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
          <View style={tw`mt-4 relative `}>
            <CalendarStrip
              ref={calendarRef}
              dayComponentHeight={80}
              style={tw`h-20`}
              calendarAnimation={{ type: "parallel", duration: 200 }}
              onWeekChanged={checkIfDateIsInView}
              daySelectionAnimation={{
                type: "border",
                duration: 200,
                borderWidth: 0,
                borderHighlightColor: "transparent",
              }}
              startingDate={moment(new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day)).subtract(3, 'days')}
              selectedDate={new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day)}
              dayComponent={(props) => {
                const dateStr = props.date.toString();
                const momentDate = moment(dateStr, "ddd MMM DD YYYY");
                return (
                  <CustomDay
                    date={props.date}
                    selected={
                      momentDate.date() === selectedDate.day &&
                      momentDate.month() + 1 === selectedDate.month &&
                      momentDate.year() === selectedDate.year
                    }
                    onPress={() => {
                      if (props.onDateSelected) {
                        handleDateSelect(momentDate);
                      }
                    }}
                  />
                );
              }}
              calendarHeaderStyle={tw`hidden`}
              styleWeekend={false}
              useIsoWeekday={false}
              scrollable
              onDateSelected={handleDateSelect}
              minDate={
                new Date(new Date().setFullYear(new Date().getFullYear() - 2))
              }
              maxDate={
                new Date(new Date().setFullYear(new Date().getFullYear() + 2))
              }
              iconContainer={tw`hidden`}
            />
          </View>
          <Animated.View
            style={{
              opacity: fadeAnim,
              position: "absolute",
              bottom: 0,
              right: "50%",
              // marginRight: -40,
              // center the transform  translateX
              transform: [{ translateX: 20 }],
            }}
          >
            <Pressable
              onPress={scrollToSelectedDate}
              style={tw`rounded-lg py-1 px-3 mb-0.5 bg-gray-100 `}
            >
              <Ionicons name='locate' size={12} color='#2C2287' />
            </Pressable>
          </Animated.View>
        </View>

        {/* Main Content Area */}
        <View style={tw`flex-1 items-center justify-center`}>
          <Pressable
            onPress={() => navigation.navigate("DateSelection")}
            style={tw`absolute top-3.5 right-3.5 p-1.5 rounded-full shadow-md shadow-black/40 bg-[#f7f3f6] border border-[#dadada73]`}
          >
            <Ionicons name='time-outline' size={28} color='black' />
          </Pressable>
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
