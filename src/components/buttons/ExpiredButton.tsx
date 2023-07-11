import { View } from "react-native-ui-lib";
import { useAtomValue } from "jotai";
import { useRouter } from "expo-router";

import CustomButton from "./CustomButton";
import { DarkThemeAtom } from "~atoms/darkTheme";

const ExpiredButton: React.FC = () => {
  const router = useRouter();
  const isDarkTheme = useAtomValue(DarkThemeAtom);

  return (
    <View className="absolute bottom-0 w-full mb-4 flex items-center px-4">
      <CustomButton
        text="Expired Credentials"
        flexDir="column"
        fgColor={isDarkTheme ? "#000000" : "#ffffff"}
        widthPerct="100%"
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
