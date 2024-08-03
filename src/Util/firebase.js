// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-qRcak1NQLbFNBFFOvPKXqZne2Ev7OEQ",
  authDomain: "clone-36f1b.firebaseapp.com",
  projectId: "clone-36f1b",
  storageBucket: "clone-36f1b.appspot.com",
  messagingSenderId: "305556834498",
  appId: "1:305556834498:web:b87d3ea303b87a7db2935b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);        
export const auth = getAuth(app);
export const db = getFirestore(app);
