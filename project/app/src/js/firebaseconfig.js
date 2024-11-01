// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdSQumVhexa97p7C7vLyES2jySjJeRJCA",
  authDomain: "rouver-5e029.firebaseapp.com",
  projectId: "rouver-5e029",
  storageBucket: "rouver-5e029.appspot.com",
  messagingSenderId: "595323107712",
  appId: "1:595323107712:web:3eb3cb4450bcf768406965",
  measurementId: "G-1P7ZGN5Q00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };