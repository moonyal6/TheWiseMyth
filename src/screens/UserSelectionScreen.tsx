import React, { useRef } from "react";
import { View, Image, Animated, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import {
  ScrollView,
  Swipeable,
  RectButton,
  TouchableOpacity,
} from "react-native-gesture-handler";
import tw from "../utils/tailwind";
import GradientBackground from "../components/shared/GradientBackground";
import AppHeader from "../components/shared/AppHeader";
import ArabicText from "../components/shared/ArabicText";
import {
  GRADIENT_COLORS,
  GRADIENT_START,
  GRADIENT_END,
} from "./home/constants";

interface User {
  id: string;
  name: string;
  date: string;
  imageUrl: string;
}

const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "حسين",
    date: "20 تموز 1990",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2L5jgOwMoZrw62HmxIVIXZTXKI6Pkg7QPCQ&s",
  },
  {
    id: "2",
    name: "حسين",
    date: " 20 تموز 1990",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2L5jgOwMoZrw62HmxIVIXZTXKI6Pkg7QPCQ&s",
  },
  {
    id: "3",
    name: "حسين",
    date: "20 تموز 1990",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2L5jgOwMoZrw62HmxIVIXZTXKI6Pkg7QPCQ&s",
  },
];

const deleteIcon = `<svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Group 2085662609">
<g id="Group 303">
<g id="Delete">
<path id="Delete_2" fill-rule="evenodd" clip-rule="evenodd" d="M17.2873 3.74276C17.6763 3.74276 18.0002 4.06576 18.0002 4.47676V4.85676C18.0002 5.25776 17.6763 5.59076 17.2873 5.59076H0.713861C0.323863 5.59076 0 5.25776 0 4.85676V4.47676C0 4.06576 0.323863 3.74276 0.713861 3.74276H3.6296C4.2219 3.74276 4.73735 3.32176 4.8706 2.72776L5.02329 2.04576C5.26059 1.11676 6.04156 0.499756 6.93535 0.499756H11.0648C11.9489 0.499756 12.7386 1.11676 12.9672 1.99676L13.1306 2.72676C13.2628 3.32176 13.7783 3.74276 14.3716 3.74276H17.2873ZM15.806 17.6343C16.1104 14.7973 16.6434 8.05731 16.6434 7.98931C16.6628 7.78331 16.5957 7.58831 16.4625 7.43131C16.3195 7.28431 16.1386 7.19731 15.9393 7.19731H2.06857C1.86822 7.19731 1.6776 7.28431 1.54533 7.43131C1.41112 7.58831 1.34498 7.78331 1.35471 7.98931C1.35649 8.00181 1.37562 8.23922 1.40759 8.63614C1.54962 10.3994 1.94521 15.3104 2.20084 17.6343C2.38173 19.3463 3.50504 20.4223 5.13214 20.4613C6.38772 20.4903 7.68123 20.5003 9.00391 20.5003C10.2498 20.5003 11.5151 20.4903 12.8096 20.4613C14.4931 20.4323 15.6154 19.3753 15.806 17.6343Z" fill="white"/>
</g>
</g>
</g>
</svg>`;

const editIcon = `<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Edit">
<path id="Edit_2" fill-rule="evenodd" clip-rule="evenodd" d="M7.08489 19.4199L16.8475 6.79493C17.3781 6.11412 17.5668 5.327 17.3899 4.52554C17.2366 3.79695 16.7886 3.10419 16.1165 2.57865L14.4776 1.27674C13.051 0.142044 11.2824 0.261485 10.2684 1.5634L9.17183 2.98594C9.03034 3.16391 9.06571 3.42668 9.24257 3.57001C9.24257 3.57001 12.0134 5.79162 12.0723 5.8394C12.261 6.01856 12.4025 6.25745 12.4378 6.5441C12.4968 7.10548 12.1077 7.63102 11.53 7.70269C11.2588 7.73852 10.9994 7.65491 10.8107 7.49964L7.89844 5.18247C7.75695 5.07617 7.54472 5.09886 7.42682 5.24219L0.505709 14.2003C0.0576649 14.7617 -0.0956134 15.4903 0.0576649 16.195L0.941963 20.029C0.989126 20.2321 1.16599 20.3754 1.37822 20.3754L5.26913 20.3276C5.97657 20.3157 6.63684 19.9932 7.08489 19.4199ZM12.533 18.2258H18.8775C19.4965 18.2258 20 18.7358 20 19.3629C20 19.9912 19.4965 20.5 18.8775 20.5H12.533C11.914 20.5 11.4105 19.9912 11.4105 19.3629C11.4105 18.7358 11.914 18.2258 12.533 18.2258Z" fill="white"/>
</g>
</svg>`;

