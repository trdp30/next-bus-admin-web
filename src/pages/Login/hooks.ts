import { useState, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getErrorMessage } from './helper';

/**
 * Custom hooks for the Login page
 */

export const useLogin = () => {
  const { triggerGoogleLogin, isAuthenticating, error } = useAuth();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleGoogleLogin = useCallback(async () => {
    try {
      setLocalError(null);
      await triggerGoogleLogin();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setLocalError(errorMessage);
    }
  }, [triggerGoogleLogin]);

  const clearError = useCallback(() => {
    setLocalError(null);
  }, []);

  return {
    handleGoogleLogin,
    isAuthenticating,
    error: localError || error,
    clearError,
  };
};

export const useLoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (callback: () => Promise<void>) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await callback();
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  return {
    isSubmitting,
    handleSubmit,
  };
};
