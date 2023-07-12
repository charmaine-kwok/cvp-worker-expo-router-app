import { Text, View } from "react-native-ui-lib";
import { useAtomValue, useAtom } from "jotai";
import { useState } from "react";
import Checkbox from "react-native-modest-checkbox";

import MoreInfo from "./MoreInfo";
import { selectedCredentialsAtom } from "~atoms/selectedCredentials";
import { fontSizeAtom } from "~atoms/fontSize";
import { itemProps } from "~functions/api/credential/getCredentialList";

type CredentialListItemProps = {
  item: itemProps;
};

const CredentialListItem: React.FC<CredentialListItemProps> = ({ item }) => {
  const fontSizeData = useAtomValue(fontSizeAtom);
  const [selectedCredentials, setSelectedCredentials] = useAtom(
    selectedCredentialsAtom,
  );
  const [checked, setChecked] = useState(false);
  const [isHintVisible, setIsHintVisible] = useState(false);

  return (
    <View className="flex flex-row border-t items-center relative py-6 px-2">
      <Checkbox
        label=""
        checked={selectedCredentials.includes(item.UUID)}
        onChange={() => {
          setChecked(!checked);
          if (selectedCredentials.includes(item.UUID)) {
            const updatedItems = selectedCredentials.filter(
              (uuid) => uuid !== item.UUID,
            );
            setSelectedCredentials(updatedItems);
            console.log(updatedItems);
          } else {
            setSelectedCredentials((prevItems) => [...prevItems, item.UUID]);
            console.log([...selectedCredentials, item.UUID]);
          }
        }}
      />
      <Text
        className={`text-${fontSizeData}xl text-black`}
      >{`Credential Type: ${item.credentialType} `}</Text>
      <View className="absolute right-0 bottom-0">
        <Text className="opacity-20 text-black">{item.UUID}</Text>
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
