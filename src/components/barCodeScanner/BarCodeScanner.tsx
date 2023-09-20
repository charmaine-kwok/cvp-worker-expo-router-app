import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import { BarCodeScanner } from "expo-barcode-scanner";
import BarcodeMask from "react-native-barcode-mask";
import { useAtomValue } from "jotai";
import { useRouter } from "expo-router";

import { usernameAtom } from "~atoms/username";
import { itemProps } from "~functions/api/credential/getCredentialList";
import {
  validateScannedFields,
  validateScannedUUIDs,
} from "~functions/helper/ajv";
import getTime from "~functions/getTime";
import { credentialsAtom } from "~atoms/credentials";
const { width } = Dimensions.get("window");

export default function BarCodeScan() {
  const router = useRouter();
  const credentials = useAtomValue(credentialsAtom);
  const username = useAtomValue(usernameAtom);

  const { t } = useTranslation();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);

    const timeObj = getTime();
    const currentTime = timeObj.currentTime;

    let scannedData: {
      date: string;
      UUIDs?: string[];
      selectedFields?: string[];
      workerId?: string;
      timeStamp: number;
    };

    // QR code checking
    try {
      scannedData = JSON.parse(data);
    } catch (error) {
      console.log(error);
      console.log("Scanned data is not a JSON object");
      Alert.alert("Error", "Invalid data format", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    console.log("Scanned data:", scannedData);

    if (username !== "admin") {
      console.log("sth like that");

      if (validateScannedFields(scannedData)) {
        const timeStamp = scannedData.timeStamp as number;
        // Check if the scanned QR code has expired (i.e. produced more than 1 minute ago)
        if (currentTime - timeStamp > 60000) {
          Alert.alert("Error", "The QR Code has expired", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }

        const filteredCreds = credentials.filter((credential: itemProps) => {
          return (
            scannedData.selectedFields.includes(credential.issuer) &&
            scannedData.selectedFields.includes(credential.credentialType)
          );
        });

        router.push({
          pathname: "home/QrCodePage",
          params: {
            data: JSON.stringify(filteredCreds.map((item) => item.UUID)),
            workerId: username,
          },
        });
      } else {
        Alert.alert("Error", "Invalid data format", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } else {
      console.log("sth like that");
      if (validateScannedUUIDs(scannedData)) {
        const timeStamp = scannedData.timeStamp as number;
        // Check if the scanned QR code has expired (i.e. produced more than 1 minute ago)
        if (currentTime - timeStamp > 60000) {
          Alert.alert("Error", "The QR Code has expired", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }

        console.log("scanned", scannedData);

        router.push({
          pathname: "home/ScannedResultsPage",
          params: {
            data: data,
          },
        });
      } else {
        Alert.alert("Error", "Invalid data format", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    }
  };

  if (hasPermission === null) {
    return (
      <View className="justify-center items-center">
        <Text>{t("Requesting for camera permission")}</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return <Text>{t("No access to camera")}</Text>;
  }

  return (
    <View className="flex-1 justify-center">
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      >
        <BarcodeMask width={width * 0.8} height={width * 0.8} />
      </BarCodeScanner>
      {scanned && (
        <Button
          title={`${t("TapToScanAgain")}`}
          onPress={() => setScanned(false)}
        />
      )}
    </View>
  );
}
