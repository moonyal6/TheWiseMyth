import React from "react";
import { View, ViewStyle } from "react-native";
import tw from "../../../../utils/tailwind";
import ArabicText from "../../../../components/shared/ArabicText";
import TimeScroller from "./TimeScroller";

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
  // Generate arrays for hours (1-12), minutes (00-59)
  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0"),
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
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

  const handlePeriodChange = (period: string) => {
    onTimeSelect({
      hours: selectedTime?.hours || 1,
      minutes: selectedTime?.minutes || 0,
      seconds: selectedTime?.seconds || 0,
      period: period === "صباحاً" ? "AM" : "PM",
    });
  };

  return (
    <View style={[tw`flex-row items-center justify-center py-4`, style]}>
      {/* Hours */}
      <View style={tw`w-20`}>
        <TimeScroller
          values={hours}
          selectedValue={
            selectedTime?.hours?.toString().padStart(2, "0") || "01"
          }
          onValueChange={handleHourChange}
        />
      </View>

      <ArabicText style={tw`text-2xl mx-2`}>:</ArabicText>

      {/* Minutes */}
      <View style={tw`w-20`}>
        <TimeScroller
          values={minutes}
          selectedValue={
            selectedTime?.minutes?.toString().padStart(2, "0") || "00"
          }
          onValueChange={handleMinuteChange}
        />
      </View>

      {/* Period (AM/PM) */}
      <View style={tw`w-24 mr-2`}>
        <TimeScroller
          values={periods}
          selectedValue={selectedTime?.period === "AM" ? "صباحاً" : "مساءً"}
          onValueChange={handlePeriodChange}
        />
      </View>
    </View>
  );
};

export default TimePicker;
