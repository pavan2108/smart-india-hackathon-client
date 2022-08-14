// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjFtX0e_6JvI64HN6pwsrpdDOPizVEkOc",
  authDomain: "sih-project-1a67e.firebaseapp.com",
  projectId: "sih-project-1a67e",
  storageBucket: "sih-project-1a67e.appspot.com",
  messagingSenderId: "181059635329",
  appId: "1:181059635329:web:8ce50e1dd4e64b8d2aa580",
  measurementId: "G-DVVXCJW086"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app}