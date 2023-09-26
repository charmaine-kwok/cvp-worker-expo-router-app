import { Text, View } from "react-native-ui-lib";
import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";

import { fontSizeAtom } from "~atoms/fontSize";
import { itemProps } from "~functions/api/credential/getCredentialList";

type CredentialListItemProps = {
  item: itemProps;
};

const CredentialListItem: React.FC<CredentialListItemProps> = ({ item }) => {
  const { t } = useTranslation();

  const fontSizeData = useAtomValue(fontSizeAtom);

  return (
    <View className="relative flex flex-row items-center border-t px-2 py-6">
      <View className="flex flex-row justify-between mb-4 w-full">
        <View className="flex flex-col">
          <Text className={`text-${fontSizeData}xl text-black`}>
            {t("Credential Type:\n")}
            {item.credentialType}
          </Text>
        </View>
        <View className="flex flex-col">
          <Text className={`text-${fontSizeData}xl text-black`}>
            {t("Start date:\n")}
            {item.start_date.split("T")[0]}
          </Text>
        </View>
        <View className="flex flex-col">
          <Text className={`text-${fontSizeData}xl text-black`}>
            {t("End date:\n")}
            {item.end_date.split("T")[0]}
          </Text>
        </View>
      </View>
      <View className="absolute bottom-0 right-0">
        <Text className="text-black opacity-20">{item.UUID}</Text>
      </View>
    </View>
  );
};

export default CredentialListItem;
