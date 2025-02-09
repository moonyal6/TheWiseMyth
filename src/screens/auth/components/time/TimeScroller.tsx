import React from "react";
import { View, ScrollView, Pressable, Dimensions } from "react-native";
import ArabicText from "../../../../components/shared/ArabicText";
import tw from "../../../../utils/tailwind";

interface TimeScrollerProps {
  values: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 3;

const TimeScroller: React.FC<TimeScrollerProps> = ({
  values,
  selectedValue,
  onValueChange,
}) => {
  const scrollViewRef = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    const selectedIndex = values.indexOf(selectedValue);
    if (selectedIndex !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: selectedIndex * ITEM_HEIGHT,
        animated: true,
      });
    }
  }, [selectedValue]);

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    if (values[index] !== selectedValue) {
      onValueChange(values[index]);
    }
  };

  return (
    <View style={tw`h-${VISIBLE_ITEMS * 12.5}`}>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate='fast'
        onMomentumScrollEnd={handleScroll}
        contentContainerStyle={tw`py-${VISIBLE_ITEMS * 6.25}`}
      >
        {values.map((value) => (
          <Pressable
            key={value}
            onPress={() => onValueChange(value)}
            style={tw`h-${12.5} justify-center items-center`}
          >
            <ArabicText
              style={[
                tw`text-xl`,
                selectedValue === value
                  ? tw`text-black font-bold`
                  : tw`text-gray-400`,
              ]}
            >
              {value}
            </ArabicText>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default TimeScroller;
