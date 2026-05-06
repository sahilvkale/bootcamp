import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace this entire block with YOUR keys from the Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyAOHcOfSMfLh3MTn5pdgy0AQeubOcSGPhI",
  authDomain: "iotive-bootcamp.firebaseapp.com",
  projectId: "iotive-bootcamp",
  storageBucket: "iotive-bootcamp.firebasestorage.app",
  messagingSenderId: "110493542541",
  appId: "1:110493542541:web:55bc0ceed52f43fbd41ac4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);