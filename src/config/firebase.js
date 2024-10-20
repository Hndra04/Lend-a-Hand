import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBcqO21IO4QUeceIT2GSV0GRDprVD2H1FM",
  authDomain: "lend-a-hand-57844.firebaseapp.com",
  projectId: "lend-a-hand-57844",
  storageBucket: "lend-a-hand-57844.appspot.com",
  messagingSenderId: "108404867571",
  appId: "1:108404867571:web:3e65f7d16088fed9f21286",
  measurementId: "G-812FV9G9S0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)