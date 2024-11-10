// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs,serverTimestamp,deleteDoc,doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC5G9szodIqFgJ8M34eL9fRe6FW5cRgYj0",
    authDomain: "chat-39ce3.firebaseapp.com",
    projectId: "chat-39ce3",
    storageBucket: "chat-39ce3.firebasestorage.app",
    messagingSenderId: "1067910708737",
    appId: "1:1067910708737:web:c7bf4d5ad6667a74488a00",
    measurementId: "G-0RHCMDE148"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
 const db = getFirestore(app);
 export { db, collection, addDoc ,getDocs,serverTimestamp ,deleteDoc,doc ,auth};
