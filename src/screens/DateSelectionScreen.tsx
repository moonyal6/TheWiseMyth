import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";
import { Feather } from "@expo/vector-icons";
import tw from "../utils/tailwind";
import ArabicText from "../components/shared/ArabicText";
import Card from "../components/shared/Card";
import GradientBackground from "../components/shared/GradientBackground";
import TimePicker from "../screens/auth/components/time/TimePicker";
import Button from "../components/shared/Button";

type TimeState = {
  hours: number;
  minutes: number;
  seconds: number;
  period: "AM" | "PM";
};

const DateSelectionScreen = () => {
  const navigation = useNavigation();
  const [sliderValue, setSliderValue] = useState(50);
  const [selectedTime, setSelectedTime] = useState<TimeState>({
    hours: 9,
    minutes: 0,
    seconds: 0,
    period: "AM",
  });
  const [planetSpeed, setPlanetSpeed] = useState(50);

  const handleTimeSelect = (time: TimeState) => {
    setSelectedTime(time);
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
            <Pressable onPress={() => navigation.goBack()}>
              <Feather name='chevron-left' size={24} color='#2C2287' />
            </Pressable>
            <ArabicText style={tw`text-xl font-bold text-black`}>
              اختر التاريخ
            </ArabicText>
            <View style={tw`w-6`} />
          </View>
        </View>

        <View style={tw`flex-1 px-4 py-6`}>
          {/* Description */}
          <View style={tw`mb-6`}>
            <ArabicText style={tw`text-lg text-center text-gray-600`}>
              من فضلك قم بإدخال المعلومات بشكل دقيق
            </ArabicText>
          </View>

          {/* Time Picker Card */}
          <Card style={tw`mb-6`}>
            <TimePicker
              selectedTime={selectedTime}
              onTimeSelect={handleTimeSelect}
            />
          </Card>

          {/* Planet Speed Card */}
          <Card withBackCard={false} style={tw`mb-6`}>
            <View style={tw`p-6`}>
              <View style={tw`flex-row justify-between mb-4`}>
                <ArabicText style={tw`text-gray-400`}>بطيء</ArabicText>
                <ArabicText style={tw`text-gray-400`}>سريع</ArabicText>
              </View>
              <Slider
                value={planetSpeed}
                onValueChange={setPlanetSpeed}
                minimumValue={0}
                maximumValue={100}
                step={1}
                minimumTrackTintColor='#6366F1'
                maximumTrackTintColor='#E5E7EB'
                thumbTintColor='#6366F1'
              />
            </View>
          </Card>

          {/* Save Button */}
          <View style={tw`mt-auto`}>
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
