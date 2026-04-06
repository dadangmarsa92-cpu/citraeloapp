// Firebase Configuration — CitraElo Rafting
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCyFbsc2l3Osrac4zRbo_hZfvjvjEqmEDM",
  authDomain: "citraeloapp.firebaseapp.com",
  projectId: "citraeloapp",
  storageBucket: "citraeloapp.firebasestorage.app",
  messagingSenderId: "993130577551",
  appId: "1:993130577551:web:d285c1a403277ae75c7afa"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
