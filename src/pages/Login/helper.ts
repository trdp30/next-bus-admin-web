import type { LoginError } from './types';

/**
 * Helper functions for the Login page
 */

export const formatGoogleAuthError = (error: any): LoginError => {
  const errorMap: Record<string, string> = {
    'auth/popup-closed-by-user': 'Sign-in was cancelled',
    'auth/popup-blocked': 'Popup was blocked by browser',
    'auth/network-request-failed': 'Network error occurred',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later',
    'auth/user-disabled': 'This account has been disabled',
    'auth/user-not-found': 'No account found with this email',
    'auth/wrong-password': 'Incorrect password',
    'auth/invalid-email': 'Invalid email address',
    'auth/user-cancelled': 'Sign-in was cancelled',
    'auth/account-exists-with-different-credential': 'An account already exists with this email',
  };

  return {
    code: error.code || 'unknown',
    message: errorMap[error.code] || error.message || 'An unexpected error occurred',
  };
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getErrorMessage = (error: any): string => {
  const formattedError = formatGoogleAuthError(error);
  return formattedError.message;
};
