import React, { useState } from "react";
import {
  View,
  Pressable,
  Dimensions,
  ScrollView,
  Image,
  Text,
} from "react-native";
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

// Temporary countries data
const TEMP_COUNTRIES = [
  { id: "uk-1", name: "لندن بريطانيا", flag: "🇬🇧" },
  { id: "uk-2", name: "ساوث بريطانيا", flag: "🇬🇧" },
  { id: "uk-3", name: "شارلز بريطانيا", flag: "🇬🇧" },
  { id: "it", name: "ايطاليا", flag: "🇮🇹" },
  { id: "cn", name: "الصين", flag: "🇨🇳" },
  { id: "fr", name: "فرنسا", flag: "🇫🇷" },
  { id: "de", name: "المانيا", flag: "🇩🇪" },
];

const NationalityScreen = ({ navigation }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNationality, setSelectedNationality] = useState<string | null>(
    null,
  );

  const handleNext = () => {
    if (selectedNationality) {
      // Navigate to next screen or complete the flow
      console.log("Selected nationality:", selectedNationality);
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
          <ScrollView style={tw`h-82`}>
            {TEMP_COUNTRIES.map((country) => (
              <Pressable
                key={country.id}
                onPress={() => setSelectedNationality(country.id)}
                style={tw`flex-row items-center px-4 py-3 border-b border-gray-100`}
              >
                <View style={tw`flex-row items-center flex-1`}>
                  <ArabicText style={tw`text-base flex-1`}>
                    {country.name}
                  </ArabicText>
                  <Text style={tw`text-2xl mr-2`}>{country.flag}</Text>
                </View>
                {selectedNationality === country.id && (
                  <View
                    style={tw`w-5 h-5 rounded-full bg-[${COLORS.primary.purple}] justify-center items-center`}
                  >
                    <View style={tw`w-2 h-2 rounded-full bg-white`} />
                  </View>
                )}
              </Pressable>
            ))}
          </ScrollView>
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
              {strings.auth.steps.nationality.next}
            </ArabicText>
          </Pressable>
        </View>
      </View>
    </AuthStepContent>
  );
};

export default NationalityScreen;
