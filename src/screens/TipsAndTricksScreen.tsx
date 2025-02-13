import React from "react";
import { View, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import tw from "../utils/tailwind";
import AppHeader from "../components/shared/AppHeader";
import ArabicText from "../components/shared/ArabicText";
import GradientBackground from "../components/shared/GradientBackground";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const TipsAndTricksScreen = () => {
  const navigation = useNavigation();

  return (
    <GradientBackground hideTopBlob hideBottomBlob>
      <SafeAreaView style={tw`flex-1`}>
        {/* Fixed Header */}
        <AppHeader
          title='نصائح وحيل'
          onBackPress={() => navigation.goBack()}
        />
        {/* <View style={tw`bg-white rounded-b-[10px] justify-end pb-4 pt-10`}>
          <View style={tw`flex-row items-center justify-between px-8`}>
            <View style={tw`w-10`} />
            <ArabicText style={tw`text-xl font-bold text-black`}>
              نصائح وحيل
            </ArabicText>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={tw`p-2`}
            >
              <Feather name='chevron-right' size={24} color='black' />
            </TouchableOpacity>
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          style={tw`flex-1`}
          contentContainerStyle={tw`px-8 py-4 grow`}
          showsVerticalScrollIndicator={false}
        >
          <View style={tw`bg-white rounded-[16px] p-4`}>
            <ArabicText style={tw`text-sm text-right text-black`}>
              هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما
              سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات
              في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها
              تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد
              محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص
              مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب
              تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص، وإذا قمت بإدخال
              "lorem ipsum" في أي محرك بحث ستظهر العديد من المواقع الحديثة العهد
              في نتائج البحث. على مدى السنين ظهرت نسخ جديدة ومختلفة من نص لوريم
              إيبسوم، أحياناً عن طريق الصدفة، وأحياناً عن عمد كإدخال بعض
              العبارات الفكاهية إليها. هناك حقيقة مثبتة منذ زمن طويل وهي أن
              المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي
              للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام
              طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف
              عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها
              تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي
              وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج
              عن النص، وإذا قمت بإدخال "lorem ipsum" في أي محرك بحث ستظهر العديد
              من المواقع الحديثة العهد في نتائج البحث. على مدى السنين ظهرت نسخ
              جديدة ومختلفة من نص لوريم إيبسوم، أحياناً عن طريق الصدفة، وأحياناً
              عن عمد كإدخال بعض العبارات الفكاهية إليها. هناك حقيقة مثبتة منذ
              زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز
              على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها.
              ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ
              -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد
              محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من
              برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم
              بشكل إفتراضي كنموذج عن النص، وإذا قمت بإدخال "lorem ipsum" في أي
              محرك بحث ستظهر العديد من المواقع الحديثة العهد في نتائج البحث. على
              مدى السنين ظهرت نسخ جديدة ومختلفة من نص لوريم إيبسوم، أحياناً عن
              طريق الصدفة، وأحياناً عن عمد كإدخال بعض العبارات الفكاهية إليها.
              هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما
              سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات
              في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها
              تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد
              محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص
              مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب
              تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص، وإذا قمت بإدخال
              "lorem ipsum" في أي محرك بحث ستظهر العديد من المواقع الحديثة العهد
              في نتائج البحث. على مدى السنين ظهرت نسخ جديدة ومختلفة من نص لوريم
              إيبسوم، أحياناً عن طريق الصدفة، وأحياناً عن عمد كإدخال بعض
              العبارات الفكاهية إليها.
            </ArabicText>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default TipsAndTricksScreen;
