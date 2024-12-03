// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBK7rtQPtd4MAwIPCg3yKC90L6ZEIc7SDc",
  authDomain: "smartsetup-ad5b2.firebaseapp.com",
  databaseURL: "https://smartsetup-ad5b2-default-rtdb.firebaseio.com",
  projectId: "smartsetup-ad5b2",
  storageBucket: "smartsetup-ad5b2.firebasestorage.app",
  messagingSenderId: "475879323915",
  appId: "1:475879323915:web:fc82ec34edd20c2cfd8a0e",
  measurementId: "G-B2ZF6C58KB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };