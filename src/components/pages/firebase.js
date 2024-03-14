import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

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
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getFirestore(app);

export { auth, database };
