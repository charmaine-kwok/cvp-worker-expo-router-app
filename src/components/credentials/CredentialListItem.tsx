import { Text, TouchableOpacity, View } from "react-native-ui-lib";
import { useRouter } from "expo-router";
import { useAtomValue } from "jotai";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import Checkbox from "react-native-modest-checkbox";
import { useAtom } from "jotai";

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

  const router = useRouter();

  return (
    <View className="flex flex-row border-t items-center relative py-6 px-2">
      <Checkbox
        label=""
        checked={checked}
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
      <TouchableOpacity
        onPress={() => {
          // TODO:
          router.push("/home/credential/");
        }}
        className=" absolute top-0 right-0 py-4 px-2"
      >
        <AntDesign name="infocirlceo" size={15} />
      </TouchableOpacity>
    </View>
  );
};

export default CredentialListItem;
