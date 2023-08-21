// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyCEW5xOn9KWQfHyWGdBK373j9RHHX4sWQk',
  authDomain: 'portfolio-a8d9d.firebaseapp.com',
  projectId: 'portfolio-a8d9d',
  storageBucket: 'portfolio-a8d9d.appspot.com',
  messagingSenderId: 'A671299067647',
  appId: '1:671299067647:web:71c3e08301b9d141e536ca',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
