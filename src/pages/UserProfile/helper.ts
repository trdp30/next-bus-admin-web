import type { ProfileFormData, DeleteAccountData } from './types';

/**
 * Helper functions for the UserProfile page
 */

export const getInitialFormData = (user: any): ProfileFormData => ({
  displayName: user?.displayName || '',
  email: user?.email || '',
  phoneNumber: user?.phoneNumber || '',
});

export const getInitialDeleteData = (): DeleteAccountData => ({
  confirmText: '',
  reason: '',
});

export const validateProfileForm = (formData: ProfileFormData): string[] => {
  const errors: string[] = [];

  if (!formData.displayName.trim()) {
    errors.push('Display name is required');
  }

  if (!formData.email.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push('Please enter a valid email address');
  }

  if (formData.phoneNumber && !/^\+?[\d\s\-\(\)]+$/.test(formData.phoneNumber)) {
    errors.push('Please enter a valid phone number');
  }

  return errors;
};

export const validateDeleteAccount = (deleteData: DeleteAccountData): string[] => {
  const errors: string[] = [];

  if (deleteData.confirmText !== 'DELETE') {
    errors.push('Please type "DELETE" to confirm account deletion');
  }

  return errors;
};

export const formatUserRole = (role: string): string => {
  switch (role) {
    case 'DRIVER':
      return 'Driver';
    case 'ADMIN':
      return 'Administrator';
    case 'SUPER_ADMIN':
      return 'Super Administrator';
    default:
      return role;
  }
};

export const getRoleColor = (role: string): string => {
  switch (role) {
    case 'DRIVER':
      return 'bg-blue-100 text-blue-800';
    case 'ADMIN':
      return 'bg-yellow-100 text-yellow-800';
    case 'SUPER_ADMIN':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getUserDisplayName = (user: any): string => {
  if (!user) return 'User';
  if ('displayName' in user && user.displayName) return user.displayName;
  if ('name' in user && user.name) return user.name;
  return 'User';
};

export const getUserName = (user: any): string => {
  if (!user) return 'Not set';
  if ('displayName' in user && user.displayName) return user.displayName;
  if ('name' in user && user.name) return user.name;
  return 'Not set';
};

export const getUserId = (user: any): string => {
  if (!user) return 'Unknown';
  if ('uid' in user && user.uid) return user.uid;
  if ('id' in user && user.id) return user.id;
  return 'Unknown';
};
