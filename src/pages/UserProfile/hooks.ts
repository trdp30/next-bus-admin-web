import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGraphQLMutation } from '../../hooks/useGraphQL';
import { DELETE_USER_MUTATION } from '../../graphql';
import {
  getInitialFormData,
  getInitialDeleteData,
  validateProfileForm,
  validateDeleteAccount
} from './helper';
import type { UserProfileState, ProfileFormData, DeleteAccountData } from './types';

/**
 * Custom hooks for the UserProfile page
 */

export const useUserProfile = () => {
  const { user, triggerUnAuthenticate } = useAuth();
  const [state, setState] = useState<UserProfileState>({
    isEditing: false,
    isDeleting: false,
    showDeleteConfirm: false,
    formData: getInitialFormData(user),
    deleteData: getInitialDeleteData(),
  });

  const [deleteUser, { loading: deleteLoading, error: deleteError }] = useGraphQLMutation(
    DELETE_USER_MUTATION,
    {
      onCompleted: () => {
        // Account deleted successfully, sign out
        triggerUnAuthenticate();
      },
      onError: (error) => {
        console.error('Error deleting account:', error);
        setState(prev => ({ ...prev, isDeleting: false }));
      },
    }
  );

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setState(prev => ({
        ...prev,
        formData: getInitialFormData(user),
      }));
    }
  }, [user]);

  const handleEditToggle = useCallback(() => {
    setState(prev => ({
      ...prev,
      isEditing: !prev.isEditing,
      formData: getInitialFormData(user),
    }));
  }, [user]);

  const handleFormChange = useCallback((field: keyof ProfileFormData, value: string) => {
    setState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        [field]: value,
      },
    }));
  }, []);

  const handleSaveProfile = useCallback(async () => {
    const errors = validateProfileForm(state.formData);
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    try {
      // TODO: Implement profile update mutation
      console.log('Updating profile:', state.formData);
      setState(prev => ({ ...prev, isEditing: false }));
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  }, [state.formData]);

  const handleCancelEdit = useCallback(() => {
    setState(prev => ({
      ...prev,
      isEditing: false,
      formData: getInitialFormData(user),
    }));
  }, [user]);

  const handleDeleteAccount = useCallback(() => {
    setState(prev => ({ ...prev, showDeleteConfirm: true }));
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    const errors = validateDeleteAccount(state.deleteData);
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    if (!user || (!('uid' in user) && !('id' in user))) {
      alert('User not found');
      return;
    }

    try {
      setState(prev => ({ ...prev, isDeleting: true }));
      await deleteUser();
    } catch (error) {
      console.error('Error deleting account:', error);
      setState(prev => ({ ...prev, isDeleting: false }));
    }
  }, [state.deleteData, user, deleteUser]);

  const handleDeleteCancel = useCallback(() => {
    setState(prev => ({
      ...prev,
      showDeleteConfirm: false,
      deleteData: getInitialDeleteData(),
    }));
  }, []);

  const handleDeleteDataChange = useCallback((field: keyof DeleteAccountData, value: string) => {
    setState(prev => ({
      ...prev,
      deleteData: {
        ...prev.deleteData,
        [field]: value,
      },
    }));
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await triggerUnAuthenticate();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [triggerUnAuthenticate]);

  return {
    user,
    state,
    deleteLoading,
    deleteError,
    handleEditToggle,
    handleFormChange,
    handleSaveProfile,
    handleCancelEdit,
    handleDeleteAccount,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleDeleteDataChange,
    handleLogout,
  };
};
