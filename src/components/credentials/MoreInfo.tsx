import { TouchableOpacity, Hint } from "react-native-ui-lib";
import { Dispatch } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <TouchableOpacity className="absolute right-0 top-0 px-2 py-4">
      <Hint
        visible={isHintVisible}
        message={`${t("Start date")}: ${start_date}\n${t(
          "End date",
        )}: ${end_date}`}
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
