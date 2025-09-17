import { getDatabase, ref, set, onValue } from 'firebase/database';
import { initializeApp, getApp, getApps } from 'firebase/app';


const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.PUBLIC_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};


if (!firebaseConfig.projectId) {
  console.error('Missing PUBLIC_FIREBASE_PROJECT_ID');
}
if (!firebaseConfig.databaseURL) {
  console.error('Missing PUBLIC_FIREBASE_DATABASE_URL (Realtime Database URL)');
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);

export { database, ref, set, onValue };