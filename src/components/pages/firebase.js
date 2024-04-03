import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore, collection, query, where, getDocs, orderBy } from "firebase/firestore";

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
const getUserIDFromAuthToken = async () => {
  const currentUser = await auth.currentUser;
  console.log("24----", await currentUser)
  if (currentUser) {
    try {
      // Get the ID token

      // Decode the ID token to get user information
      const decodedToken = currentUser;
      const userId = decodedToken.uid;
      return userId;
    } catch (error) {
      console.error('Error retrieving user ID:', error);
      return null;
    }
  } else {
    console.error('No user signed in.');
    return null;
  }
};

const fetchDataForUserId = async () => {
  console.log("44-------")
  try {
    // Get the user ID from the authentication token
    const userId = await getUserIDFromAuthToken();
    // const userId = "zYCCtNjmaNSNnef5iadSRssYN8U2";
    console.log("47----",userId);
    if (userId) {
      // Query to retrieve data for the specified user ID
      const q = query(collection(database, 'streamData'), where('userId', '==', userId), orderBy('streamDate', 'desc'));

      const querySnapshot = await getDocs(q);

      // Initialize an array to store the retrieved data
      const userData = [];

      // Iterate through the documents
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        userData.push(data);
      });
      console.log("64-----",userData);
      return userData; // Return the retrieved data
    } else {
      console.log("No user ID found.");
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
export { app, auth, database, getUserIDFromAuthToken, fetchDataForUserId, collection, query, where, getDocs };

// export const database = getAuth(app);
