import QRCode from "react-native-qrcode-svg";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useAtomValue } from "jotai";

import getTime from "~functions/getTime";
import { DarkThemeAtom } from "~atoms/darkTheme";
import { selectedCredentialsAtom } from "~atoms/selectedCredentials";

export const QrCode: React.FC = () => {
  const [timeStamp, setTimestamp] = useState<number>(null);
  const [dateFormat, setDateFormat] = useState<string>("");

  const isDarkTheme = useAtomValue(DarkThemeAtom);
  const selectedCredentials = useAtomValue(selectedCredentialsAtom);

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
        logo={icon}
        value={JSON.stringify({
          selectedCredentials: selectedCredentials,
          timeStamp: timeStamp,
          date: dateFormat,
        })}
      />
    </View>
  );
};

export default QrCode;
