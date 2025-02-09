import React from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Modal,
  ScrollView,
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
  const [showYearPicker, setShowYearPicker] = React.useState(false);
  const slideAnim = React.useRef(new Animated.Value(0)).current;
  const scrollViewRef = React.useRef<ScrollView>(null);

  // Generate years array (from 1900 to current year)
  const years = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 1900;
    const length = currentYear - startYear + 1;
    return Array.from({ length }, (_, i) => startYear + i).reverse();
  }, []);

  React.useEffect(() => {
    if (showYearPicker) {
      // Wait for modal animation to complete
      setTimeout(() => {
        const currentYear = currentMonth.getFullYear();
        const yearIndex = years.findIndex((year) => year === currentYear);
        if (yearIndex !== -1 && scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            y: yearIndex * 56, // 56 = height of each year item (py-4 = 32px + extra space)
            animated: false,
          });
        }
      }, 100);
    }
  }, [showYearPicker]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days: (number | null)[] = [];

    // Add empty days for padding at the start
    for (let i = 0; i < firstDayOfMonth; i++) {
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

  const handleYearSelect = (year: number) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(year);
    setCurrentMonth(newDate);
    setShowYearPicker(false);
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
    return dayIndex === 6 || dayIndex === 0; // Saturday (6) or Sunday (0)
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
        tw`pt-6 px-4.5 h-83`,
        withBackground && tw`bg-white rounded-[10px]`,
        style,
      ]}
    >
      {/* Month Navigation */}
      <View style={tw`flex-row items-center justify-between`}>
        <View style={tw`w-6 h-6`}>
          <Pressable
            onPress={() => handleMonthChange(-1)}
            style={({ pressed }) => [
              tw`absolute -top-3 -left-3 -right-3 -bottom-3 rounded-full justify-center items-center`,
              pressed && tw`bg-black/5`,
            ]}
          >
            <Feather name='chevron-left' size={24} color='#000' />
          </Pressable>
        </View>

        <Pressable
          onPress={() => setShowYearPicker(true)}
          style={({ pressed }) => [
            tw`items-center px-4 py-2 rounded-xl`,
            pressed && tw`bg-black/5`,
          ]}
        >
          <ArabicText style={tw`text-base font-medium`}>
            {`${
              MONTHS_AR[currentMonth.getMonth()]
            } ${currentMonth.getFullYear()}`}
          </ArabicText>
        </Pressable>

        <View style={tw`w-6 h-6`}>
          <Pressable
            onPress={() => handleMonthChange(1)}
            style={({ pressed }) => [
              tw`absolute -top-3 -left-3 -right-3 -bottom-3 rounded-full justify-center items-center`,
              pressed && tw`bg-black/5`,
            ]}
          >
            <Feather name='chevron-right' size={24} color='#000' />
          </Pressable>
        </View>
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

      {/* Year Picker Modal */}
      <Modal
        visible={showYearPicker}
        transparent
        animationType='fade'
        onRequestClose={() => setShowYearPicker(false)}
      >
        <View style={tw`flex-1 bg-black/50 justify-center items-center px-6`}>
          <Pressable
            style={tw`absolute inset-0`}
            onPress={() => setShowYearPicker(false)}
          />
          <View
            style={tw`bg-white rounded-3xl w-full max-w-45 overflow-hidden`}
          >
            <ScrollView
              ref={scrollViewRef}
              style={tw`h-72`}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={tw`py-2`}
            >
              {years.map((year) => (
                <Pressable
                  key={year}
                  onPress={() => handleYearSelect(year)}
                  style={({ pressed }) => [
                    tw`py-4 px-6`,
                    year === currentMonth.getFullYear() && {
                      backgroundColor: `${COLORS.primary.purple}1A`, // 10% opacity
                    },
                    pressed && tw`bg-black/5`,
                  ]}
                >
                  <ArabicText
                    style={
                      {
                        ...tw`text-base text-center`,
                        color:
                          year === currentMonth.getFullYear()
                            ? COLORS.primary.purple
                            : "#000",
                        fontWeight:
                          year === currentMonth.getFullYear()
                            ? "bold"
                            : "normal",
                      } as TextStyle
                    }
                  >
                    {year}
                  </ArabicText>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Calendar;
