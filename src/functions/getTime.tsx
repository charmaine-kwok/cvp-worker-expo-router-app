import ntpClient from "@ruanitto/react-native-ntp-sync";
import { Dispatch } from "react";

const options = {
  servers: [{ server: "time.google.com", port: 123 }],
};

// create a new instance
const clock = new ntpClient(options);

const getTime = (
  setTimestamp: Dispatch<React.SetStateAction<number>>,
  setDateFormat: Dispatch<React.SetStateAction<string>>
) => {
  // get the current unix timestamp
  const currentTime = clock.getTime();
  setTimestamp(currentTime);
  toDate(currentTime, setDateFormat);
};

const toDate = (
  unixTimestamp: number,
  setDateFormat: Dispatch<React.SetStateAction<string>>
) => {
  const dateObject = new Date(unixTimestamp);
  console.log(dateObject.toLocaleString("en-GB", { hour12: false }));
  setDateFormat(dateObject.toLocaleString("en-GB", { hour12: false }));
};

export default getTime;
