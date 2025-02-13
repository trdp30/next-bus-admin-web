import { appName } from '@utils/localStorageHelpers';
import { catchError } from '@utils/sentry';
import { Analytics, getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { Auth, getAuth, signOut } from 'firebase/auth';

interface FirebaseInstance {
  firebaseApp: object;
  fireBaseAuth: Auth;
  analytics: Analytics;
}

export let firebaseInstance: FirebaseInstance;

export const initializeFirebase = (): FirebaseInstance | undefined => {
  try {
    const config = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_API_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    };
    const app = initializeApp(config, { name: appName });
    const auth = getAuth(app);
    const analytics = getAnalytics(app);
    firebaseInstance = {
      firebaseApp: app,
      fireBaseAuth: auth,
      analytics: analytics,
    };
    return firebaseInstance;
  } catch (error) {
    catchError({ title: 'Firebase initialization', error: error as Error });
    return;
  }
};

export default initializeFirebase;

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
