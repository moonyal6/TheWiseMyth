import React from "react";
import { View, TextInput, Image } from "react-native";
import tw from "../../../../utils/tailwind";
import strings from "../../../../localization";

type NationalitySearchProps = {
  value: string;
  onChangeText: (text: string) => void;
};

const NationalitySearch: React.FC<NationalitySearchProps> = ({
  value,
  onChangeText,
}) => {
  return (
    <View style={tw`px-4 py-2`}>
      <View
        style={tw`flex-row items-center bg-gray-50 rounded-xl px-4 py-2 border border-gray-100`}
      >
        <Image
          source={require("../../../../../assets/icons/search.png")}
          style={tw`w-5 h-5 opacity-50`}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={strings.auth.steps.nationality.searchPlaceholder}
          placeholderTextColor='#9CA3AF'
          style={tw`flex-1 mr-2 text-right font-medium text-base`}
        />
      </View>
    </View>
  );
};

export default NationalitySearch;
