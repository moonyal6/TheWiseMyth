import React from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import tw from "../../utils/tailwind";
import ArabicText from "./ArabicText";
import TimePicker from "../../screens/auth/components/time/TimePicker";

interface DatePickerWheelProps {
  data: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  itemHeight?: number;
  visibleItems?: number;
}

const DatePickerWheel: React.FC<DatePickerWheelProps> = ({
  data,
  selectedValue,
  onValueChange,
  itemHeight = 40,
  visibleItems = 5,
}) => {
  const scrollViewRef = React.useRef<ScrollView>(null);
  const [isScrolling, setIsScrolling] = React.useState(false);

  // Calculate padding to center the items
  const containerHeight = itemHeight * visibleItems;
  const paddingVertical = (containerHeight - itemHeight) / 2;

  React.useEffect(() => {
    if (!isScrolling) {
      const selectedIndex = data.indexOf(selectedValue);
      if (selectedIndex !== -1 && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          y: selectedIndex * itemHeight,
          animated: true,
        });
      }
    }
  }, [selectedValue, isScrolling, data, itemHeight]);

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight);
    if (data[index] !== selectedValue) {
      onValueChange(data[index]);
    }
  };

  return (
    <TimePicker selectedTime={selectedTime} onTimeSelect={setSelectedTime} />
  );
};

export default DatePickerWheel;
