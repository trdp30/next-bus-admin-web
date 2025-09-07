export interface UserProfilePageProps {
  // No specific props needed as it uses context
}

export interface ProfileFormData {
  displayName: string;
  email: string;
  phoneNumber?: string;
}

export interface DeleteAccountData {
  confirmText: string;
  reason?: string;
}

export interface UserProfileState {
  isEditing: boolean;
  isDeleting: boolean;
  showDeleteConfirm: boolean;
  formData: ProfileFormData;
  deleteData: DeleteAccountData;
}
