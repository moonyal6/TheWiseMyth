import React from "react";
import { View, ViewStyle } from "react-native";
import tw from "../../../../utils/tailwind";
import ArabicText from "../../../../components/shared/ArabicText";
import InfiniteScroller from "./InfiniteScroller";

type TimePickerProps = {
  selectedTime: {
    hours: number;
    minutes: number;
    seconds: number;
    period: "AM" | "PM";
  } | null;
  onTimeSelect: (time: {
    hours: number;
    minutes: number;
    seconds: number;
    period: "AM" | "PM";
  }) => void;
  style?: ViewStyle;
};

const TimePicker: React.FC<TimePickerProps> = ({
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
  const seconds = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );
  const periods = ["صباحاً", "مساءً"];

  const handleHourChange = (hour: string) => {
    onTimeSelect({
      hours: parseInt(hour),
      minutes: selectedTime?.minutes || 0,
      seconds: selectedTime?.seconds || 0,
      period: selectedTime?.period || "AM",
    });
  };

  const handleMinuteChange = (minute: string) => {
    onTimeSelect({
      hours: selectedTime?.hours || 1,
      minutes: parseInt(minute),
      seconds: selectedTime?.seconds || 0,
      period: selectedTime?.period || "AM",
    });
  };

  const handleSecondChange = (second: string) => {
    onTimeSelect({
      hours: selectedTime?.hours || 1,
      minutes: selectedTime?.minutes || 0,
      seconds: parseInt(second),
      period: selectedTime?.period || "AM",
    });
  };

  const handlePeriodChange = (period: string) => {
    onTimeSelect({
      hours: selectedTime?.hours || 1,
      minutes: selectedTime?.minutes || 0,
      seconds: selectedTime?.seconds || 0,
      period: period === "صباحاً" ? "AM" : "PM",
    });
  };

  return (
    <View style={[tw`flex-1 justify-center items-center`, style]}>
      <View style={tw`flex-row items-center justify-center px-0 relative`}>
        {/* Divider Lines */}
        <View
          style={tw`absolute left-0 right-0 top-[58px] h-[0.4px] bg-[#8B8B8B]`}
        />
        <View
          style={tw`absolute left-0 right-0 top-[116px] h-[0.4px] bg-[#8B8B8B]`}
        />

        {/* Period (AM/PM) */}
        <InfiniteScroller
          values={periods}
          selectedValue={selectedTime?.period === "AM" ? "صباحاً" : "مساءً"}
          onValueChange={handlePeriodChange}
          width={15.5}
        />

        {/* Separator */}
        <ArabicText style={tw`text-2xl ml-2.5 text-black`}>:</ArabicText>

        {/* Hours */}
        <InfiniteScroller
          values={hours}
          selectedValue={
            selectedTime?.hours?.toString().padStart(2, "0") || "01"
          }
          onValueChange={handleHourChange}
          width={10.5}
        />

        {/* Separator */}
        <ArabicText style={tw`text-2xl mx-2 text-black`}>:</ArabicText>

        {/* Minutes */}
        <InfiniteScroller
          style={tw`mr-6`}
          values={minutes}
          selectedValue={
            selectedTime?.minutes?.toString().padStart(2, "0") || "00"
          }
          onValueChange={handleMinuteChange}
          width={9.5}
        />

        {/* Seconds */}
        <InfiniteScroller
          values={seconds}
          selectedValue={
            selectedTime?.seconds?.toString().padStart(2, "0") || "00"
          }
          onValueChange={handleSecondChange}
          width={9.5}
        />
      </View>
    </View>
  );
};

export default TimePicker;
