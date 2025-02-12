import React from "react";
import { View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import tw from "../utils/tailwind";
import ArabicText from "../components/shared/ArabicText";
import Card from "../components/shared/Card";
import GradientBackground from "../components/shared/GradientBackground";
import AppHeader from "../components/shared/AppHeader";
import Toggle from "../components/shared/Toggle";
import SettingItem from "./settings/components/SettingItem";
import SettingsSection from "./settings/components/SettingsSection";
import {
  GRADIENT_COLORS,
  GRADIENT_START,
  GRADIENT_END,
} from "./home/constants";

const Divider = () => <View style={tw`h-[1px] my-1 bg-[#F4F5F6]`} />;

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <GradientBackground hideTopBlob>
      <SafeAreaView style={tw`flex-1`}>
        {/* Header */}
        <AppHeader title='الاعدادات' />

        {/* Main Content */}
        <ScrollView
          style={tw`flex-1 pt-6`}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Section */}
          <View style={tw`mb-4 bg-white py-3 px-8`}>
            <View style={tw`flex-row items-center justify-end`}>
              <View style={tw`items-end mr-3`}>
                <ArabicText style={tw`text-base font-bold`}>حسين</ArabicText>
                <ArabicText style={tw`text-xs text-[#9491AE]`}>
                  24 يناير 1990
                </ArabicText>
                <ArabicText style={tw`text-[0.625rem] text-[#BBC1CD]`}>
                  لندن-بريطانيا
                </ArabicText>
              </View>
              <View style={tw`relative`}>
                <LinearGradient
                  colors={GRADIENT_COLORS}
                  start={GRADIENT_START}
                  end={GRADIENT_END}
                  style={tw`w-16 h-16 rounded-full overflow-hidden`}
                />
                <Image
                  source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2L5jgOwMoZrw62HmxIVIXZTXKI6Pkg7QPCQ&s",
                  }}
                  style={[
                    tw`absolute rounded-full`,
                    {
                      top: 2,
                      left: 2,
                      right: 2,
                      bottom: 2,
                    },
                  ]}
                  resizeMode='cover'
                />
              </View>
            </View>
          </View>

          {/* Settings Sections Container */}
          <View style={tw`px-8 pb-11`}>
            {/* App Settings Section */}
            <SettingsSection>
              <SettingItem
                icon='moon'
                label='الوضع المظلم'
                onPress={() => setIsDarkMode(!isDarkMode)}
                leftElement={
                  <View style={tw`flex-row items-center`}>
                    <ArabicText style={tw`mr-1`}>
                      {isDarkMode ? "تفعيل" : "تعطيل"}
                    </ArabicText>
                    <Toggle value={isDarkMode} onValueChange={setIsDarkMode} />
                  </View>
                }
              />
              <Divider />
              <SettingItem
                icon='globe'
                label='اللغة'
                onPress={() => console.log("Language")}
                leftIcon='chevron-down'
                leftElement={
                  <View style={tw`flex-row items-end`}>
                    <ArabicText style={tw`mr-3.5`}>عربي</ArabicText>
                  </View>
                }
              />
              <Divider />
              <SettingItem
                icon='bell'
                label='الاشعارات'
                onPress={() => setNotificationsEnabled(!notificationsEnabled)}
                leftIcon='chevron-left'
                leftElement={
                  <View style={tw`flex-row items-center`}>
                    <ArabicText style={tw`mr-1`}>
                      {notificationsEnabled ? "تفعيل" : "تعطيل"}
                    </ArabicText>
                    <Toggle
                      value={notificationsEnabled}
                      onValueChange={setNotificationsEnabled}
                    />
                  </View>
                }
              />
            </SettingsSection>

            {/* Astronomy Settings Section */}
            <SettingsSection>
              <SettingItem
                icon='hash'
                label='عدد الكواكب'
                onPress={() => console.log("Number of Planets")}
                leftIcon='chevron-left'
              />
              <Divider />
              <SettingItem
                icon='calendar'
                label='نظام العام'
                onPress={() => console.log("Annual System")}
                leftIcon='chevron-left'
                leftElement={<ArabicText style={tw``}>بليسيدوس</ArabicText>}
              />
              <Divider />
              <SettingItem
                icon='star'
                label='نظام الابراج'
                onPress={() => console.log("Zodiac System")}
                leftIcon='chevron-left'
              />
              <Divider />
              <SettingItem
                icon='settings'
                label='ضبط الاجرام السماوية'
                onPress={() => console.log("Celestial Bodies Settings")}
                leftIcon='chevron-left'
              />
              <Divider />
              <SettingItem
                icon='sun'
                label='الابراج اليومية'
                onPress={() => console.log("Daily Horoscopes")}
                leftIcon='chevron-left'
              />
            </SettingsSection>

            {/* User Settings Section */}
            <SettingsSection>
              <SettingItem
                icon='book'
                label='المرجع الفلكي'
                onPress={() => console.log("Astronomical Reference")}
                leftIcon='chevron-left'
              />
              <Divider />
              <SettingItem
                icon='help-circle'
                label='نصائح وحيل'
                onPress={() => navigation.navigate("TipsAndTricks")}
                leftIcon='chevron-left'
              />
              <Divider />
              <SettingItem
                icon='users'
                label='حفظ مشاركة الاشخاص'
                onPress={() => console.log("Save People Sharing")}
                leftIcon='chevron-left'
              />
              <Divider />
              <SettingItem
                icon='download'
                label='استعادة/استيراد الاشخاص'
                onPress={() => console.log("Restore/Import People")}
                leftIcon='chevron-left'
              />
            </SettingsSection>

            {/* App Info Section */}
            <SettingsSection>
              <SettingItem
                icon='mail'
                label='اتصل بنا'
                onPress={() => console.log("Contact Us")}
                leftIcon='chevron-left'
              />
              <Divider />
              <SettingItem
                icon='file-text'
                label='الشروط وسياسة الخصوصية'
                onPress={() => console.log("Terms and Privacy Policy")}
                leftIcon='chevron-left'
              />
            </SettingsSection>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default SettingsScreen;
