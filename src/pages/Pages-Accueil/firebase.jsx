// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqL9ocVeAFnO3eS1llZZds_VdGmKNzktY",
  authDomain: "login-d7ebb.firebaseapp.com",
  projectId: "login-d7ebb",
  storageBucket: "login-d7ebb.appspot.com", // corrigé ici
  messagingSenderId: "282972873652",
  appId: "1:282972873652:web:21f82d257c9f3509cd48e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exports
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

