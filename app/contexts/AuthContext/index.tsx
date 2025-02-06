/**
 *
 * AuthContext
 *
 */

import { selectAuth, selectAuthInitialized } from '@containers/Auth/selectors';
import { initialize, triggerAuthenticate, unAuthenticate } from '@containers/Auth/slice';
import { Email, FbUser, Password } from '@containers/Auth/types';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import type { SagaCallback } from '@store/types';
import { firebaseInstance } from '@utils/firebase';
import { catchError } from '@utils/sentry';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  Unsubscribe,
} from 'firebase/auth';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { getAllParams } from '@containers/Auth/helpers';

export interface Tokens {
  accessToken: string | null;
  customToken?: string | null;
  idToken?: string | null;
  hash_token?: string | null;
}

export type AuthContextType = {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  isInitialized: boolean;
  triggerGoogleLogin: () => void;
  triggerEmailPasswordLogin: (args: { email: Email; password: Password; callback?: SagaCallback }) => void;
  triggerUnAuthenticate: () => void;
  user: FbUser | null;
  tokens?: Tokens;
  redirectPostAuthentication?: () => void;
};

export const authContextInitialState = {
  isAuthenticated: false,
  isAuthenticating: true,
  isInitialized: false,
  triggerGoogleLogin: () => {},
  triggerEmailPasswordLogin: () => {},
  triggerUnAuthenticate: () => {},
  user: null,
  tokens: undefined,
  redirectPostAuthentication: () => {},
};

const AuthContext = React.createContext<AuthContextType>(authContextInitialState);

interface AuthProviderProps {
  children: React.ReactNode | React.ReactElement;
}

function AuthProvider(props: AuthProviderProps) {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectAuth);
  const isAuthInitialized = useAppSelector(selectAuthInitialized);
  const [search] = useSearchParams();
  const navigate = useNavigate();

  const redirectPostAuthentication = () => {
    const queryParams = getAllParams(search);
    if (queryParams?.from) {
      const path = `${queryParams?.from}`;
      navigate(path, { replace: true });
    } else {
      navigate('/home', { replace: true });
    }
  };

  const triggerUnAuthenticate = () => {
    dispatch(unAuthenticate());
  };

  const triggerGoogleLogin = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(firebaseInstance.fireBaseAuth, provider);
    } catch (error) {
      console.error('Error logging in with Google', error);
      catchError({ title: 'Google login', error: error as Error });
    }
  }, []);

  const triggerEmailPasswordLogin = useCallback(
    async ({ email, password, callback }: { email: Email; password: Password; callback?: SagaCallback }) => {
      try {
        await signInWithEmailAndPassword(firebaseInstance.fireBaseAuth, email, password);
        if (callback?.onSuccess) {
          callback.onSuccess();
        }
      } catch (error) {
        console.error('Error logging in with email and password', error);
        if (callback?.onError) {
          callback.onError();
        }
        catchError({ title: 'Email password login', error: error as Error });
      }
    },
    []
  );

  useEffect(() => {
    let unsubscribe: Unsubscribe;
    if (isAuthInitialized) {
      unsubscribe = onAuthStateChanged(firebaseInstance.fireBaseAuth, async (userData) => {
        if (userData && !state.authenticated) {
          dispatch(triggerAuthenticate());
        }
      });
    }
    return () => unsubscribe && unsubscribe();
  }, [dispatch, isAuthInitialized]);

  useEffect(() => {
    if (state.authenticated) {
      redirectPostAuthentication();
    }
  }, [state.authenticated]);

  const value = useMemo<AuthContextType>(
    () => ({
      user: state?.user,
      isAuthenticated: state.authenticated,
      isAuthenticating: state.authenticating,
      isInitialized: state.initialized,
      redirectPostAuthentication,
      triggerUnAuthenticate,
      triggerGoogleLogin,
      triggerEmailPasswordLogin,
    }),
    [state, triggerUnAuthenticate]
  );

  useEffect(() => {
    dispatch(initialize());
  }, []);

  return <AuthContext.Provider value={value}>{isAuthInitialized ? props.children : <></>}</AuthContext.Provider>;
}

export const AuthConsumer = AuthContext.Consumer;

export { AuthProvider };

export default AuthContext;
