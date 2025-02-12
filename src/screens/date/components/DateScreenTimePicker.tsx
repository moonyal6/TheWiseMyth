import React from "react";
import { View, ViewStyle } from "react-native";
import tw from "../../../utils/tailwind";
import ArabicText from "../../../components/shared/ArabicText";
import InfiniteScroller from "../../auth/components/time/InfiniteScroller";

type TimeState = {
  hours: number;
  minutes: number;
  period: "AM" | "PM";
  year: number;
  month: number;
  day: number;
};

interface DateScreenTimePickerProps {
  selectedTime: TimeState;
  onTimeSelect: (time: TimeState) => void;
  style?: ViewStyle;
}

const ARABIC_MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_RANGE = 200; // 100 years in past, 100 years in future

const DateScreenTimePicker: React.FC<DateScreenTimePickerProps> = ({
  selectedTime,
  onTimeSelect,
  style,
}) => {
  // Generate arrays for time values
  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0"),
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );
  const periods = ["صباحاً", "مساءً"];

  // Generate arrays for date values
  const years = Array.from({ length: YEAR_RANGE }, (_, i) =>
    (CURRENT_YEAR + 100 - i).toString(),
  );
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  const handleHourChange = (hour: string) => {
    onTimeSelect({
      ...selectedTime,
      hours: parseInt(hour),
    });
  };

  const handleMinuteChange = (minute: string) => {
    onTimeSelect({
      ...selectedTime,
      minutes: parseInt(minute),
    });
  };

  const handlePeriodChange = (period: string) => {
    onTimeSelect({
      ...selectedTime,
      period: period === "صباحاً" ? "AM" : "PM",
    });
  };

  const handleYearChange = (year: string) => {
    onTimeSelect({
      ...selectedTime,
      year: parseInt(year),
    });
  };

  const handleMonthChange = (month: string) => {
    const monthIndex = ARABIC_MONTHS.indexOf(month) + 1;
    onTimeSelect({
      ...selectedTime,
      month: monthIndex,
    });
  };

  const handleDayChange = (day: string) => {
    onTimeSelect({
      ...selectedTime,
      day: parseInt(day),
    });
  };

  return (
    <View style={[tw`flex-1 justify-center items-center`, style]}>
      <View
        style={tw`flex-row items-center w-full justify-between px-2.5 relative`}
      >
        {/* Divider Lines */}
        <View
          style={tw`absolute left-0 right-0 top-[116px] h-[0.4px] bg-[#8B8B8B]`}
        />
        <View
          style={tw`absolute left-0 right-0 top-[174px] h-[0.4px] bg-[#8B8B8B]`}
        />

        {/* Time Section */}
        <View style={tw`flex-row items-center`}>
          {/* Period (AM/PM) */}
          <InfiniteScroller
            values={periods}
            selectedValue={selectedTime.period === "AM" ? "صباحاً" : "مساءً"}
            onValueChange={handlePeriodChange}
            size='small'
            width={14}
          />

          {/* Hours */}
          <InfiniteScroller
            values={hours}
            selectedValue={selectedTime.hours.toString().padStart(2, "0")}
            onValueChange={handleHourChange}
            size='small'
            width={8}
          />

          {/* Separator */}
          <ArabicText style={tw`text-2xl mx-0.5 text-black`}>:</ArabicText>

          {/* Minutes */}
          <InfiniteScroller
            values={minutes}
            selectedValue={selectedTime.minutes.toString().padStart(2, "0")}
            onValueChange={handleMinuteChange}
            size='small'
            width={8}
          />
        </View>

        {/* Date Section */}
        <View style={tw`flex-row items-center`}>
          {/* Year */}
          <InfiniteScroller
            values={years}
            selectedValue={selectedTime.year.toString()}
            onValueChange={handleYearChange}
            size='small'
            width={14}
          />

          {/* Month */}
          <InfiniteScroller
            values={ARABIC_MONTHS}
            selectedValue={ARABIC_MONTHS[selectedTime.month - 1]}
            onValueChange={handleMonthChange}
            size='small'
            width={16}
          />

          {/* Day */}
          <InfiniteScroller
            values={days}
            selectedValue={selectedTime.day.toString()}
            onValueChange={handleDayChange}
            size='small'
            width={8}
          />
        </View>
      </View>
    </View>
  );
};

export default DateScreenTimePicker;
