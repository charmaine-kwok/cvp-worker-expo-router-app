import { View, Text } from "react-native-ui-lib";
import { useAtomValue } from "jotai";
import { FlatList } from "react-native";

import expiredCredentialsAtom from "~atoms/expiredCredentials";
import { fontSizeAtom } from "~atoms/fontSize";

const ExpiredCredentialsList: React.FC = () => {
  const expiredCredentialsData = useAtomValue(expiredCredentialsAtom);
  console.log(expiredCredentialsData);
  const fontSizeData = useAtomValue(fontSizeAtom);

  return (
    <View>
      <FlatList
        className="h-full"
        data={expiredCredentialsData}
        renderItem={({ item }) => (
          <View key={item.UUID}>
            <View className="py-2 px-4">
              <Text textColor className={`text-${fontSizeData + 1}xl`}>
                {item.UUID}
                {"\n"}
                {item.issuer} {"\n"}
                {item.credentialType}
              </Text>
            </View>
            <View bg-textColor className="h-[1px]"></View>
          </View>
        )}
        keyExtractor={(item) => item.UUID}
      />
    </View>
  );
};

export default ExpiredCredentialsList;
