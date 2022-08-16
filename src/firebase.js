import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwPRteR5FWrKI4AIwkipBS1kZdD7N6nhc",
  authDomain: "smartindiahackathon-d986b.firebaseapp.com",
  projectId: "smartindiahackathon-d986b",
  storageBucket: "smartindiahackathon-d986b.appspot.com",
  messagingSenderId: "487807349125",
  appId: "1:487807349125:web:e8825c2ae89ba4a1c014ec",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
const auth = getAuth();
auth.languageCode = "en";
export default auth;
