import { Colors } from "react-native-ui-lib";

type theme = {
  screenBG: string;
  textColor: string;
  greyish: string;
};

type mode = "light" | "dark";

const colorsTheme: {
  [key in mode]: theme;
} = {
  light: {
    screenBG: Colors.white,
    textColor: Colors.black,
    greyish: "#e7e7e7",
  },
  dark: {
    screenBG: Colors.black,
    textColor: Colors.white,
    greyish: Colors.black,
  },
};

export default colorsTheme;
