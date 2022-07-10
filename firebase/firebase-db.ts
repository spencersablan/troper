import app from "./firebase-config";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const firestore = getFirestore(app);
export const auth = getAuth(app);

export interface Template {
	templateID: string;
	quarters: number[];
	text: string;
}

export enum Genders {
	male = "Male",
	female = "Female",
}
