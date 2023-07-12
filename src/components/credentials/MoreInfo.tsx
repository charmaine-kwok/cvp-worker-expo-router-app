import { TouchableOpacity, Hint } from "react-native-ui-lib";
import { Dispatch } from "react";
import { AntDesign } from "@expo/vector-icons";

type MoreInfoProps = {
  isHintVisible: boolean;
  setIsHintVisible: Dispatch<boolean>;
  start_date: string;
  end_date: string;
};

const MoreInfo: React.FC<MoreInfoProps> = ({
  isHintVisible,
  setIsHintVisible,
  start_date,
  end_date,
}) => {
  return (
    <TouchableOpacity className="absolute top-0 right-0 py-4 px-2">
      <Hint
        visible={isHintVisible}
        message={`Start date: ${start_date}\nEnd date: ${end_date}`}
        color={"#000000"}
        onBackgroundPress={() => setIsHintVisible(false)}
      >
        <TouchableOpacity onPress={() => setIsHintVisible(!isHintVisible)}>
          <AntDesign name="infocirlceo" size={15} />
        </TouchableOpacity>
      </Hint>
    </TouchableOpacity>
  );
};

export default MoreInfo;
