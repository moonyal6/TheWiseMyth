import React, { useState } from "react";
import { View, ScrollView, Pressable, Dimensions, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { SvgXml } from "react-native-svg";
import tw from "../utils/tailwind";
import ArabicText from "../components/shared/ArabicText";
import Card from "../components/shared/Card";
import { COLORS } from "../constants/theme";
import GradientBackground from "../components/shared/GradientBackground";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const GRADIENT_COLORS = ["#D9259A", "#412787"] as const;
const GRADIENT_START = { x: 0.065, y: 0.085 };
const GRADIENT_END = { x: 0.935, y: 0.915 };

const CALENDAR_DATA = [
  { day: "S", date: 21, isSelected: false },
  { day: "M", date: 22, isSelected: false },
  { day: "T", date: 23, isSelected: false },
  { day: "W", date: 24, isSelected: true },
  { day: "T", date: 25, isSelected: false },
  { day: "F", date: 26, isSelected: false },
  { day: "S", date: 27, isSelected: false },
];

const QUICK_ACTIONS = [
  {
    id: "notes",
    icon: "💊",
    gradient: {
      colors: ["#B499FF", "#542EA3"] as const,
      start: { x: 0.065, y: 0.085 },
      end: { x: 0.935, y: 0.915 },
    },
    isSelected: false,
  },
  {
    id: "target",
    icon: "🎯",
    gradient: {
      colors: ["#FF99E0", "#D9259A"] as const,
      start: { x: 0.065, y: 0.085 },
      end: { x: 0.935, y: 0.915 },
    },
    isSelected: true,
  },
  {
    id: "chart",
    icon: "💰",
    gradient: {
      colors: GRADIENT_COLORS,
      start: GRADIENT_START,
      end: GRADIENT_END,
    },
    isSelected: false,
  },
  {
    id: "goal",
    icon: "🎯",
    gradient: {
      colors: ["#FD7F83", "#FEAD7E"] as const,
      start: { x: 0.065, y: 0.085 },
      end: { x: 0.935, y: 0.915 },
    },
    isSelected: false,
  },
];

const premiumIcon = `<svg width="27" height="31" viewBox="0 0 27 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.7252 4.04611L17.9676 4.48727C17.6771 4.55931 17.4119 4.70922 17.2003 4.92085C16.9888 5.13249 16.839 5.39783 16.7671 5.68829L16.326 7.44589C16.3237 7.45801 16.3173 7.46896 16.3078 7.47684C16.2984 7.48472 16.2864 7.48904 16.2741 7.48904C16.2618 7.48904 16.2499 7.48472 16.2404 7.47684C16.2309 7.46896 16.2245 7.45801 16.2223 7.44589L15.7811 5.68829C15.7093 5.39749 15.5596 5.1318 15.3479 4.91984C15.1363 4.70789 14.8708 4.55772 14.5801 4.48551L12.8225 4.04435C12.8107 4.04182 12.8001 4.03533 12.7925 4.02594C12.785 4.01656 12.7808 4.00486 12.7808 3.9928C12.7808 3.98073 12.785 3.96903 12.7925 3.95965C12.8001 3.95027 12.8107 3.94377 12.8225 3.94124L14.5801 3.50008C14.8706 3.42819 15.1359 3.2784 15.3475 3.06687C15.5592 2.85534 15.7091 2.59007 15.7811 2.29964L16.2223 0.542043C16.2245 0.529927 16.2309 0.518978 16.2404 0.511097C16.2499 0.503216 16.2618 0.498901 16.2741 0.498901C16.2864 0.498901 16.2984 0.503216 16.3078 0.511097C16.3173 0.518978 16.3237 0.529927 16.326 0.542043L16.7671 2.29964C16.8389 2.59024 16.9886 2.85574 17.2001 3.06749C17.4117 3.27925 17.677 3.42923 17.9676 3.50125L19.7252 3.94241C19.7373 3.94465 19.7482 3.95106 19.7561 3.96054C19.764 3.97001 19.7683 3.98194 19.7683 3.99426C19.7683 4.00658 19.764 4.01851 19.7561 4.02799C19.7482 4.03746 19.7373 4.04387 19.7252 4.04611Z" fill="white"/>
<path d="M22.7124 25.6939L23.7875 25.4244C23.9652 25.3803 24.1275 25.2886 24.2569 25.1592C24.3864 25.0297 24.4781 24.8674 24.5222 24.6897L24.7922 23.6141C24.7937 23.6067 24.7976 23.6001 24.8034 23.5953C24.8091 23.5906 24.8164 23.588 24.8239 23.588C24.8314 23.588 24.8386 23.5906 24.8444 23.5953C24.8502 23.6001 24.8541 23.6067 24.8555 23.6141L25.1256 24.6891C25.1697 24.8671 25.2616 25.0297 25.3914 25.1593C25.5212 25.2889 25.6839 25.3806 25.862 25.4244L26.9359 25.6939C26.9433 25.6953 26.9499 25.6992 26.9547 25.705C26.9594 25.7108 26.962 25.718 26.962 25.7255C26.962 25.733 26.9594 25.7403 26.9547 25.746C26.9499 25.7518 26.9433 25.7557 26.9359 25.7572L25.862 26.0272C25.6843 26.0713 25.522 26.163 25.3926 26.2925C25.2631 26.4219 25.1714 26.5842 25.1274 26.7619L24.8573 27.837C24.8559 27.8443 24.8519 27.851 24.8461 27.8557C24.8404 27.8605 24.8331 27.8631 24.8256 27.8631C24.8182 27.8631 24.8109 27.8605 24.8051 27.8557C24.7994 27.851 24.7954 27.8443 24.794 27.837L24.5239 26.7619C24.4799 26.5842 24.3882 26.4219 24.2587 26.2925C24.1292 26.163 23.9669 26.0713 23.7892 26.0272L22.7142 25.7572C22.7068 25.756 22.7 25.7522 22.6951 25.7466C22.6902 25.7409 22.6873 25.7337 22.6871 25.7262C22.6869 25.7188 22.6893 25.7114 22.694 25.7055C22.6986 25.6996 22.7051 25.6955 22.7124 25.6939Z" fill="white"/>
<path d="M0.0646405 24.3681L1.13853 24.0974C1.31629 24.0534 1.47866 23.9618 1.60813 23.8323C1.73761 23.7028 1.82926 23.5405 1.87321 23.3627L2.14329 22.2876C2.14471 22.2803 2.14865 22.2737 2.15442 22.2689C2.16019 22.2641 2.16745 22.2615 2.17493 22.2615C2.18242 22.2615 2.18967 22.2641 2.19544 22.2689C2.20121 22.2737 2.20515 22.2803 2.20657 22.2876L2.47665 23.3627C2.52054 23.5405 2.61217 23.7029 2.74166 23.8324C2.87114 23.9619 3.03355 24.0535 3.21133 24.0974L4.28639 24.3675C4.29374 24.3689 4.30037 24.3728 4.30513 24.3786C4.30989 24.3844 4.3125 24.3916 4.3125 24.3991C4.3125 24.4066 4.30989 24.4138 4.30513 24.4196C4.30037 24.4254 4.29374 24.4293 4.28639 24.4307L3.21133 24.7008C3.03361 24.7448 2.87126 24.8365 2.7418 24.966C2.61233 25.0954 2.52066 25.2578 2.47665 25.4355L2.20833 26.5141C2.20691 26.5214 2.20297 26.5281 2.1972 26.5328C2.19142 26.5376 2.18417 26.5402 2.17669 26.5402C2.1692 26.5402 2.16195 26.5376 2.15618 26.5328C2.15041 26.5281 2.14647 26.5214 2.14505 26.5141L1.87497 25.439C1.83123 25.2606 1.73948 25.0975 1.60966 24.9675C1.47985 24.8374 1.31692 24.7454 1.13853 24.7014L0.0634675 24.4313C0.0561404 24.4298 0.049583 24.4257 0.0449214 24.4199C0.0402598 24.414 0.0377851 24.4067 0.0379233 24.3992C0.0380621 24.3917 0.0408058 24.3845 0.0456815 24.3788C0.0505567 24.3731 0.057261 24.3693 0.0646405 24.3681Z" fill="white"/>
<path d="M3.69522 18.2845C3.47493 18.7953 2.57211 18.3214 2.57211 17.0459C2.5691 14.8177 3.41358 12.6717 4.93432 11.0431C4.97752 10.9979 5.00456 10.9396 5.01124 10.8774C5.01793 10.8152 5.00389 10.7525 4.9713 10.699C4.93871 10.6456 4.8894 10.6044 4.83102 10.5819C4.77263 10.5594 4.70845 10.5568 4.64842 10.5745C4.29095 10.6772 3.94047 10.8028 3.59913 10.9506C3.3062 11.076 3.02616 10.7461 3.20602 10.4819C4.09196 9.18958 5.3065 8.15692 6.72446 7.49033C8.14242 6.82375 9.71249 6.54737 11.2728 6.68968C12.8332 6.83198 14.3274 7.38783 15.6013 8.29992C16.8753 9.21201 17.883 10.4473 18.5206 11.8786C18.8034 12.5099 19.0097 13.1727 19.1351 13.853C19.1463 13.913 19.1377 13.9751 19.1108 14.0299C19.0839 14.0847 19.0401 14.1294 18.9857 14.1574C18.9314 14.1853 18.8696 14.195 18.8093 14.185C18.7491 14.1751 18.6936 14.1459 18.6512 14.102C17.8297 13.244 16.8427 12.5616 15.7499 12.0959C14.6571 11.6303 13.4812 11.3911 12.2934 11.3929C12.0239 11.3929 11.7573 11.404 11.4937 11.4298C7.00302 11.8323 5.37079 14.4019 3.69522 18.2845Z" fill="white"/>
<path d="M24.3388 13.4446C24.3532 13.5048 24.3869 13.5587 24.4348 13.598C24.4826 13.6374 24.542 13.66 24.6039 13.6624C24.6658 13.6649 24.7268 13.6471 24.7776 13.6116C24.8285 13.5762 24.8663 13.5252 24.8854 13.4663C24.9996 13.1124 25.091 12.7515 25.159 12.3859C25.2176 12.0731 25.6477 12.0233 25.766 12.3186C26.3471 13.7732 26.53 15.3564 26.2956 16.9052C26.0613 18.454 25.4182 19.9123 24.4328 21.1299C23.4473 22.3475 22.155 23.2803 20.6891 23.8323C19.2232 24.3843 17.6366 24.5355 16.0928 24.2702C15.4107 24.1548 14.7449 23.9581 14.1096 23.6844C14.0535 23.6603 14.0066 23.6188 13.9759 23.5659C13.9452 23.5131 13.9324 23.4518 13.9393 23.3911C13.9462 23.3304 13.9725 23.2736 14.0142 23.229C14.056 23.1844 14.111 23.1545 14.1711 23.1436C15.341 22.9379 16.4571 22.4971 17.4519 21.8479C18.4467 21.1987 19.2995 20.3546 19.9589 19.3665C20.1089 19.1427 20.2471 18.9148 20.3731 18.6816C22.5344 14.7247 21.3058 11.9395 19.0092 8.38797C18.7075 7.91928 19.6027 7.43418 20.6631 8.14308C22.5167 9.37978 23.8307 11.275 24.3388 13.4446Z" fill="white"/>
<path d="M9.19076 14.5237C9.24158 14.4896 9.30208 14.4728 9.36324 14.4758C9.4244 14.4788 9.48295 14.5015 9.53017 14.5405C9.57739 14.5795 9.61075 14.6327 9.62528 14.6921C9.63982 14.7516 9.63474 14.8142 9.61082 14.8706C9.14565 15.964 8.90716 17.1405 8.90978 18.3288C8.9124 19.517 9.15607 20.6924 9.62606 21.7838C9.7321 22.031 9.84751 22.2718 9.97758 22.5038C12.1189 26.4719 15.1238 26.9564 19.3514 26.967C19.9074 26.967 19.8283 27.9846 18.656 28.4902C16.6085 29.3704 14.3029 29.4389 12.2068 28.6818C12.1484 28.661 12.0847 28.6598 12.0256 28.6786C11.9665 28.6973 11.9151 28.7348 11.8793 28.7855C11.8435 28.8362 11.8253 28.8971 11.8274 28.9591C11.8295 29.0211 11.8519 29.0807 11.891 29.1288C12.126 29.4181 12.3792 29.692 12.6491 29.949C12.8794 30.1681 12.6872 30.5566 12.3755 30.4945C10.8386 30.1899 9.41076 29.4811 8.23906 28.4409C7.06736 27.4008 6.19423 26.067 5.70966 24.5771C5.22509 23.0871 5.14661 21.4949 5.4823 19.9645C5.818 18.4342 6.55573 17.021 7.61946 15.8707C8.08772 15.3607 8.61522 14.9085 9.19076 14.5237Z" fill="white"/>
<path d="M14.3492 20.3062C12.8395 20.3062 11.6156 19.0823 11.6156 17.5726C11.6156 16.0628 12.8395 14.8389 14.3492 14.8389C15.859 14.8389 17.0829 16.0628 17.0829 17.5726C17.0829 19.0823 15.859 20.3062 14.3492 20.3062Z" fill="white"/>
</svg>`;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [showPopup, setShowPopup] = useState(false);

  const renderDay = (item: (typeof CALENDAR_DATA)[0]) => {
    if (item.isSelected) {
      return (
        <LinearGradient
          colors={GRADIENT_COLORS}
          start={GRADIENT_START}
          end={GRADIENT_END}
          style={tw`items-center pt-2.5 pb-6.5 px-3 rounded-[14px]`}
        >
          <ArabicText style={tw`text-xs mb-1 font-medium text-white`}>
            {item.day}
          </ArabicText>
          <ArabicText style={tw`text-sm font-semibold text-white`}>
            {item.date}
          </ArabicText>
        </LinearGradient>
      );
    }

    return (
      <View style={tw`items-center pt-2.5 pb-6.5`}>
        <ArabicText style={tw`text-xs mb-1 font-medium text-[#BCC1CD]`}>
          {item.day}
        </ArabicText>
        <ArabicText style={tw`text-sm font-semibold text-[#2C2287]`}>
          {item.date}
        </ArabicText>
      </View>
    );
  };

  return (
    <GradientBackground hideTopBlob hideBottomBlob>
      <SafeAreaView style={tw`flex-1`}>
        {/* Header Container */}
        <View style={tw`bg-white rounded-b-4xl pt-6 pb-3.5 px-8`}>
          {/* Top Row */}
          <View style={tw`flex-row items-center justify-between`}>
            {/* Logo with Premium Icon */}
            <LinearGradient
              colors={GRADIENT_COLORS}
              start={GRADIENT_START}
              end={GRADIENT_END}
              style={tw`w-10 h-10 rounded-full overflow-hidden justify-center items-center`}
            >
              <SvgXml xml={premiumIcon} width={20} height={20} />
            </LinearGradient>

            {/* Profile Info */}
            <View style={tw`flex-row items-center`}>
              <View style={tw`items-end mr-3`}>
                <ArabicText style={tw`text-base font-medium`}>حسين</ArabicText>
                <ArabicText style={tw`text-xs text-gray-500`}>
                  24 يناير 1990
                </ArabicText>
              </View>
              <LinearGradient
                colors={GRADIENT_COLORS}
                start={GRADIENT_START}
                end={GRADIENT_END}
                style={tw`w-10 h-10 rounded-full overflow-hidden`}
              />
            </View>
          </View>

          {/* Calendar Section */}
          <View style={tw`flex-row justify-between mt-3`}>
            {CALENDAR_DATA.map((item) => (
              <Pressable key={item.date} style={tw`items-center`}>
                {renderDay(item)}
              </Pressable>
            ))}
          </View>
        </View>

        {/* Main Content Area */}
        <View style={tw`flex-1 items-center justify-center`}>
          <Pressable onPress={() => setShowPopup(true)}>
            <View
              style={[
                tw`bg-[#f7f3f6] rounded-full`,
                {
                  width: SCREEN_WIDTH - 48,
                  height: SCREEN_WIDTH - 48,
                  maxWidth: 600,
                  maxHeight: 600,
                  shadowColor: "#0000007f",
                  shadowOffset: {
                    width: 0,
                    height: 12,
                  },
                  shadowOpacity: 0.08,
                  shadowRadius: 48,
                  elevation: 6,
                },
              ]}
            />
          </Pressable>
        </View>

        {/* Quick Actions */}
        <View
          style={[
            tw`flex-row justify-around pb-8 items-center self-center`,
            { width: SCREEN_WIDTH * 0.8, maxWidth: 500 },
          ]}
        >
          {QUICK_ACTIONS.map((action) => (
            <Pressable key={action.id}>
              <LinearGradient
                colors={action.gradient.colors}
                start={action.gradient.start}
                end={action.gradient.end}
                style={[
                  tw`justify-center items-center shadow-sm rounded-full`,
                  {
                    width: action.isSelected ? 78 : 50,
                    height: action.isSelected ? 78 : 50,
                  },
                ]}
              >
                <ArabicText style={tw`text-2xl text-white`}>
                  {action.icon}
                </ArabicText>
              </LinearGradient>
            </Pressable>
          ))}
        </View>

        {/* Popup Modal */}
        <Modal
          visible={showPopup}
          transparent
          animationType='fade'
          onRequestClose={() => setShowPopup(false)}
        >
          <View style={tw`flex-1 bg-black/50 justify-center items-center px-6`}>
            <Pressable
              style={tw`absolute inset-0`}
              onPress={() => setShowPopup(false)}
            />
            <View style={tw`w-full max-w-md`}>
              <Card>
                <View style={tw`p-6`}>
                  <ArabicText style={tw`text-base font-medium text-center`}>
                    {`هناك حقيقة مثبتة منذ زمن طويل وهي ان المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص او شكل توضع الفقرات في الصفحة التي يقراها. ولذلك يتم استخدام طريقة لوريم ايبسوم لانها تعطي توزيعاً طبيعياً -الى حد ما- للاحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (اي الاحرف) وكانها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم ايبسوم بشكل افتراضي كنموذج عن النص، واذا قمت بادخال "lorem ipsum" في اي محرك بحث ستظهر العديد من المواقع الحديثة العهد في نتائج البحث. على مدى السنين ظهرت نسخ جديدة ومختلفة من نص لوريم ايبسوم، احياناً عن طريق الصدفة، واحياناً عن عمد كإدخال بعض العبارات الفكاهية إليها. هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم تعديلها بشكل ما عبر إدخال بعض النوادر أو الكلمات العشوائية إلى النص. إن كنت تريد أن تستخدم نص لوريم إيبسوم ما، عليك أن تتحقق أولاً أن ليس هناك أي كلمات أو عبارات محرجة أو غير لائقة مخبأة في هذا النص.`}
                  </ArabicText>
                </View>
              </Card>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default HomeScreen;
