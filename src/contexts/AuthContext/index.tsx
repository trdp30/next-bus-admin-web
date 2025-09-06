/**
 *
 * AuthContext
 *
 */

import { firebaseInstance } from '../../utils/firebase/firebase';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type Unsubscribe,
  type User,
} from 'firebase/auth';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

export type AuthContextType = {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  user: UserData | null;
  triggerGoogleLogin: () => Promise<void>;
  triggerUnAuthenticate: () => Promise<void>;
  error: string | null;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode | React.ReactElement;
}

function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const triggerUnAuthenticate = useCallback(async () => {
    try {
      setError(null);
      await signOut(firebaseInstance.fireBaseAuth);
    } catch (error) {
      console.error('Error signing out:', error);
      setError('Failed to sign out. Please try again.');
    }
  }, []);

  const triggerGoogleLogin = useCallback(async () => {
    try {
      setError(null);
      setIsAuthenticating(true);
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');

      await signInWithPopup(firebaseInstance.fireBaseAuth, provider);
    } catch (error: any) {
      console.error('Error logging in with Google:', error);
      setError(error.message || 'Failed to sign in with Google. Please try again.');
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  useEffect(() => {
    let unsubscribe: Unsubscribe;

    const initializeAuth = async () => {
      if (!firebaseInstance?.fireBaseAuth) {
        console.error('Firebase not initialized');
        setIsAuthenticating(false);
        return;
      }

      unsubscribe = onAuthStateChanged(firebaseInstance.fireBaseAuth, async (userData: User | null) => {
        console.log("Auth state changed:", userData);

        if (userData) {
          const userDataFormatted: UserData = {
            uid: userData.uid,
            email: userData.email,
            displayName: userData.displayName,
            photoURL: userData.photoURL,
            emailVerified: userData.emailVerified,
          };
          setUser(userDataFormatted);
        } else {
          setUser(null);
        }
        setIsAuthenticating(false);
      });
    };

    initializeAuth();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: !!user,
      isAuthenticating,
      triggerUnAuthenticate,
      triggerGoogleLogin,
      error,
    }),
    [user, isAuthenticating, triggerUnAuthenticate, triggerGoogleLogin, error]
  );

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}

export const AuthConsumer = AuthContext.Consumer;

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider };

export default AuthContext;
