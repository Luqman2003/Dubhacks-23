// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGE_SENDER_ID, APP_ID, MEASUREMENT_ID } from "./firebase.env"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaMZ1_JOYSlQJyZ9HFMCfJT-XXahm-BgQ",
  authDomain: "dubhacks-23.firebaseapp.com",
  projectId: "dubhacks-23",
  storageBucket: "dubhacks-23.appspot.com",
  messagingSenderId: "1089425425408",
  appId: "1:1089425425408:web:858e856913b231f70404e5",
  measurementId: "G-XBNH12BBJ8"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);