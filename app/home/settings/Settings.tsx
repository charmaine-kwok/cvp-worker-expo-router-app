import { useState } from "react";
import { Pressable, FlatList, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Text } from "react-native-ui-lib";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useAtomValue } from "jotai";

import { removeAccessToken } from "app/(auth)/sign-in";
import FontSizeModal from "~components/modal/FontSizeModal";
import { fontSizeAtom } from "~atoms/fontSize";

export default function Settings() {
  const [isVisible, setIsVisible] = useState(false);

  const { t } = useTranslation();
  const router = useRouter();

  const fontSizeData = useAtomValue(fontSizeAtom);

  const settingsList: { name: string; onPress: () => any }[] = [
    {
      name: t("Language"),
      onPress: () => {
        router.push("/home/settings/language");
      },
    },
    {
      name: t("FontSize"),
      onPress: () => {
        setIsVisible(true);
      },
    },
    {
      name: t("DarkMode"),
      onPress: () => {
        router.push("/home/settings/theme");
      },
    },
    {
      name: t("SignOut"),

      onPress: () => {
        removeAccessToken("accessToken");
        router.replace("/(auth)/sign-in");
      },
    },
  ];

  return (
    <>
      <FontSizeModal isVisible={isVisible} setIsVisible={setIsVisible} />

      <FlatList
        data={settingsList}
        ListFooterComponent={
          <View className="opacity-60 justify-between flex-row border-b-2 py-4 mx-2 border-slate-300 ">
            <Text textColor className={`ml-4 text-${fontSizeData + 1}xl`}>
              {t("Build")}
            </Text>
            <Text textColor className={`mr-4 text-${fontSizeData + 1}xl `}>
              v 1.0.0
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={item.onPress}
            className="justify-between flex-row border-b-2 py-4 mx-2 border-slate-300"
          >
            <Text textColor className={`ml-4 text-${fontSizeData + 1}xl`}>
              {item.name}
            </Text>
            <View className="mr-4 flex justify-center">
              <Text textColor>
                <AntDesign name="right" size={24} />
              </Text>
            </View>
          </Pressable>
        )}
      />
    </>
  );
}
