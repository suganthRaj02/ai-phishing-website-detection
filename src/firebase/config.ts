import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const env = (typeof import.meta !== 'undefined' && (import.meta as any).env) || {};

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyAs030_5i_unLLP56fiPVPhMeJ18I89nVs",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "aesthetic-alcove-n9v0l.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "aesthetic-alcove-n9v0l",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "aesthetic-alcove-n9v0l.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "995277119488",
  appId: env.VITE_FIREBASE_APP_ID || "1:995277119488:web:6b86522671450f67c538e5"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const databaseId = env.VITE_FIREBASE_DATABASE_ID || "ai-studio-6e117a04-0451-47fe-a7f9-0d3267cb37ca";
// Initialize Firestore with specific database ID if available or default
export const db = databaseId ? getFirestore(app, databaseId) : getFirestore(app);

export default app;
