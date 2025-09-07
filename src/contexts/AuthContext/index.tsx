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
import { useGraphQLQuery } from '../../hooks/useGraphQL';
import { ME_QUERY } from '../../graphql';
import type { CombinedUser } from '../../types/graphql';

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
  isLoadingUser: boolean;
  user: CombinedUser | UserData | null;
  firebaseUser: UserData | null;
  triggerGoogleLogin: () => Promise<void>;
  triggerUnAuthenticate: () => Promise<void>;
  refreshFirebaseToken: () => Promise<string | null>;
  error: string | null;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode | React.ReactElement;
}

function AuthProvider(props: AuthProviderProps) {
  const [firebaseUser, setFirebaseUser] = useState<UserData | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Call ME query when user is authenticated
  const { data: meData, loading: meLoading, error: meError } = useGraphQLQuery(
    ME_QUERY,
    {
      skip: !firebaseUser || isAuthenticating,
      fetchPolicy: 'network-only',
    }
  );

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
          setFirebaseUser(userDataFormatted);
        } else {
          setFirebaseUser(null);
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

  // Function to manually refresh Firebase token
  const refreshFirebaseToken = useCallback(async (): Promise<string | null> => {
    try {
      const currentUser = firebaseInstance.fireBaseAuth.currentUser;
      if (currentUser) {
        const newToken = await currentUser.getIdToken(true);
        console.log('Firebase ID token manually refreshed');
        return newToken;
      }
      return null;
    } catch (error) {
      console.error('Error manually refreshing Firebase ID token:', error);
      return null;
    }
  }, []);

  // Refresh Firebase ID token when ME query completes
  useEffect(() => {
    if (meData?.me && firebaseUser) {
      // Refresh the Firebase ID token after getting user data
      const refreshToken = async () => {
        try {
          const currentUser = firebaseInstance.fireBaseAuth.currentUser;
          if (currentUser) {
            // Force refresh the ID token
            await currentUser.getIdToken(true);
            console.log('Firebase ID token refreshed after ME query completion');
          }
        } catch (error: any) {
          console.error('Error refreshing Firebase ID token:', error);
          // If token refresh fails, it might indicate the user needs to re-authenticate
          if (error.code === 'auth/user-token-expired') {
            console.warn('User token expired, may need to re-authenticate');
          }
        }
      };

      refreshToken();
    }
  }, [meData?.me, firebaseUser]);

  // Memoize combined user data
  const user = useMemo((): CombinedUser | UserData | null => {
    const backendUser = meData?.me
    if (backendUser && firebaseUser) {
      // Combine Firebase and backend user data
      return {
        // Firebase user data
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        emailVerified: firebaseUser.emailVerified,
        // Backend user data (overrides Firebase where applicable)
        id: backendUser.id,
        firebaseId: backendUser.firebaseId,
        name: backendUser.name || firebaseUser.displayName,
        phoneNumber: backendUser.phoneNumber,
        phoneVerified: backendUser.phoneVerified,
        role: backendUser.role,
        createdAt: backendUser.createdAt,
      };
    }
    return backendUser || firebaseUser;
  }, [meData?.me, firebaseUser]);

  // Memoize error state
  const combinedError = useMemo(() => {
    return error || meError?.message || null;
  }, [error, meError]);

  const value = useMemo<AuthContextType>(
    () => ({
      firebaseUser,
      user,
      isAuthenticated: !!firebaseUser,
      isAuthenticating,
      isLoadingUser: meLoading,
      triggerUnAuthenticate,
      triggerGoogleLogin,
      refreshFirebaseToken,
      error: combinedError,
    }),
    [firebaseUser, user, isAuthenticating, meLoading, triggerUnAuthenticate, triggerGoogleLogin, refreshFirebaseToken, combinedError]
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
