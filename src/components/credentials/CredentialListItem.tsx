import { Text, View } from "react-native-ui-lib";
import { useAtomValue } from "jotai";
import { useState } from "react";

import MoreInfo from "./MoreInfo";
import { fontSizeAtom } from "~atoms/fontSize";
import { itemProps } from "~functions/api/credential/getCredentialList";

type CredentialListItemProps = {
  item: itemProps;
};

const CredentialListItem: React.FC<CredentialListItemProps> = ({ item }) => {
  const fontSizeData = useAtomValue(fontSizeAtom);
  const [isHintVisible, setIsHintVisible] = useState(false);

  return (
    <View className="relative flex flex-row items-center border-t px-2 py-6">
      <Text
        className={`text-${fontSizeData}xl text-black`}
      >{`Credential Type: ${item.credentialType} `}</Text>
      <View className="absolute bottom-0 right-0">
        <Text className="text-black opacity-20">{item.UUID}</Text>
      </View>
      <MoreInfo
        isHintVisible={isHintVisible}
        setIsHintVisible={setIsHintVisible}
        start_date={item.start_date.split("T")[0]}
        end_date={item.end_date.split("T")[0]}
      />
    </View>
  );
};

export default CredentialListItem;
