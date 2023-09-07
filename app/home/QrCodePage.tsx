import { View } from "react-native-ui-lib";
import { useSearchParams } from "expo-router";

import QrCode from "~components/qrCode/qrCode";

export default function QrCodePage() {
  const params = useSearchParams();
  const data = params.data as string;
  const workerId = params.workerId as string;

  const listOfUUID: string[] = JSON.parse(data);
  return (
    <View bg-screenBG className="flex items-center justify-center py-4 h-full">
      <QrCode UUIDs={listOfUUID} workerId={workerId} withIcon={false} />
    </View>
  );
}
