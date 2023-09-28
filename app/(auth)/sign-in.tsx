import { Image, Alert } from "react-native";
import { View, Text, Button } from "react-native-ui-lib";
import Dash from "react-native-dash";
import { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import * as SecureStore from "expo-secure-store";

import { CLIENT_ID } from "@env";
import Loading from "~components/Loading";
import { usernameAtom } from "~atoms/username";
import LanguagePicker from "~components/LanguagePicker";
import DismissKeyboard from "~components/DismissKeyboard";
import CustomInput from "~components/input/CustomInput";
import { accessTokenAtom } from "~atoms/accessToken";

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log(result);
    return result;
  } else {
    console.log("No values stored under that key.");
  }
}

export async function removeAccessToken(key: string) {
  await SecureStore.deleteItemAsync(key);
}

export default function SignIn() {
  const { t } = useTranslation();

  // authCode return by iAmSmart
  const url = Linking.useURL();
  console.log(url);

  const [isLoading, setIsLoading] = useState(false);

  const openIAmSmart = () => {
    const redirectURI = "myapp://sign-in";
    const encodedRedirectURI = encodeURIComponent(redirectURI);
    const url = `hk.gov.iamsmart.testapp://auth/iAmSmartLogin?clientID=${CLIENT_ID}&responseType=code&source=App_Scheme&redirectURI=${encodedRedirectURI}&scope=eidapi_auth`;
    Linking.openURL(url);
  };

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
    setIsLoading(true);
    try {
      const response = await fetch("http://192.168.1.12:8081/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.text();

      save("accessToken", data);
      setAccessToken(data);
      console.log(data);

      AsyncStorage.setItem("username", username);

      setUsernameData(username);

      // redirect to MainScreen
      if (username === "admin") {
        router.replace("/home/selectFields/ChooseFieldsPage");
      } else {
        router.replace("/home/credential");
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Login failed",
        "Please check your username and password and try again.",
      );
    }
  };

  useEffect(() => {
    if (url) {
      const { queryParams } = Linking.parse(url);
      if (queryParams.code) {
        loginHandler({ username: "IR018349", password: "user" });
      }
    }
  }, [url]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <DismissKeyboard>
        <>
          {isLoading && <Loading />}
          <View className="items-center justify-center bg-[#d3d3d3] flex-1">
            <Image
              className={`w-[250px] sm:w-[300px] h-[25%]`}
              resizeMode="contain"
              source={require("../../assets/icon/icons8.png")}
            ></Image>
            <Text black className="text-2xl mb-4">
              {t("Hello")}
            </Text>
            <Text black className="mb-4">
              {t("Please Login to Your Account")}
            </Text>

            <CustomInput
              placeholder={t("Username")}
              icon={<FontAwesome name="user" size={24} color="darkgrey" />}
              password={false}
              name="username"
              control={control}
              errors={errors}
            />
            <CustomInput
              placeholder={t("Password")}
              icon={<Entypo name="lock" size={24} color="darkgrey" />}
              password={true}
              name="password"
              control={control}
              errors={errors}
            />

            <Button
              bg-black
              onPress={handleSubmit(loginHandler)}
              className="w-[70%] my-1 sm:my-2"
            >
              <Text white className="font-bold">
                {t("SignIn")}
              </Text>
            </Button>
            <View className="flex flex-row items-center my-2 sm:my-4 space-x-8">
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
            <Button
              onPress={openIAmSmart}
              bg-green10
              className="w-[70%] my-1 sm:my-2"
            >
              <Text white className="font-bold">
                {t("Login by iAM Smart")}
              </Text>
            </Button>

            <LanguagePicker />
          </View>
        </>
      </DismissKeyboard>
    </>
  );
}
