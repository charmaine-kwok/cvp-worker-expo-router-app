import { Image, Alert } from "react-native";
import { View, Text, Button } from "react-native-ui-lib";
import Dash from "react-native-dash";
import { Stack } from "expo-router";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSetAtom } from "jotai";
import { useForm } from "react-hook-form";

import { usernameAtom } from "~atoms/username";
import LanguagePicker from "~components/LanguagePicker";
import DismissKeyboard from "~components/DismissKeyboard";
import CustomInput from "~components/input/CustomInput";

import { accessTokenAtom } from "~atoms/accessToken";

export default function SignIn() {
  const { t } = useTranslation();

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const setUsernameData = useSetAtom(usernameAtom);
  const setAccessToken = useSetAtom(accessTokenAtom);

  const loginHandler = async ({ username, password }) => {
    fetch("http://192.168.1.12:8081/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.text();
      })
      .then((data) => {
        // store tokens in AsyncStorage
        AsyncStorage.setItem("accessToken", data);
        setAccessToken(data);
        console.log(data);
        AsyncStorage.setItem("username", username);
        setUsernameData(username);
        // redirect to MainScreen

        if (username === "admin") {
          router.replace("/home/ChooseCred");
        } else {
          router.replace("/home/credential");
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(
          "Login failed",
          "Please check your username and password and try again.",
        );
      });
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <DismissKeyboard>
        <View className="items-center bg-[#d3d3d3] flex-1 ">
          <Image
            className={`w-[250px] sm:w-[300px] h-[25%] mt-[15%] sm:mt-[20%] mb-[5%]`}
            resizeMode="contain"
            source={require("../../assets/icon/icons8.png")}
          ></Image>
          <Text black className="text-2xl mb-4">{`${t("Hello")}`}</Text>
          <Text black className="mb-4">{`${t(
            "Please Login to Your Account",
          )}`}</Text>

          <CustomInput
            placeholder={`${t("Username")}`}
            icon={<FontAwesome name="user" size={24} color="darkgrey" />}
            password={false}
            name="username"
            control={control}
            errors={errors}
          />
          <CustomInput
            placeholder={`${t("Password")}`}
            icon={<Entypo name="lock" size={24} color="darkgrey" />}
            password={true}
            name="password"
            control={control}
            errors={errors}
          />

          <Button
            bg-black
            onPress={handleSubmit(loginHandler)}
            className="w-[70%] my-2"
          >
            <Text white className="font-bold">{`${t("SignIn")}`}</Text>
          </Button>
          <View className="flex flex-row items-center my-4 space-x-8 ">
            <Dash
              style={{ width: "35%" }}
              dashGap={10}
              dashLength={10}
              dashThickness={1}
            />
            <Text black>{t("Or")}</Text>
            <Dash
              style={{ width: "35%" }}
              dashGap={10}
              dashLength={10}
              dashThickness={1}
            />
          </View>
          <Button bg-green10 className="w-[70%] my-2">
            <Text white className="font-bold">{`${t(
              "Login by iAM Smart",
            )}`}</Text>
          </Button>
          <LanguagePicker />
        </View>
      </DismissKeyboard>
    </>
  );
}
