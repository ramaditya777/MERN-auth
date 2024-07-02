// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-d6332.firebaseapp.com",
  projectId: "mern-auth-d6332",
  storageBucket: "mern-auth-d6332.appspot.com",
  messagingSenderId: "337565990358",
  appId: "1:337565990358:web:13745529319be04ee87877",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
