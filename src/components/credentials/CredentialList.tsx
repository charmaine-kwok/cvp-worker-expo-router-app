import { useAtomValue } from "jotai";
import { Text, View } from "react-native-ui-lib";
import { SafeAreaView, Platform, UIManager } from "react-native";
import { AccordionList } from "react-native-accordion-list-view";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import CredentialListItem from "./CredentialListItem";
import { itemProps } from "~functions/api/credential/getCredentialList";
import { fontSizeAtom } from "~atoms/fontSize";

type CrendentialListProps = {
  credentials: [string, itemProps[]][];
};

interface fields {
  "Credential Type": string[];
  Issuer: string[];
}
export type FilterFieldsProps =
  | Pick<fields, "Credential Type" | "Issuer">
  | { Valid: ["Valid", "Not Valid"] };

const CrendentialList: React.FC<CrendentialListProps> = ({ credentials }) => {
  const { t } = useTranslation();

  const fontSizeData = useAtomValue(fontSizeAtom);

  useEffect(() => {
    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

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
            <View>
              <Text
                className={`text-${fontSizeData + 1}xl  py-4 pl-2 text-black`}
              >
                {t(issuer)}
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
