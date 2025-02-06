import { firebaseInstance } from '@utils/firebase';
import {
  browserLocalPersistence,
  PhoneAuthProvider,
  RecaptchaVerifier,
  setPersistence,
  signInWithCredential,
  signInWithCustomToken,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { trim } from 'lodash';
import { QueryParams, Params } from '@containers/Auth/types';

export const signInPhone = (phoneNumber: string) => {
  const auth = firebaseInstance?.fireBaseAuth;
  const appVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
    size: 'invisible',
    callback: () => {
      console.log('recaptcha resolved..');
    },
  });
  return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
};

export const signInCredential = (verificationId: string, code: string) => {
  const auth = firebaseInstance?.fireBaseAuth;
  const credential = PhoneAuthProvider.credential(verificationId, code);
  return signInWithCredential(auth, credential);
};

export async function authenticateFirebase({ customToken }: { customToken: string }) {
  if (!trim(customToken)) throw new Error('Invalid Access Token');
  await setPersistence(firebaseInstance.fireBaseAuth, browserLocalPersistence);
  const UC = await signInWithCustomToken(firebaseInstance.fireBaseAuth, customToken);
  if (UC.user) {
    return await UC.user.getIdToken();
  }
  throw new Error('Invalid User');
}

export const getAllParams = (search: URLSearchParams): QueryParams => {
  const params: Params = {};
  for (const [key, value] of search.entries()) {
    params[key] = value;
  }
  return params;
};
