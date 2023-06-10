// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSx0heFJR9wc0sQbFRdB03HOz7BU2vun8",
  authDomain: "arcade-profusion.firebaseapp.com",
  projectId: "arcade-profusion",
  storageBucket: "arcade-profusion.appspot.com",
  messagingSenderId: "442359158819",
  appId: "1:442359158819:web:d599835fe794a30e4bb996",
  measurementId: "G-TZY86M8P1B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
