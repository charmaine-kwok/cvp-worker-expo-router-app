import { View, TextInput } from "react-native";
import { Controller } from "react-hook-form";
import { useState } from "react";
import { Text } from "react-native-ui-lib";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useTranslation } from "react-i18next";

type CustomInputProps = {
  placeholder: string;
  icon?: React.ReactElement;
  password?: boolean;
  widthPerct?: string;
  control: any;
  name: string;
  errors: any;
};

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  icon,
  password = false,
  widthPerct,
  control,
  name,
  errors,
}) => {
  const [hidePass, setHidePass] = useState(true);
  const { t } = useTranslation();

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            style={[
              widthPerct ? { width: widthPerct } : {},
              // addStyle ? addStyle : {},
            ]}
            className="w-[70%] bg-white flex-row border px-2 rounded-md border-[#e8e8e8]"
          >
            {icon ? (
              <View className="w-[10%] justify-center items-center ">
                {icon}
              </View>
            ) : null}
            <View className="p-2.5 flex-1 flex-row items-center">
              <TextInput
                className="w-[90%] mr-2"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
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
        )}
      />
      {errors[name] ? (
        <View className="h-[30px] flex justify-start w-[70%]">
          <Text red40 className="mt-1 font-semibold">
            {t(`${name.charAt(0).toUpperCase() + name.slice(1)} is required.`)}
          </Text>
        </View>
      ) : (
        <View className="h-[30px]" />
      )}
    </>
  );
};

export default CustomInput;
