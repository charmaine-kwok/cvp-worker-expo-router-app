import { View, Text, Button } from "react-native-ui-lib";
import { useSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

import QrCode, { TypeFieldsQRCode } from "~components/qrCode/qrCode";

export default function AdminQrCodePage() {
  const params = useSearchParams();
  const selectedFields = params.selectedFields as string;
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View className="flex items-center justify-center py-4 h-full bg-blue-400">
      <View bg-screenBG className="w-[80%] p-10 rounded-3xl flex items-center">
        <QrCode<TypeFieldsQRCode>
          selectedFields={selectedFields}
          withIcon={true}
        />
      </View>
      <Button
        bg-black
        onPress={() => {
          router.push("/home/BarCodeScanner");
        }}
        className="w-[80%] my-1 sm:my-2 mt-6"
      >
        <Text white className="text-base my-2">
          {t("Scan worker's QR code")}
        </Text>
      </Button>
    </View>
  );
}
