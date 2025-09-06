import { type Analytics, getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { type Auth, getAuth, signOut } from 'firebase/auth';

const config = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

interface FirebaseInstance {
  firebaseApp: object;
  fireBaseAuth: Auth;
  analytics: Analytics;
}

export let firebaseInstance: FirebaseInstance;

export const initializeFirebase = (): FirebaseInstance | undefined => {
  try {
    const app = initializeApp(config, { name: 'jatayat' });
    const auth = getAuth(app);
    const analytics = getAnalytics(app);
    firebaseInstance = {
      firebaseApp: app,
      fireBaseAuth: auth,
      analytics: analytics,
    };
    return firebaseInstance;
  } catch (error) {
    console.log({ title: 'Firebase initialization', error: error as Error })
    return;
  }
};

export const getFirebaseIdToken = async (): Promise<string> => {
  const auth = firebaseInstance?.fireBaseAuth;
  await auth.authStateReady();
  const currentUser = auth?.currentUser;
  let idToken = '';
  if (typeof currentUser?.getIdToken === 'function') {
    idToken = await currentUser?.getIdToken();
  }
  return idToken;
};

export const firebaseLogout = async () => {
  const auth = firebaseInstance?.fireBaseAuth;
  await signOut(auth);
};

export const getFirebaseUser = async () => {
  const auth = firebaseInstance?.fireBaseAuth;
  await auth.authStateReady();
  const currentUser = auth?.currentUser;
  return currentUser && currentUser?.toJSON();
};


export default initializeFirebase;

