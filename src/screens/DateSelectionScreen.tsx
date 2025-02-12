import React, { useState } from "react";
import { View, Pressable, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Feather } from "@expo/vector-icons";
import tw from "../utils/tailwind";
import ArabicText from "../components/shared/ArabicText";
import Card from "../components/shared/Card";
import GradientBackground from "../components/shared/GradientBackground";
import DateScreenTimePicker from "./date/components/DateScreenTimePicker";
import Button from "../components/shared/Button";

type TimeState = {
  hours: number;
  minutes: number;
  period: "AM" | "PM";
  year: number;
  month: number;
  day: number;
};

type SpeedRange = [number, number];

const DateSelectionScreen = () => {
  const navigation = useNavigation();
  const { width: SCREEN_WIDTH } = Dimensions.get("window");
  const SLIDER_LENGTH = (SCREEN_WIDTH - 32 * 2 - 24 * 2) * 0.65;

  const [selectedTime, setSelectedTime] = useState<TimeState>({
    hours: 9,
    minutes: 0,
    period: "AM",
    year: 2024,
    month: 1,
    day: 1,
  });
  const [speedRange, setSpeedRange] = useState<SpeedRange>([25, 75]);

  const handleTimeSelect = (time: TimeState) => {
    setSelectedTime(time);
  };

  const handleSpeedChange = (values: number[]) => {
    setSpeedRange(values as SpeedRange);
  };

  const handleSave = () => {
    // Implement the save logic here
  };

  return (
    <GradientBackground hideTopBlob>
      <SafeAreaView style={tw`flex-1`}>
        {/* Header */}
        <View style={tw`bg-white rounded-b-4xl pt-6 pb-3.5`}>
          <View style={tw`px-8 flex-row items-center justify-between`}>
            <View style={tw`w-6`} />

            <ArabicText style={tw`text-xl font-bold text-black`}>
              اختر التاريخ
            </ArabicText>
            <Pressable onPress={() => navigation.goBack()}>
              <Feather name='chevron-right' size={24} color='#2C2287' />
            </Pressable>
          </View>
        </View>

        <View style={tw`flex-1 px-8 py-6`}>
          {/* Description */}
          <View style={tw`px-8 mb-10`}>
            <ArabicText style={tw`text-center text-sm opacity-60`}>
              يرجى ادخال معلومات صحيحة وموثقة عند ادخالك المعلومات تحفظ النتائج
              ولا تظهر معلومات صحيحة
            </ArabicText>
          </View>

          {/* Time Picker Card */}
          <Card style={tw`mb-4.5 h-82`}>
            <DateScreenTimePicker
              selectedTime={selectedTime}
              onTimeSelect={handleTimeSelect}
            />
          </Card>

          {/* Planet Speed Card */}
          <Card withBackCard={false} style={tw`mb-9`}>
            <View style={tw`py-7 px-3.5`}>
              <ArabicText
                style={tw`text-black
text-base
font-bold text-center mb-4`}
              >
                اختر سرعة انتقال الكواكب
              </ArabicText>
              <View style={tw`flex-row items-center justify-between px-2`}>
                <ArabicText style={tw`text-xs text-black font-bold w-10`}>
                  بطيء
                </ArabicText>
                <View style={tw`flex-1 mx-3 items-center`}>
                  <MultiSlider
                    values={speedRange}
                    onValuesChange={handleSpeedChange}
                    min={0}
                    max={100}
                    step={1}
                    allowOverlap={false}
                    snapped
                    enableLabel={false}
                    sliderLength={SLIDER_LENGTH}
                    containerStyle={{ height: 48 }}
                    selectedStyle={{
                      backgroundColor: "#7258F0",
                      height: 2,
                    }}
                    unselectedStyle={{
                      backgroundColor: "#CAC2ED",
                      height: 2,
                    }}
                    trackStyle={{ height: 3 }}
                    markerStyle={{
                      backgroundColor: "white",
                      width: 18,
                      height: 18,
                      borderRadius: 12,
                      borderWidth: 2,
                      borderColor: "#7258F0",
                    }}
                    pressedMarkerStyle={{
                      backgroundColor: "#e4e2ec",
                      borderWidth: 2,
                      borderColor: "#7258F0",
                      width: 24,
                      height: 24,
                      borderRadius: 14,
                    }}
                  />
                </View>
                <ArabicText style={tw`text-xs text-black font-bold text-right`}>
                  سريع
                </ArabicText>
              </View>
            </View>
          </Card>

          {/* Save Button */}
          <View style={tw``}>
            <Button
              onPress={handleSave}
              text='حفظ'
              style={tw`bg-primary-600`}
            />
          </View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default DateSelectionScreen;
