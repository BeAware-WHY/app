// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAHDfunDFhQDBTJeQid93oGKgkS3R8kZs",
  authDomain: "we-hear-you-5a05a.firebaseapp.com",
  databaseURL: "https://we-hear-you-5a05a-default-rtdb.firebaseio.com",
  projectId: "we-hear-you-5a05a",
  storageBucket: "we-hear-you-5a05a.appspot.com",
  messagingSenderId: "1070250683398",
  appId: "1:1070250683398:web:bbc390d3a67870e161a787",
  measurementId: "G-H88WYW8RFJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);