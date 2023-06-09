import { View, TextInput } from "react-native";
// import { Controller } from "react-hook-form";
import React from "react";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

type CustomInputProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  icon?: React.ReactElement;
  password?: boolean;
  widthPerct?: string;
};

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  setValue,
  placeholder,
  icon,
  password = false,
  widthPerct,
}) => {
  const [hidePass, setHidePass] = useState(true);

  return (
    <View
      style={[
        widthPerct ? { width: widthPerct } : {},
        // addStyle ? addStyle : {},
      ]}
      className="w-[70%] bg-white my-3 flex-row border px-2 rounded-md border-[#e8e8e8]"
    >
      {icon ? (
        <View className="w-[10%] justify-center items-center ">{icon}</View>
      ) : null}
      <View className="p-2.5 flex-1 flex-row items-center">
        <TextInput
          className="w-[90%] mr-2"
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          secureTextEntry={password ? (hidePass ? true : false) : false}
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType="default"
        ></TextInput>
        <View>
          {password && (
            <Icon
              name={hidePass ? "eye-slash" : "eye"}
              onPress={() => setHidePass(!hidePass)}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default CustomInput;
