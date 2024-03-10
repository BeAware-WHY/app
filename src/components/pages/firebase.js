import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";


import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXZqysqsh9egeynwFIdnMlcA0dAtq91aA",
  authDomain: "beaware-ca26e.firebaseapp.com",
  databaseURL: "https://beaware-ca26e-default-rtdb.firebaseio.com",
  projectId: "beaware-ca26e",
  storageBucket: "beaware-ca26e.appspot.com",
  messagingSenderId: "672380379486",
  appId: "1:672380379486:web:9d0800c3515957c043efcf",
  measurementId: "G-3NZDDWZ00C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);