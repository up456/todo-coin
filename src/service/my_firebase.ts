import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCgDnvM4emX4GtfS8RSu9XDvSKnAqFGCcM',
  authDomain: 'todo-coin.firebaseapp.com',
  projectId: 'todo-coin',
  storageBucket: 'todo-coin.appspot.com',
};

// Initialize Firebase
const myFirebaseApp = initializeApp(firebaseConfig);

export const myAuth = getAuth(myFirebaseApp);
export const googleProvider = new GoogleAuthProvider();
