import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCn6C3w17L_kVEBO7WNSjBE7ApG3cMiacQ",
  authDomain: "clone-2d8c9.firebaseapp.com",
  projectId: "clone-2d8c9",
  storageBucket: "clone-2d8c9.appspot.com",
  messagingSenderId: "238766249038",
  appId: "1:238766249038:web:4dc4ab33a014e094419f1f",
  measurementId: "G-BYJZEFNQFS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export default app;
