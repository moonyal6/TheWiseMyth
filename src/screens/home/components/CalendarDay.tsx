import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import tw from "../../../utils/tailwind";
import ArabicText from "../../../components/shared/ArabicText";
import { GRADIENT_COLORS, GRADIENT_START, GRADIENT_END } from "../constants";

interface CalendarDayProps {
  day: string;
  date: number;
  isSelected: boolean;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ day, date, isSelected }) => {
  if (isSelected) {
    return (
      <LinearGradient
        colors={GRADIENT_COLORS}
        start={GRADIENT_START}
        end={GRADIENT_END}
        style={tw`items-center pt-2.5 pb-6.5 px-3 rounded-[14px]`}
      >
        <ArabicText style={tw`text-xs mb-1 font-medium text-white`}>
          {day}
        </ArabicText>
        <ArabicText style={tw`text-sm font-semibold text-white`}>
          {date}
        </ArabicText>
      </LinearGradient>
    );
  }

  return (
    <View style={tw`items-center pt-2.5 pb-6.5`}>
      <ArabicText style={tw`text-xs mb-1 font-medium text-[#BCC1CD]`}>
        {day}
      </ArabicText>
      <ArabicText style={tw`text-sm font-semibold text-[#2C2287]`}>
        {date}
      </ArabicText>
    </View>
  );
};

export default CalendarDay;