const UserItem: React.FC<{ user: User }> = ({ user }) => {
  const swipeableRef = useRef<Swipeable>(null);

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [0, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    const translateX = dragX.interpolate({
      inputRange: [0, 0],
      outputRange: [0, 0],
      extrapolate: "clamp",
    });

    return (
      <View style={tw`flex-row items-stretch pl-0`}>
        <Animated.View style={{ transform: [{ scale }, { translateX }] }}>
          <View
            style={tw`w-22 rounded-[15px] absolute -left-7 bg-white items-center justify-center h-full`}
          />
          <RectButton
            style={tw`w-16 rounded-[15px] bg-[#FF3B30] items-center justify-center h-full`}
            onPress={() => {
              swipeableRef.current?.close();
              // Handle delete
              console.log("Delete user:", user.id);
            }}
          >
            <SvgXml xml={deleteIcon} width={20} height={20} />
          </RectButton>
        </Animated.View>
      </View>
    );
  };

  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [0, 0],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    const translateX = dragX.interpolate({
      inputRange: [0, 0],
      outputRange: [-40, 0],
      extrapolate: "clamp",
    });

    return (
      <View style={tw`flex-row items-stretch pr-0`}>
        <Animated.View style={{ transform: [{ scale }, { translateX }] }}>
          <View
            style={tw`w-22 rounded-[15px] absolute -right-7 bg-white items-center justify-center h-full`}
          />
          <RectButton
            style={tw`w-16 rounded-[15px] bg-[#34C759] items-center justify-center h-full`}
            onPress={() => {
              swipeableRef.current?.close();
              // Handle edit
              console.log("Edit user:", user.id);
            }}
          >
            <SvgXml xml={editIcon} width={20} height={20} />
          </RectButton>
        </Animated.View>
      </View>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      overshootRight={false}
      overshootLeft={false}
      containerStyle={tw`mb-2.5 mx-8 overflow-visible`}
      friction={2}
      leftThreshold={60}
      rightThreshold={60}
    >
      <View
        style={tw`flex-row items-center justify-between bg-white rounded-[15px] p-3.5`}
      >
        <View style={tw`flex-row items-center gap-2 justify-end flex-1`}>
          <View>
            <ArabicText style={tw`text-base text-right font-bold`}>
              {user.name}
            </ArabicText>
            <ArabicText style={tw`text-xs text-[#9491AE]`}>
              {user.date}
            </ArabicText>
          </View>
          <View style={tw`relative mr-4`}>
            <LinearGradient
              colors={GRADIENT_COLORS}
              start={GRADIENT_START}
              end={GRADIENT_END}
              style={tw`w-13 h-13 rounded-full overflow-hidden`}
            />
            <Image
              source={{ uri: user.imageUrl }}
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
    </Swipeable>
  );
};

const UserSelectionScreen = () => {
  const navigation = useNavigation();

  return (
    <GradientBackground hideTopBlob>
      <SafeAreaView style={tw`flex-1`}>
        <AppHeader
          title='اختر المستخدم'
          onBackPress={() => navigation.goBack()}
        />
        <ScrollView style={tw`flex-1 pt-6`}>
          {MOCK_USERS.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default UserSelectionScreen;
