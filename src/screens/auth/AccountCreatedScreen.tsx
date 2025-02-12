import React from "react";
import { View, Pressable, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";
import tw from "../../utils/tailwind";
import ArabicText from "../../components/shared/ArabicText";
import Button from "../../components/shared/Button";
import AuthStepContent from "./components/shared/AuthStepContent";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { successImage } from "../../constants/icons";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const AccountCreatedScreen = ({ navigation }: Props) => {
  const handleNext = () => {
    navigation.replace("MainApp", {
      screen: "Home",
    });
  };

  return (
    <AuthStepContent showWarningText={false}>
      <View style={tw`flex-1 items-center mt-9.5`}>
        <View
          style={tw`items-center bg-white rounded-[1.75rem] pt-13 pb-6 w-full mb-8`}
        >
          <View style={tw`mb-6`}>
            <SvgXml xml={successImage} width={89} height={89} />
          </View>

          <ArabicText
            style={tw`text-3xl font-bold text-center text-gray-800 mb-2`}
          >
            تم إنشاء حسابك بنجاح!
          </ArabicText>

          <ArabicText style={tw`text-base text-black text-center mb-8`}>
            بنقرة واحدة فقط يمكنك استكشاف شخصيتك
          </ArabicText>
        </View>

        <View style={tw`items-center mb-12 gap-3.5`}>
          <View style={tw`relative`}>
            <Pressable
              style={tw`w-32 h-32 rounded-full bg-[#2c2287] items-center justify-center border-[6px] border-[#8020ef]`}
            >
              <Feather name='image' size={38} color='#fff' />
            </Pressable>
            <View
              style={tw`absolute bottom-0 right-1.5 bg-white rounded-full w-8 h-8 items-center justify-center shadow-lg`}
            >
              <MaterialIcons name='photo-camera' size={18} color='#867890' />
            </View>
          </View>

          <ArabicText style={tw`text-sm text-black text-center`}>
            أضف صورة لتعريف شخصيتك
          </ArabicText>
        </View>

        <View
          style={[tw`mt-auto w-full`, { marginBottom: SCREEN_HEIGHT * 0.11 }]}
        >
          <Button
            text='التالي'
            onPress={handleNext}
            style={tw`bg-primary-purple`}
          />
        </View>
      </View>
    </AuthStepContent>
  );
};

export default AccountCreatedScreen;
