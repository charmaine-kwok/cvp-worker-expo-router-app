import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View } from "react-native-ui-lib";
import { useAtomValue, useSetAtom } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";

import expiredCredentialsAtom from "~atoms/expiredCredentials";
import ExpiredButton from "~components/buttons/ExpiredButton";
import CrendentialList from "~components/credentials/CredentialList";
import { usernameAtom } from "~atoms/username";
import getCertList from "~functions/api/credential/getCredentialList";
import { itemProps } from "~functions/api/credential/getCredentialList";
import getCertDetails from "~functions/api/credential/getCredentialDetails";
import { selectedCredentialsAtom } from "~atoms/selectedCredentials";

const CrendentialListPage: React.FC = () => {
  const router = useRouter();
  const usernameData = useAtomValue(usernameAtom);
  const setExpiredCredentialsData = useSetAtom(expiredCredentialsAtom);
  const setSelectedCredentials = useSetAtom(selectedCredentialsAtom);

  const [totalItem, setTotalItem] = useState<number | null>(null);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState<boolean>(false);
  const [groupedByIssuer, setGroupedByIssuer] =
    useState<Record<string, itemProps[]>>(null);
  const [expiredCredentials, setExpiredCredentials] = useState<
    itemProps[] | null
  >(null);

  //pagination
  const [pageSize, setPageSize] = useState(20); // FIXME:hardcoded
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (currentPage: number) => {
    try {
      const data = await getCertList(usernameData, currentPage, pageSize);
      if (data) {
        setTotalItem(data.total_items);
        setShowLoadMoreButton(
          data.total_items - data.page_size * currentPage > 0,
        );
        setPageSize(data.page_size);
        const fetchData = async (item: string, accessToken: string) => {
          try {
            const data = await getCertDetails(item, accessToken);
            if (data) {
              return {
                UUID: data.UUID,
                isValid: data.is_valid,
                credentialType: data.credential_type,
                issuer: data.issuer,
                start_date: data.start_date,
                end_date: data.end_date,
              };
            }
          } catch (e) {
            console.log("error:", e);
          }
        };
        const accessToken = (await AsyncStorage.getItem(
          "accessToken",
        )) as string;

        const items: itemProps[] = await Promise.all(
          data.items.map((item: string) => fetchData(item, accessToken)),
        );

        if (items && items.length > 0) {
          console.log("items", items);
          // seperate cert into valid and expired
          let validItems = items.filter((item) => item.isValid);
          setExpiredCredentials(items.filter((item) => !item.isValid));
          const expiredItems = items.filter((item) => !item.isValid);
          if (expiredItems && expiredItems.length > 0) {
            setExpiredCredentialsData(expiredItems);
          }
          // group certList by Issuer
          setGroupedByIssuer(
            validItems.reduce(
              (acc, item) => {
                // use the issuer as the key
                const key = item.issuer;

                // if this issuer is not in the accumulator, add it with an empty array
                if (!acc[key]) {
                  acc[key] = [];
                }

                // push the current item into the array for this issuer
                acc[key].push(item);

                // return the accumulator for the next iteration
                return acc;
              },
              {} as Record<string, itemProps[]>,
            ),
          );
        }
      }
    } catch (e) {
      console.log("error:", e);
      router.replace("/(auth)/sign-in");
    }
  };

  useEffect(() => {
    setSelectedCredentials([]);
    fetchData(currentPage);
  }, []);

  useEffect(() => {
    if (currentPage > 1) {
      const fetchMoreData = async () => {
        if (isLoading) return;
        setIsLoading(true);
        await fetchData(currentPage);
        setIsLoading(false);
      };
      fetchMoreData();
    }
  }, [currentPage]);

  const loadMoreData = () => {
    setCurrentPage((prev) => prev + 1);
  };

  if (groupedByIssuer !== null && totalItem !== null) {
    const sortedGroupedByIssuer = Object.entries(groupedByIssuer).sort(
      (a, b) => {
        if (a[0] === "Issuer1") {
          return -1;
        }
        if (b[0] === "Issuer1") {
          return 1;
        }
        if (a[0] < b[0]) {
          return -1;
        }
        if (a[0] > b[0]) {
          return 1;
        }
        return 0;
      },
    );
    console.log(expiredCredentials);

    return (
      // <CertList
      //   data={certList}
      //   totalItem={totalItem}
      //   showLoadMoreButton={showLoadMoreButton}
      //   loadMoreData={loadMoreData}
      // />{}
      <View bg-greyish className="h-full">
        <CrendentialList credentials={sortedGroupedByIssuer} />
        {expiredCredentials.length > 0 && <ExpiredButton />}
      </View>
    );
  }
};

export default CrendentialListPage;
