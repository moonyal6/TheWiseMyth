import React from "react";
import { View, TextInput, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import tw from "../../../../utils/tailwind";
import ArabicText from "../../../../components/shared/ArabicText";

interface NationalitySearchProps {
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const NationalitySearch: React.FC<NationalitySearchProps> = ({
  value,
  onChangeText,
  onFocus,
  onBlur,
}) => {
  return (
    <View
      style={tw`flex-row items-center px-4.5 py-4.5 border-b border-black/5`}
    >
      <Feather name='search' size={20} color='#000' style={tw`opacity-40`} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder='ابحث عن جنسيتك'
        placeholderTextColor='rgba(0,0,0,0.4)'
        style={tw`flex-1 mr-3 text-base text-right`}
      />
    </View>
  );
};

export default NationalitySearch;
