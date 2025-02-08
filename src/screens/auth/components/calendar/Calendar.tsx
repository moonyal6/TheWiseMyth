import React from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import tw from "../../../../utils/tailwind";
import { COLORS } from "../../../../constants/theme";
import ArabicText from "../../../../components/shared/ArabicText";

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  style?: ViewStyle;
  withBackground?: boolean;
}

const DAYS_AR = ["احد", "اثنين", "ثلاثاء", "اربعاء", "خميس", "جمعة", "سبت"];
const MONTHS_AR = [
  "يناير",
  "فبراير",
  "مارس",
  "ابريل",
  "مايو",
  "يونيو",
  "يوليو",
  "اغسطس",
  "سبتمبر",
  "اكتوبر",
  "نوفمبر",
  "ديسمبر",
];

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  style,
  withBackground = false,
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(
    selectedDate || new Date(),
  );
  const slideAnim = React.useRef(new Animated.Value(0)).current;

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days: (number | null)[] = [];

    // Add empty days for padding (RTL)
    for (let i = 6; i > firstDayOfMonth; i--) {
      days.push(null);
    }

    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const handleMonthChange = (increment: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + increment);

    // Slide animation
    const startValue = increment > 0 ? 100 : -100;
    slideAnim.setValue(startValue);

    Animated.spring(slideAnim, {
      toValue: 0,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
    }).start();

    setCurrentMonth(newMonth);
  };

  const isSelectedDay = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isWeekend = (dayIndex: number) => {
    return dayIndex === 5 || dayIndex === 6; // Friday (5) or Saturday (6)
  };

  const getColumnIndex = (index: number) => {
    return index % 7;
  };

  const handleDayPress = (day: number) => {
    const newDate = new Date(currentMonth);
    newDate.setDate(day);
    onDateSelect(newDate);
  };

  return (
    <View
      style={[
        tw`pt-9 px-4.5 h-83`,
        withBackground && tw`bg-white rounded-[10px]`,
        style,
      ]}
    >
      {/* Month Navigation */}
      <View style={tw`flex-row items-center justify-between mb-1`}>
        <Pressable
          onPress={() => handleMonthChange(1)}
          style={({ pressed }) => [
            tw`w-6 h-6 rounded-full justify-center items-center`,
            pressed && tw`bg-black/5`,
          ]}
        >
          <Feather name='chevron-left' size={24} color='#000' />
        </Pressable>

        <View style={tw`items-center`}>
          <ArabicText style={tw`text-base font-medium`}>
            {`${
              MONTHS_AR[currentMonth.getMonth()]
            } ${currentMonth.getFullYear()}`}
          </ArabicText>
        </View>

        <Pressable
          onPress={() => handleMonthChange(-1)}
          style={({ pressed }) => [
            tw`w-6 h-6 rounded-full justify-center items-center`,
            pressed && tw`bg-black/5`,
          ]}
        >
          <Feather name='chevron-right' size={24} color='#000' />
        </Pressable>
      </View>

      {/* Days Header */}
      <View style={tw`flex-row justify-between mb-2`}>
        {DAYS_AR.map((day, index) => (
          <View key={index} style={tw`flex-1 items-center`}>
            <ArabicText
              style={
                {
                  ...tw`text-sm font-medium py-2`,
                  color: isWeekend(index) ? COLORS.primary.coral : "#000",
                } as TextStyle
              }
            >
              {day}
            </ArabicText>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <Animated.View
        style={{
          transform: [{ translateX: slideAnim }],
        }}
      >
        <View style={tw`flex-row flex-wrap`}>
          {getDaysInMonth(currentMonth).map((day, index) => (
            <View key={index} style={tw`w-[14.28%] aspect-square p-0.5`}>
              {day !== null && (
                <Pressable
                  onPress={() => handleDayPress(day)}
                  style={({ pressed }) => [
                    tw`w-full h-full justify-center items-center rounded-2 h-8 w-9.5`,
                    isSelectedDay(day) && {
                      backgroundColor: COLORS.primary.purple,
                    },
                    isToday(day) &&
                      !isSelectedDay(day) &&
                      tw`border border-primary-purple`,
                    pressed && !isSelectedDay(day) && tw`bg-black/5`,
                  ]}
                >
                  <ArabicText
                    style={
                      {
                        fontSize: 14,
                        color: isWeekend(getColumnIndex(index))
                          ? "#9491AE"
                          : "#BBC1CD",
                        ...(isSelectedDay(day) && { color: "#fff" }),
                        ...(isToday(day) &&
                          !isSelectedDay(day) && {
                            color: COLORS.primary.purple,
                          }),
                      } as TextStyle
                    }
                  >
                    {day}
                  </ArabicText>
                </Pressable>
              )}
            </View>
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

export default Calendar;
