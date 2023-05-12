import { Dispatch } from "react";

import { item } from "~components/filter/Filter";
import { IHistoryItem } from "app/home/history/History";

function fetchScannedData(
  db: any,
  setNumberOfResults: Dispatch<number>,
  setData: Dispatch<null | IHistoryItem[]>,
  setDistinctCredential_type: Dispatch<string[]>,
  setDistinctIssuer: Dispatch<string[]>,
  setFilter: Dispatch<item[]>,
  setSelectedButtons: Dispatch<any[]>
): void {
  {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT COUNT(*) as count FROM scanned_cert_data",
        [],
        (txObj, { rows: { _array } }) => {
          // Only stores up 20 results
          setNumberOfResults(_array[0].count);
          tx.executeSql(
            "SELECT * FROM scanned_cert_data ORDER BY index_id DESC",
            null,
            (txObj, { rows: { _array } }) => {
              console.log("array");
              const tempDistinctCredentialType = [
                ...new Set(
                  _array.map((item: IHistoryItem) => item.credential_type)
                ),
              ].sort();
              const tempDistinctIssuer = [
                ...new Set(_array.map((item: IHistoryItem) => item.issuer)),
              ].sort();

              setData(_array);
              setDistinctCredential_type(
                [
                  ...new Set(
                    _array.map((item: IHistoryItem) => item.credential_type)
                  ),
                ].sort() as string[]
              );
              console.log(
                "distinctCredential_type",
                tempDistinctCredentialType
              );
              setDistinctIssuer(
                [
                  ...new Set(_array.map((item: IHistoryItem) => item.issuer)),
                ].sort() as string[]
              );
              console.log("distinctIssuer", tempDistinctIssuer);
              if (tempDistinctCredentialType && tempDistinctIssuer) {
                setFilter([
                  {
                    "Credential Type": tempDistinctCredentialType,
                  } as item,
                  { Issuer: tempDistinctIssuer } as item,
                ]);

                setSelectedButtons([
                  ...tempDistinctCredentialType,
                  ...tempDistinctIssuer,
                ]);
              }
            }
          );
        }
      );
    });
  }
}

export default fetchScannedData;