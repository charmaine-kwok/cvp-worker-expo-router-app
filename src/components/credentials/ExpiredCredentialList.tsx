import { View, Text, GridList } from "react-native-ui-lib";
import {
  ExpiredCrendentials,
  expiredCredentialsAtom,
} from "~atoms/expiredCredentials";
import { useAtomValue, useAtom } from "jotai";
import { ReactElement, JSXElementConstructor } from "react";
import { ListRenderItemInfo, FlatList } from "react-native";

const ExpiredCredentialsList: React.FC = () => {
  const [expiredCredentialsData, setExpiredCredentialsData] = useAtom(
    expiredCredentialsAtom,
  );
  console.log(expiredCredentialsData);

  return (
    <View>
      {/* {expiredCredentialsData.map((item) => (
        <View key={item.UUID}>
          <Text>{item.UUID}</Text>
          <Text>{item.issuer}</Text>
          <Text>{item.credentialType}</Text>
        </View>
      ))} */}
      <FlatList
        data={expiredCredentialsData}
        renderItem={({ item }) => (
          <View key={item.UUID}>
            <View className="py-2 px-4">
              <Text textColor>
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
