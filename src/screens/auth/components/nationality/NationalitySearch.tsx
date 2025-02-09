import React from "react";
import { View, TextInput, Image } from "react-native";
import tw from "../../../../utils/tailwind";
import strings from "../../../../localization";

type NationalitySearchProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

const NationalitySearch: React.FC<NationalitySearchProps> = ({
  value,
  onChangeText,
  placeholder,
}) => {
  return (
    <View style={tw`z-10`}>
      <View
        style={tw`flex-row items-center border bg-white border-[#BBC1CD] rounded-xl px-4 py-2.5`}
      >
        <Image
          source={require("../../../../../assets/icons/search.png")}
          style={tw`w-5 h-5 `}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor='#9CA3AF'
          style={tw`flex-1 text-right font-medium text-sm text-black`}
          keyboardShouldPersistTaps='handled'
        />
      </View>
    </View>
  );
};

export default NationalitySearch;
