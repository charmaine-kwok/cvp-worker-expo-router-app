import React from "react";
import { View, Pressable } from "react-native";
import { Text } from "react-native-ui-lib";

type CustomButtonProps = {
  onPress: () => void;
  text: string;
  bgColor: string;
  fgColor?: string;
  children?: React.ReactNode;
  widthPerct?: number;
  bold?: boolean;
  addStyle?: {};
  icon?: React.ReactElement;
  flexDir?: "column" | "column-reverse" | "row" | "row-reverse";
};

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  text,
  bgColor,
  fgColor,
  widthPerct,
  bold = true,
  addStyle,
  icon,
  flexDir = "row",
}) => {
  return (
    <Pressable
      onPress={onPress}
      className="my-2 flex w-[60%] items-center justify-center rounded-md p-2.5 md:p-4"
      style={[
        bgColor ? { backgroundColor: bgColor } : {},
        widthPerct ? { width: widthPerct } : {},
        addStyle ? addStyle : {},
        flexDir ? { flexDirection: flexDir } : {},
      ]}
    >
      {icon && <View className="mr-4">{icon}</View>}

      <Text
        style={[fgColor ? { color: fgColor } : {}]}
        className={`mx-1.5 grow text-white  ${bold ? "font-bold" : ""}`}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
