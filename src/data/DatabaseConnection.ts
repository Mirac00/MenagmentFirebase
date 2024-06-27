import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore/lite';

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

const firebaseConfig = {
  apiKey: "AIzaSyDFzeyB9dWeReXhCjTtVKKmRxiOcLWhvkA",
  authDomain: "managme-7c053.firebaseapp.com",
  projectId: "managme-7c053",
  storageBucket: "managme-7c053.appspot.com",
  messagingSenderId: "258990765409",
  appId: "1:258990765409:web:4d51bcdb80396b787d0120",
  measurementId: "G-B1XXVB9C04"
};

const app = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

export { db }
