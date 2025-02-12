import React, { useState } from "react";
import { View, Pressable, Dimensions, ScrollView, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStepParamList } from "../../navigation/AuthStepNavigator";
import ArabicText from "../../components/shared/ArabicText";
import Card from "../../components/shared/Card";
import tw from "../../utils/tailwind";
import { COLORS } from "../../constants/theme";
import strings from "../../localization";
import AuthStepContent from "./components/shared/AuthStepContent";
import NationalitySearch from "./components/nationality/NationalitySearch";
import { countries } from "../../data/countries";
import { useLanguage } from "../../hooks/useLanguage";

type Props = {
  navigation: NativeStackNavigationProp<AuthStepParamList>;
};

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const NationalityScreen = ({ navigation }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNationality, setSelectedNationality] = useState<string | null>(
    null,
  );
  const { isArabic } = useLanguage();

  // Filter countries based on search query
  const filteredCountries = React.useMemo(() => {
    if (!searchQuery.trim()) return countries;

    const normalizedQuery = searchQuery.trim().toLowerCase();
    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(normalizedQuery) ||
        (country.arabic_name &&
          country.arabic_name.toLowerCase().includes(normalizedQuery)) ||
        country.keywords?.some((keyword) =>
          keyword.toLowerCase().includes(normalizedQuery),
        ),
    );
  }, [searchQuery]);

  const handleNext = () => {
    if (selectedNationality) {
      navigation.navigate("AccountCreated");
    }
  };

  return (
    <AuthStepContent>
      <View style={tw`flex-1 justify-end`}>
        <Card style={tw`mb-13 px-9 pt-6`}>
          {/* Search Input */}
          <NationalitySearch
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={
              isArabic ? "اكتب هنا اسم بلدك للبحث" : "Search for a country"
            }
          />

          {/* Nationality List */}
          <ScrollView
            style={tw`h-[320px] -mt-2.5`}
            keyboardShouldPersistTaps='handled'
            showsVerticalScrollIndicator={false}
          >
            <View style={tw`h-5`} />
            {filteredCountries.length === 0 ? (
              <View style={tw`py-8 items-center`}>
                <Text style={tw`text-gray-500 text-sm`}>
                  {isArabic ? "لا توجد نتائج" : "No results found"}
                </Text>
              </View>
            ) : (
              filteredCountries.map((country) => (
                <Pressable
                  key={country.id}
                  onPress={() => setSelectedNationality(country.id)}
                  style={tw`flex-row items-center py-2.5 pr-4.5 pl-2.5 ${
                    selectedNationality === country.id
                      ? "border border-[#D8DADC] rounded-[10px] bg-[#F4F5F6]"
                      : ""
                  }`}
                >
                  {selectedNationality === country.id && (
                    <View
                      style={tw`w-4 h-4 rounded-full bg-[#412787] justify-center items-center `}
                    >
                      <View style={tw`w-1.5 h-1.5 rounded-full bg-white`} />
                    </View>
                  )}
                  {selectedNationality !== country.id && (
                    <View style={tw`w-4 ml-4`} />
                  )}

                  <View style={tw`flex-row items-center flex-1 justify-end `}>
                    {isArabic ? (
                      <ArabicText
                        style={tw`text-lg flex-1 text-right mr-4.5 font-medium`}
                      >
                        {country.arabic_name}
                      </ArabicText>
                    ) : (
                      <Text
                        style={tw`text-lg flex-1 text-right mr-3 font-medium`}
                      >
                        {country.name}
                      </Text>
                    )}
                    <Text style={tw`text-2xl`}>{country.flag}</Text>
                  </View>
                </Pressable>
              ))
            )}
          </ScrollView>
        </Card>

        {/* Next Button */}
        <View style={{ marginBottom: SCREEN_HEIGHT * 0.11 }}>
          <Pressable
            onPress={handleNext}
            disabled={!selectedNationality}
            style={({ pressed }) => [
              tw`w-full h-14 rounded-xl justify-center items-center`,
              { backgroundColor: "#412787" },
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
