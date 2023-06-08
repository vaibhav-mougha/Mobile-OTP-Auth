// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaSfyw0bbdCY70eyHgksLPTd-V3c0UfH8",
  authDomain: "otp-project-48672.firebaseapp.com",
  projectId: "otp-project-48672",
  storageBucket: "otp-project-48672.appspot.com",
  messagingSenderId: "955086830147",
  appId: "1:955086830147:web:c7af07bc2eddeffe79f2f6",
  measurementId: "G-S7XKKXGSPM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
