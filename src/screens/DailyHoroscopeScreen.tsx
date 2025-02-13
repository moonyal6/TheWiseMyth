import React, { useState, useEffect } from "react";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "../utils/tailwind";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ArabicText from "../components/shared/ArabicText";
import GradientBackground from "../components/shared/GradientBackground";
import SettingsSection from "./settings/components/SettingsSection";
import SettingItem from "./settings/components/SettingItem";
import Card from "../components/shared/Card";
import TimePicker from "./auth/components/time/TimePicker";
import Toggle from "../components/shared/Toggle";
import AppHeader from "../components/shared/AppHeader";

const STORAGE_KEY = "@daily_horoscope_settings";

const DailyHoroscopeScreen = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [time, setTime] = useState({
    hours: 6,
    minutes: 28,
    seconds: 55,
    period: "AM" as const,
  });

  // Load saved settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedSettings) {
          const { notifications, time } = JSON.parse(savedSettings);
          setNotificationsEnabled(notifications);
          setTime(time);
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };

    loadSettings();
  }, []);

  // Save settings
  const handleSave = async () => {
    try {
      const settings = {
        notifications: notificationsEnabled,
        time: time,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      navigation.goBack();
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  return (
    <GradientBackground hideTopBlob hideBottomBlob>
      <SafeAreaView style={tw`flex-1 h-full `}>
        {/* Header */}
        <AppHeader
          title='الأبراج اليومية'
          onBackPress={() => navigation.goBack()}
        />
        {/* <View style={tw`bg-white rounded-b-[15px] justify-end pb-4 pt-10`}>
          <View style={tw`flex-row items-center justify-between px-8`}>
            <View style={tw`w-10`} />
            
            <ArabicText style={tw`text-xl font-bold text-black`}>
              الأبراج اليومية
            </ArabicText>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={tw`p-2`}
            >
              <Feather name='chevron-right' size={24} color='black' />
            </TouchableOpacity>
          </View>
        </View> */}

        {/* Content */}
        <View style={tw`flex-1 px-8 pt-4`}>
          {/* Notifications Section */}
          <SettingsSection>
            <SettingItem
              hideLeftIcon
              label='الاشعارات اليومية'
              icon='bell'
              iconBackground='#FFB800'
              onSwitchChange={setNotificationsEnabled}
              leftElement={
                <View style={tw`flex-row items-center gap-2`}>
                  <Toggle
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                  />
                  <ArabicText style={tw`text-sm text-right text-black`}>
                    تفعيل
                  </ArabicText>
                </View>
              }
            />
          </SettingsSection>

          {/* Time Picker Cards */}
          <View style={tw`mt-4 h-42`}>
            <Card style={tw`mb-13 py-6 h-71`}>
          <TimePicker
            selectedTime={time}
            onTimeSelect={setTime}
          />
        </Card>

           
          </View>

          {/* Save Button */}
          <View style={tw`absolute bottom-0 left-0 right-0 px-8 py-2.5 rounded-t-[15px] bg-white`}>
          <TouchableOpacity
            style={tw`bg-primary-purple  rounded-xl py-4 `}
            onPress={handleSave}
          >
            <ArabicText style={tw`text-white text-center font-bold text-lg`}>
              حفظ
            </ArabicText>
          </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default DailyHoroscopeScreen;
