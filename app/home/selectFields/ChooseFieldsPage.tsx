import { useState } from "react";
import { View } from "react-native-ui-lib";
import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";
import { useRouter } from "expo-router";

import MultipleSelectList from "~components/MultipleSelectList";
import CustomButton from "~components/buttons/CustomButton";
import { DarkThemeAtom } from "~atoms/darkTheme";

const ChooseFieldsPage: React.FC = () => {
  const { t } = useTranslation();
  const isDarkTheme = useAtomValue(DarkThemeAtom);

  const [selected, setSelected] = useState("");
  const [selectedFields, setSelectedFields] = useState<any>(null);
  const data = [
    { value: t("Issuers"), disabled: true },
    { key: "I", value: "CIC" },
    { key: "I", value: "EMSD" },
    { key: "I", value: "TT" },
    { value: t("Credential Type"), disabled: true },
    { key: "T", value: "Certificate" },
    { key: "T", value: "Trade" },
    { key: "T", value: "Worker Card" },
  ];
  const router = useRouter();

  return (
    <View bg-screenBG className="h-full p-4">
      <View className="bg-white pt-3 pb-2 px-2 rounded-lg">
        <MultipleSelectList
          setSelected={(val: string) => {
            setSelected(val);
          }}
          onSelect={() => {
            setSelectedFields(selected);
            console.log(selectedFields);
          }}
          data={data}
          placeholder={t("Select Required Credentials")}
          searchPlaceholder={t("Search")}
          save="value"
          label={t("Selected")}
          selectedLabel={t("Selected")}
        />
      </View>
      <View className="flex items-center px-4">
        {selected && selected.length > 0 && (
          <CustomButton
            text={t("Generate QR code")}
            flexDir="column"
            fgColor={isDarkTheme ? "#000000" : "#ffffff"}
            bold={false}
            bgColor={isDarkTheme ? "#ffffff" : "#000000"}
            onPress={() => {
              router.push({
                pathname: "home/selectFields/AdminQrCodePage",
                params: {
                  selectedFields: JSON.stringify(selectedFields),
                },
              });
            }}
          ></CustomButton>
        )}
      </View>
    </View>
  );
};

export default ChooseFieldsPage;
