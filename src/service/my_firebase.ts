import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  databaseURL: process.env.REACT_APP_DB_URL,
};

// Initialize Firebase
const myFirebaseApp = initializeApp(firebaseConfig);

export const myAuth = getAuth(myFirebaseApp);
export const googleProvider = new GoogleAuthProvider();
export const myDb = getDatabase(myFirebaseApp);
