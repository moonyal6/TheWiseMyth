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

type SizeVariant = "small" | "medium";

interface SizeConfig {
  itemHeight: number;
  fontSize: number;
  width: number;
  visibleItems: number;
  fadeHeight: number;
}

const SIZE_VARIANTS: Record<SizeVariant, SizeConfig> = {
  small: {
    itemHeight: 58,
    fontSize: 18,
    width: 10,
    visibleItems: 5,
    fadeHeight: 78,
  },
  medium: {
    itemHeight: 58,
    fontSize: 20,
    width: 14,
    visibleItems: 3,
    fadeHeight: 28,
  },
};

interface InfiniteScrollerProps {
  values: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  width?: number;
  size?: SizeVariant;
  itemHeight?: number;
  fontSize?: number;
  visibleItems?: number;
  fadeHeight?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const InfiniteScroller: React.FC<InfiniteScrollerProps> = ({
  values,
  selectedValue,
  onValueChange,
  width,
  size = "medium",
  itemHeight,
  fontSize,
  visibleItems,
  fadeHeight,
  style,
  textStyle,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [containerHeight, setContainerHeight] = React.useState(0);
  const [isScrolling, setIsScrolling] = React.useState(false);

  // Get size configuration
  const sizeConfig = SIZE_VARIANTS[size];
  const ITEM_HEIGHT = itemHeight || sizeConfig.itemHeight;
  const VISIBLE_ITEMS = visibleItems || sizeConfig.visibleItems;
  const FONT_SIZE = fontSize || sizeConfig.fontSize;
  const SCROLLER_WIDTH = width || sizeConfig.width;
  const FADE_HEIGHT = fadeHeight || sizeConfig.fadeHeight;

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
  }, [selectedValue, isScrolling, ITEM_HEIGHT]);

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

  const getTextStyle = (isSelected: boolean): TextStyle => ({
    ...tw.style(isSelected ? `text-black font-bold` : `text-gray-400`),
    fontSize: FONT_SIZE,
    ...(textStyle || {}),
  });

  return (
    <View
      style={[
        {
          width: SCROLLER_WIDTH * 4,
          height: ITEM_HEIGHT * VISIBLE_ITEMS,
        },
        style,
      ]}
      onLayout={handleLayout}
    >
      {/* Top Gradient */}
      <LinearGradient
        colors={["white", "rgba(255,255,255,0)"]}
        style={[
          tw`absolute top-0 left-0 right-0 z-10`,
          { height: FADE_HEIGHT },
        ]}
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
            <ArabicText style={getTextStyle(value === selectedValue)}>
              {value}
            </ArabicText>
          </Pressable>
        ))}
      </ScrollView>

      {/* Bottom Gradient */}
      <LinearGradient
        colors={["rgba(255,255,255,0)", "white"]}
        style={[
          tw`absolute bottom-0 left-0 right-0 z-10`,
          { height: FADE_HEIGHT },
        ]}
        pointerEvents='none'
      />
    </View>
  );
};

export default InfiniteScroller;
