import QRCode from "react-native-qrcode-svg";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useAtomValue } from "jotai";

import getTime from "~functions/getTime";
import { DarkThemeAtom } from "~atoms/darkTheme";

type TypeQRCode = TypeFieldsQRCode | TypeUUIDsQRCode;

export type TypeFieldsQRCode = {
  selectedFields: string;
  withIcon?: boolean;
};

export type TypeUUIDsQRCode = {
  UUIDs: string[];
  workerId: string;
  withIcon?: boolean;
};

export function QrCode<T extends TypeQRCode>(props: T) {
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

  let qrValue: any = {
    timeStamp: timeStamp,
    date: dateFormat,
  };

  if ("selectedFields" in props) {
    qrValue.selectedFields = JSON.parse(props.selectedFields);
  } else {
    qrValue.UUIDs = props.UUIDs;
    qrValue.workerId = props.workerId;
  }

  return (
    <View className="mb-4">
      <QRCode
        backgroundColor={isDarkTheme ? "black" : "white"}
        color={isDarkTheme ? "white" : "black"}
        size={250}
        logoBackgroundColor={isDarkTheme ? "black" : "white"}
        logoSize={50}
        logo={props.withIcon && icon}
        value={JSON.stringify(qrValue)}
      />
    </View>
  );
}

export default QrCode;
