// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogapp-8271a.firebaseapp.com",
  projectId: "blogapp-8271a",
  storageBucket: "blogapp-8271a.appspot.com",
  messagingSenderId: "288754180126",
  appId: "1:288754180126:web:9925ced1f5e96a43cf4e0f",
  measurementId: "G-RVWNQ8STH0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);