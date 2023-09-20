import { LoaderScreen } from "react-native-ui-lib";
import { useAtomValue } from "jotai";

import { DarkThemeAtom } from "~atoms/darkTheme";

const Loading: React.FC = () => {
  const isDarkTheme = useAtomValue(DarkThemeAtom);

  return (
    <LoaderScreen
      overlay={true}
      loaderColor={`${isDarkTheme ? "white" : "black"}`}
      backgroundColor="rgba(0, 0, 0, 0.3)"
    />
  );
};

export default Loading;
