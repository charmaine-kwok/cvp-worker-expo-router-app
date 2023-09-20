import { View, Text } from "react-native-ui-lib";
import { useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";

import getCredentialDetails from "~functions/api/credential/getCredentialDetails";
import { itemProps } from "~functions/api/credential/getCredentialList";
import { getValueFor } from "app/(auth)/sign-in";
import { fontSizeAtom } from "~atoms/fontSize";
import Loading from "~components/Loading";

export default function ScannedResultsPage() {
  const fontSizeData = useAtomValue(fontSizeAtom);
  const params = useSearchParams();
  const data = params.data as string;
  console.log("data", data);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const scannedData: {
    date: string;
    UUIDs: string[];
    workerId: string;
    timeStamp: number;
  } = JSON.parse(data);
  const [creds, setCreds] = useState([] as itemProps[]);

  console.log("scannedDataID", scannedData);
  console.log("workerId", scannedData.workerId);
  console.log("UUIDs", scannedData.UUIDs);

  const fetchData = async () => {
    setIsLoading(true);
    const accessToken = await getValueFor("accessToken");

    const fetchData = async (UUID: string, accessToken: string) => {
      try {
        const data = await getCredentialDetails(UUID, accessToken);
        setIsLoading(false);
        if (data) {
          return {
            UUID: data.UUID,
            isValid: data.is_valid,
            credentialType: data.credential_type,
            issuer: data.issuer,
            start_date: data.start_date,
            end_date: data.end_date,
          };
        }
      } catch (e) {
        console.log("error:", e);
      }
    };

    const creds: itemProps[] = await Promise.all(
      scannedData.UUIDs.map((UUID: string) => fetchData(UUID, accessToken)),
    );

    console.log("fetchdata", data);
    if (creds && creds.length > 0) {
      console.log("creds", creds);

      // seperate cert into valid and expired
      let validItems = creds.filter((item) => item.isValid);
      console.log("valid", validItems);
      setCreds(validItems);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // list of UUIDs
  console.log(JSON.parse(data), "scaned data");
  const listOfUUID: string[] = JSON.parse(data);
  return (
    <View bg-screenBG className="py-4 h-full">
      {isLoading && <Loading />}
      <FlatList
        className="h-full"
        data={creds}
        renderItem={({ item }) => (
          <View key={item.UUID}>
            <View className="px-4 py-2">
              <Text textColor className={`text-${fontSizeData + 1}xl`}>
                {item.UUID}
                {"\n"}
                {t(`${item.issuer}`)}
                {"\n"}
                {t(`${item.credentialType}`)}
              </Text>
            </View>
            <View bg-textColor className="h-[1px]" />
          </View>
        )}
        keyExtractor={(item) => item.UUID}
      />
    </View>
  );
}
