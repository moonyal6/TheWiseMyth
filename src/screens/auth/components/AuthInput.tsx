import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from "react-native";
import tw from "../../../utils/tailwind";
import { COLORS } from "../../../constants/theme";

interface AuthInputProps extends TextInputProps {
  label: string;
  error?: string;
}

const AuthInput: React.FC<AuthInputProps> = ({ label, error, ...props }) => {
  return (
    <View style={tw`h-[56px]`}>
      {/* Label and Error Row */}
      <View style={tw`flex-row justify-end items-center mb-1`}>
        {error && (
          <Text style={tw`text-red-500 text-sm flex-1 ml-1`}>{error}</Text>
        )}
        <Text style={tw`text-sm font-bold text-black mr-1`}>{label}</Text>
      </View>

      {/* Input */}
      <TextInput
        style={[
          tw`bg-white rounded-[10px] px-4 py-3 w-full text-right`,
          styles.input,
          error ? styles.inputError : null,
        ]}
        placeholderTextColor='#999'
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "transparent",
  },
  inputError: {
    borderColor: "red",
  },
});

export default AuthInput;
