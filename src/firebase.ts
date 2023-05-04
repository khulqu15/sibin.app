import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDEydUJx_JJOVUBooGqbHsfIfW3YH-QFOU",
    authDomain: "trashbin-2b54f.firebaseapp.com",
    databaseURL: "https://trashbin-2b54f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "trashbin-2b54f",
    storageBucket: "trashbin-2b54f.appspot.com",
    messagingSenderId: "784398073730",
    appId: "1:784398073730:web:19bdbed5e3752e2089599b",
    measurementId: "G-32NEZ336SW"
  };
  
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getDatabase(app);
export { app, auth, db };
