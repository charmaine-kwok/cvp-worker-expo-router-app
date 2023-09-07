import { useState } from "react";
import { View } from "react-native-ui-lib";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";

import QRCodeModal from "~components/modal/QRCodeModal";
import CustomButton from "~components/buttons/CustomButton";
import { DarkThemeAtom } from "~atoms/darkTheme";

const ChooseFields: React.FC<{ setIsVisible: any }> = () => {
  const { t } = useTranslation();
  const isDarkTheme = useAtomValue(DarkThemeAtom);

  const [selected, setSelected] = useState("");
  const [selectedFields, setSelectedFields] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const data = [
    { key: "0", value: t("Issuers"), disabled: true },
    { key: "1", value: "Issuer1" },
    { key: "3", value: "Issuer2" },
    { key: "4", value: t("Credential Type"), disabled: true },
    { key: "5", value: "type1" },
    { key: "6", value: "type2" },
    { key: "7", value: "type3" },
  ];

  return (
    <View bg-screenBG className="h-full p-4">
      <QRCodeModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        selectedFields={selectedFields}
      />
      <View className="bg-white pt-3 pb-2 px-2 rounded-lg">
        <MultipleSelectList
          setSelected={(val) => {
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
          label="Categories"
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
              setIsVisible(!isVisible);
            }}
          ></CustomButton>
        )}
      </View>
    </View>
  );
};

export default ChooseFields;
