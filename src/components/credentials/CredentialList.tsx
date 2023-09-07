import { useAtomValue } from "jotai";
import { AntDesign } from "@expo/vector-icons";
import { Text, View, Button } from "react-native-ui-lib";
import { SafeAreaView, Platform, UIManager } from "react-native";
import { AccordionList } from "react-native-accordion-list-view";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { DarkThemeAtom } from "~atoms/darkTheme";
import CredentialListItem from "./CredentialListItem";
import { itemProps } from "~functions/api/credential/getCredentialList";
import { fontSizeAtom } from "~atoms/fontSize";

type CrendentialListProps = {
  // showLoadMoreButton: boolean;
  // loadMoreData: () => void;
  credentials: [string, itemProps[]][];
};

interface fields {
  "Credential Type": string[];
  Issuer: string[];
}
export type FilterFieldsProps =
  | Pick<fields, "Credential Type" | "Issuer">
  | { Valid: ["Valid", "Not Valid"] };

const CrendentialList: React.FC<CrendentialListProps> = ({
  // showLoadMoreButton,
  // loadMoreData,
  credentials,
}) => {
  const { t } = useTranslation();

  const fontSizeData = useAtomValue(fontSizeAtom);

  useEffect(() => {
    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

  const isDarkTheme = useAtomValue(DarkThemeAtom);

  const renderFooter = () => {
    const selectedCredentials = { selectedCredentials: [] };

    return (
      <View>
        <Button
          bg-textColor
          label="Load More"
          screenBG
          iconOnRight
          iconSource={() => (
            <View className="ml-2">
              <AntDesign
                name="caretdown"
                size={12}
                color={`${isDarkTheme ? "black" : "white"}`}
              />
            </View>
          )}
          // onPress={loadMoreData}
        ></Button>
      </View>
    );
  };

  return (
    <SafeAreaView className="h-[85%]">
      <View
        style={{
          paddingVertical: "2%",
          paddingHorizontal: "3%",
        }}
      >
        <AccordionList
          containerItemStyle={{
            backgroundColor: "white",
          }}
          data={credentials}
          customTitle={([issuer, _]: [string, any]) => (
            <View className="">
              <Text
                className={`text-${fontSizeData + 1}xl  py-4 pl-2  text-black`}
              >
                {t(`${issuer}`)}
              </Text>
            </View>
          )}
          customBody={([_, items]) =>
            items.map((item: itemProps, index: number) => (
              <View key={index}>
                <CredentialListItem item={item} />
              </View>
            ))
          }
          animationDuration={400}
          expandMultiple={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default CrendentialList;
