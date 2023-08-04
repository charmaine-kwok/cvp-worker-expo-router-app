import QRCode from "react-native-qrcode-svg";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useAtomValue } from "jotai";

import getTime from "~functions/getTime";
import { DarkThemeAtom } from "~atoms/darkTheme";

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];
type Props = {
  selectedFields?: any;
  UUIDs?: any;
  withIcon: boolean;
};

type QrCodeProps = AtLeastOne<Props>;

export const QrCode: React.FC<QrCodeProps> = ({
  selectedFields,
  UUIDs,
  withIcon = true,
}) => {
  const [timeStamp, setTimestamp] = useState<number>(null);
  const [dateFormat, setDateFormat] = useState<string>("");

  const isDarkTheme = useAtomValue(DarkThemeAtom);
  useEffect(() => {
    getTime(setTimestamp, setDateFormat);
    const interval = setInterval(() => {
      getTime(setTimestamp, setDateFormat);
    }, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  let icon = require("../../../assets/icon/icons8.png");
  return (
    <View className="mb-4">
      <QRCode
        backgroundColor={isDarkTheme ? "black" : "white"}
        color={isDarkTheme ? "white" : "black"}
        size={250}
        logoBackgroundColor={isDarkTheme ? "black" : "white"}
        logoSize={50}
        logo={withIcon && icon}
        value={JSON.stringify({
          selectedFields: selectedFields,
          UUIDs: UUIDs,
          timeStamp: timeStamp,
          date: dateFormat,
        })}
      />
    </View>
  );
};

export default QrCode;
