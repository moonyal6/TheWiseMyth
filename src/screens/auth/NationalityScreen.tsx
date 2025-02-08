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
import NationalitySearch from "./components/nationality/NationalitySearch";

type Props = {
  navigation: NativeStackNavigationProp<AuthStepParamList>;
};

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const NationalityScreen = ({ navigation }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNationality, setSelectedNationality] = useState<string | null>(
    null,
  );

  const handleNext = () => {
    if (selectedNationality) {
      // Navigate to next screen
      // navigation.navigate("NextScreen");
    }
  };

  return (
    <AuthStepContent>
      <View style={tw`flex-1 justify-end`}>
        <Card style={tw`mb-13`}>
          {/* Search Input */}
          <NationalitySearch
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {/* Nationality List */}
          <View style={tw`h-82`}>{/* Nationality items will go here */}</View>
        </Card>

        {/* Next Button */}
        <View style={{ marginBottom: SCREEN_HEIGHT * 0.11 }}>
          <Pressable
            onPress={handleNext}
            disabled={!selectedNationality}
            style={({ pressed }) => [
              tw`w-full h-14 rounded-xl justify-center items-center`,
              { backgroundColor: COLORS.primary.purple },
              !selectedNationality && tw`opacity-50`,
              pressed && !selectedNationality && { opacity: 0.3 },
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

export default NationalityScreen;
