import { View } from "react-native-ui-lib";
import { useSearchParams } from "expo-router";

import QrCode, { TypeUUIDsQRCode } from "~components/qrCode/qrCode";

export default function WorkerQrCodePage() {
  const params = useSearchParams();
  const data = params.data as string;
  const workerId = params.workerId as string;

  const listOfUUID: string[] = JSON.parse(data);
  return (
    <View className="flex items-center justify-center py-4 h-full bg-green-400">
      <View bg-screenBG className="w-[80%] p-10 rounded-3xl flex items-center">
        <QrCode<TypeUUIDsQRCode>
          UUIDs={listOfUUID}
          workerId={workerId}
          withIcon={true}
        />
      </View>
    </View>
  );
}
