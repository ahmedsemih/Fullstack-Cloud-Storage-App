import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "cloud-locker-927f8.firebaseapp.com",
  projectId: "cloud-locker-927f8",
  storageBucket: "cloud-locker-927f8.appspot.com",
  messagingSenderId: "553090649104",
  appId: "1:553090649104:web:3b4090d3a5909efc178e95",
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
export const rootStorage = ref(storage);
