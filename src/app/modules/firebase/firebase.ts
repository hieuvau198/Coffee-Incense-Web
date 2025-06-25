// src/app/modules/firebase/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDFBSahdzqn7noPdbWbRblTUsFjouzsQVs",
  authDomain: "flipbook-firebase.firebaseapp.com",
  projectId: "flipbook-firebase",
  storageBucket: "flipbook-firebase.appspot.com",
  messagingSenderId: "743973977437",
  appId: "1:743973977437:web:e85e7509b3653c9a90bcb4",
  measurementId: "G-ZBBFMY5GQD",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };



