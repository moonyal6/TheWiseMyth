import React, { useState } from "react";
import { View, Pressable, Dimensions } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStepParamList } from "../../navigation/AuthStepNavigator";
import ArabicText from "../../components/shared/ArabicText";
import Card from "../../components/shared/Card";
import tw from "../../utils/tailwind";
import { COLORS } from "../../constants/theme";
import strings from "../../localization";
import AuthStepContent from "./components/shared/AuthStepContent";
import TimePicker from "./components/time/TimePicker";

type Props = {
  navigation: NativeStackNavigationProp<AuthStepParamList>;
};

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const BirthTimeScreen = ({ navigation }: Props) => {
  const [selectedTime, setSelectedTime] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    period: "AM" | "PM";
  } | null>(null);

  const handleNext = () => {
    if (selectedTime) {
      navigation.navigate("Nationality");
    }
  };

  return (
    <AuthStepContent>
      <View style={tw`flex-1 justify-end`}>
        <Card style={tw`mb-13`}>
          <TimePicker
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
          />
        </Card>

        {/* Next Button */}
        <View style={{ marginBottom: SCREEN_HEIGHT * 0.11 }}>
          <Pressable
            onPress={handleNext}
            disabled={!selectedTime}
            style={({ pressed }) => [
              tw`w-full h-14 rounded-xl justify-center items-center`,
              { backgroundColor: COLORS.primary.purple },
              !selectedTime && tw`opacity-50`,
              pressed && !selectedTime && { opacity: 0.3 },
            ]}
          >
            <ArabicText style={tw`text-white font-bold text-lg`}>
              {strings.auth.steps.gender.next}
            </ArabicText>
          </Pressable>
        </View>
      </View>
    </AuthStepContent>
  );
};

export default BirthTimeScreen; 