// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbK5ohP2ml-uvuE6iNSqyJh6dKvGUR4XM",
  authDomain: "isbul-98273.firebaseapp.com",
  projectId: "isbul-98273",
  storageBucket: "isbul-98273.firebasestorage.app",
  messagingSenderId: "1047890068256",
  appId: "1:1047890068256:web:f03a20768946b702ca0d45",
  measurementId: "G-5766N2J9XF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, analytics, db };
