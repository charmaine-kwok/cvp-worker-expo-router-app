import { View } from "react-native-ui-lib";
import { useAtomValue } from "jotai";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import CustomButton from "./CustomButton";
import { DarkThemeAtom } from "~atoms/darkTheme";

const ExpiredButton: React.FC = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const isDarkTheme = useAtomValue(DarkThemeAtom);

  return (
    <View className="absolute bottom-0 mb-4 flex w-full items-center px-4">
      <CustomButton
        text={t("Expired Credentials")}
        flexDir="column"
        fgColor={isDarkTheme ? "#000000" : "#ffffff"}
        bold={false}
        bgColor={isDarkTheme ? "#ffffff" : "#000000"}
        onPress={() => {
          router.push("/home/credential/ExpiredCredentials");
        }}
      ></CustomButton>
    </View>
  );
};

export default ExpiredButton;
