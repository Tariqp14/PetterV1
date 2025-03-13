// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCZ4kcEbhQKKbVUmGbYw5OiVLVtvPQ4uIk",
  authDomain: "petter-4172c.firebaseapp.com",
  projectId: "petter-4172c",
  storageBucket: "petter-4172c.firebasestorage.app",
  messagingSenderId: "878090042016",
  appId: "1:878090042016:web:381c576f2d2a54577f67c5",
  measurementId: "G-Z4ECDF6P70",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app); // Added Firestore Database so that animals are saved when created a new one
