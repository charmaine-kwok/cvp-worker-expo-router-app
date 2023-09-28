import { View } from "react-native-ui-lib";
import { useAtomValue } from "jotai";
import { FlatList } from "react-native";

import CredentialListItem from "./CredentialListItem";
import expiredCredentialsAtom from "~atoms/expiredCredentials";

const ExpiredCredentialsList: React.FC = () => {
  const expiredCredentialsData = useAtomValue(expiredCredentialsAtom);
  console.log(expiredCredentialsData);

  return (
    <View>
      <FlatList
        className="h-full"
        data={expiredCredentialsData}
        renderItem={({ item }) => (
          <View>
            <CredentialListItem item={item} />
          </View>
        )}
        keyExtractor={(item) => item.UUID}
      />
    </View>
  );
};

export default ExpiredCredentialsList;
