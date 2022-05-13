import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
};

// Initialize Firebase
const myFirebaseApp = initializeApp(firebaseConfig);

export const myAuth = getAuth(myFirebaseApp);
export const googleProvider = new GoogleAuthProvider();
