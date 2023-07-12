import { View } from "react-native-ui-lib";
import { useTranslation } from "react-i18next";

import CustomButton from "./CustomButton";

const GenerateQRCodeButton: React.FC<{ setIsVisible: any }> = ({
  setIsVisible,
}) => {
  const { t } = useTranslation();

  return (
    <View className="px-4">
      <CustomButton
        onPress={setIsVisible}
        text={`${t("Generate QR code")}`}
        flexDir="column"
        fgColor="#ffffff"
        widthPerct="100%"
        bold={true}
        bgColor="#2696dccf"
      />
    </View>
  );
};

export default GenerateQRCodeButton;
