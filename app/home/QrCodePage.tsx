import { View, Text } from "react-native-ui-lib";
import { useSearchParams } from "expo-router";

import QrCode from "~components/qrCode/qrCode";

export default function QrCodePage() {
  const t = useSearchParams();
  const data = t.data as string;

  // list of UUIDs
  console.log(JSON.parse(data), "parsed data");
  const listOfUUID: string[] = JSON.parse(data);
  return (
    <View bg-screenBG className="flex items-center justify-center py-4 h-full">
      <QrCode UUIDs={listOfUUID} withIcon={false} />
    </View>
  );
}
