import { Dispatch } from "react";
import { getValueFor } from "app/(auth)/sign-in";

const getAccessToken: (
  setIsLoggedInAtom: Dispatch<boolean>,
  setAccessToken: Dispatch<string>,
) => void = async (setIsLoggedIn, setAccessToken) => {
  const accessToken = await getValueFor("accessToken");
  if (accessToken !== null) {
    setIsLoggedIn(true);
    setAccessToken(accessToken);
  }
  console.log("login?", accessToken ? "yes" : "no");
};

export default getAccessToken;
