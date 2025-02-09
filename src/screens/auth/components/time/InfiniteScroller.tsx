import React, { useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  Pressable,
  ViewStyle,
  LayoutChangeEvent,
  TextStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ArabicText from "../../../../components/shared/ArabicText";
import tw from "../../../../utils/tailwind";

interface InfiniteScrollerProps {
  values: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  width: number;
  style?: ViewStyle;
}

const VISIBLE_ITEMS = 3;
const ITEM_HEIGHT = 58;

const InfiniteScroller: React.FC<InfiniteScrollerProps> = ({
  values,
  selectedValue,
  onValueChange,
  width,
  style,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [containerHeight, setContainerHeight] = React.useState(0);
  const [isScrolling, setIsScrolling] = React.useState(false);

  // Calculate padding to center the items
  const paddingVertical = (containerHeight - ITEM_HEIGHT) / 2;

  useEffect(() => {
    if (!isScrolling) {
      const selectedIndex = values.indexOf(selectedValue);
      if (selectedIndex !== -1 && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          y: selectedIndex * ITEM_HEIGHT,
          animated: true,
        });
      }
    }
  }, [selectedValue, isScrolling]);

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    if (values[index] !== selectedValue) {
      onValueChange(values[index]);
    }
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerHeight(event.nativeEvent.layout.height);
  };

  return (
    <View
      style={[
        {
          width: width * 4,
          height: ITEM_HEIGHT * VISIBLE_ITEMS,
        },
        style,
      ]}
      onLayout={handleLayout}
    >
      {/* Top Gradient */}
      <LinearGradient
        colors={["white", "rgba(255,255,255,0)"]}
        style={tw`absolute top-0 left-0 right-0 h-7 z-10`}
        pointerEvents='none'
      />

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate='fast'
        onMomentumScrollBegin={() => setIsScrolling(true)}
        onMomentumScrollEnd={(event) => {
          handleScroll(event);
          setIsScrolling(false);
        }}
        onScrollEndDrag={(event) => {
          handleScroll(event);
          setIsScrolling(false);
        }}
        contentContainerStyle={{
          paddingVertical,
        }}
      >
        {values.map((value) => (
          <Pressable
            key={value}
            onPress={() => onValueChange(value)}
            style={{
              height: ITEM_HEIGHT,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ArabicText
              style={
                value === selectedValue
                  ? tw.style(`text-xl text-black font-bold`)
                  : tw.style(`text-xl text-gray-400`)
              }
            >
              {value}
            </ArabicText>
          </Pressable>
        ))}
      </ScrollView>

      {/* Bottom Gradient */}
      <LinearGradient
        colors={["rgba(255,255,255,0)", "white"]}
        style={tw`absolute bottom-0 left-0 right-0 h-7 z-10`}
        pointerEvents='none'
      />
    </View>
  );
};

export default InfiniteScroller;
