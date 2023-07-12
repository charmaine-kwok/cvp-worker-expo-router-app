import { atom } from "jotai";
import { itemProps } from "~functions/api/credential/getCredentialList";

const expiredCredentialsAtom = atom<itemProps[]>([]);

export default expiredCredentialsAtom;
