import React, { useState } from "react";
import { View, Pressable, Dimensions } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStepParamList } from "../../navigation/AuthStepNavigator";
import ArabicText from "../../components/shared/ArabicText";
import tw from "../../utils/tailwind";
import { COLORS } from "../../constants/theme";
import strings from "../../localization";
import GenderCard from "./components/gender/GenderCard";
import AuthStepContent from "./components/shared/AuthStepContent";

type Props = {
  navigation: NativeStackNavigationProp<AuthStepParamList>;
};

type Gender = "male" | "female" | null;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const GenderScreen = ({ navigation }: Props) => {
  const [selectedGender, setSelectedGender] = useState<Gender>(null);

  const handleNext = () => {
    if (selectedGender) {
      navigation.navigate("BirthDate");
    }
  };

  return (
    <AuthStepContent>
      <View style={tw`flex-1 gap-4.5`}>
        <GenderCard
          gender='male'
          isSelected={selectedGender === "male"}
          onSelect={setSelectedGender}
        />
        <GenderCard
          gender='female'
          isSelected={selectedGender === "female"}
          onSelect={setSelectedGender}
        />
      </View>

      {/* Next Button */}
      <View style={[tw`mt-4.5`, { marginBottom: SCREEN_HEIGHT * 0.11 }]}>
        <Pressable
          onPress={handleNext}
          disabled={!selectedGender}
          style={({ pressed }) => [
            tw`w-full h-14 rounded-xl justify-center items-center`,
            { backgroundColor: COLORS.primary.purple },
            !selectedGender && tw`opacity-50`,
            pressed && !selectedGender && { opacity: 0.3 },
          ]}
        >
          <ArabicText style={tw`text-white font-bold text-lg`}>
            {strings.auth.steps.gender.next}
          </ArabicText>
        </Pressable>
      </View>
    </AuthStepContent>
  );
};

export default GenderScreen;
