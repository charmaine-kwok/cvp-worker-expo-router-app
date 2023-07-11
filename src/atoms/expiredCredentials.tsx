import { atom } from "jotai";
import { itemProps } from "~functions/api/credential/getCredentialList";

export type ExpiredCrendentials = {
  expiredCrendentials: itemProps[];
};

export const expiredCredentialsAtom = atom<itemProps[]>([]);
