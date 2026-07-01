import { initializeApp } from "firebase/app";

import {
  getAuth
} from "firebase/auth";

import {
  getFirestore
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVA8ysG8p6BktXBrJyt_yf-sHUUlHqbx4",
  authDomain: "hoaxguard234.firebaseapp.com",
  projectId: "hoaxguard234",
  storageBucket: "hoaxguard234.firebasestorage.app",
  messagingSenderId: "399931825743",
  appId: "1:399931825743:web:d62790740f5662fb7fd43a",
  measurementId: "G-VWG08780VD"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

