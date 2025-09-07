# User Profile Feature

## Overview
The User Profile feature provides a comprehensive user management interface where users can view, edit, and delete their accounts. This feature is fully integrated with Firebase Authentication and GraphQL backend.

## Features

### 🔍 **Profile Viewing**
- Display user information (name, email, phone, profile photo)
- Show account status (email verified, role)
- Display user ID and account creation date
- Beautiful gradient header with profile photo

### ✏️ **Profile Editing**
- Edit display name, email, and phone number
- Form validation with real-time error checking
- Save/Cancel functionality
- Clean, intuitive edit interface

### 🗑️ **Account Deletion**
- Secure account deletion with confirmation
- Type "DELETE" to confirm deletion
- Optional feedback form for improvement
- Complete data removal from backend
- Automatic logout after deletion

### 🧭 **Navigation**
- Integrated navigation bar with Dashboard and Profile links
- User info display in navigation
- Logout functionality from navigation
- Responsive design for all screen sizes

## File Structure

```
src/pages/UserProfile/
├── index.tsx          # Main UserProfile component
├── types.d.ts         # TypeScript interfaces
├── helper.ts          # Utility functions
└── hooks.ts           # Custom hooks for state management

src/components/navigation/
└── Navigation.tsx     # Navigation component

src/graphql/
└── mutations.ts       # DELETE_USER_MUTATION added
```

## Key Components

### UserProfile Component
- **Location**: `src/pages/UserProfile/index.tsx`
- **Purpose**: Main profile page with view/edit/delete functionality
- **Features**:
  - Profile header with user photo and info
  - Edit mode toggle
  - Form validation
  - Delete confirmation modal
  - Responsive design

### Navigation Component
- **Location**: `src/components/navigation/Navigation.tsx`
- **Purpose**: App-wide navigation with user info
- **Features**:
  - Dashboard and Profile navigation
  - User profile display
  - Logout functionality
  - Active page highlighting

### Custom Hooks
- **useUserProfile**: Main hook managing profile state and operations
- **Form validation**: Real-time validation for profile editing
- **Delete confirmation**: Secure account deletion process

## GraphQL Integration

### DELETE_USER_MUTATION
```graphql
mutation DeleteUser($userId: String!) {
  deleteUser(userId: $userId) {
    success
    message
  }
}
```

## Usage

### Accessing Profile
1. Navigate to `/profile` or click the Profile link in navigation
2. View current profile information
3. Click "Edit Profile" to modify information
4. Click "Delete Account" in the danger zone to remove account

### Profile Editing
1. Click "Edit Profile" button
2. Modify desired fields (name, email, phone)
3. Click "Save Changes" to update
4. Click "Cancel" to discard changes

### Account Deletion
1. Scroll to "Danger Zone" section
2. Click "Delete Account" button
3. Type "DELETE" in confirmation field
4. Optionally provide feedback
5. Click "Delete Account" to confirm

## Security Features

- **Confirmation Required**: Users must type "DELETE" to confirm
- **Backend Integration**: Account deletion through GraphQL mutation
- **Automatic Logout**: User is logged out after account deletion
- **Error Handling**: Comprehensive error handling and user feedback

## Styling

- **Tailwind CSS**: Modern, responsive design
- **Gradient Headers**: Beautiful visual appeal
- **Form Validation**: Clear error messaging
- **Modal Dialogs**: Professional confirmation dialogs
- **Responsive**: Works on all device sizes

## Integration Points

- **Firebase Auth**: User authentication and profile data
- **GraphQL**: Backend communication for account deletion
- **Navigation**: Seamless app navigation
- **State Management**: React hooks for state management

## Future Enhancements

- Profile photo upload
- Password change functionality
- Two-factor authentication
- Account activity history
- Export user data (GDPR compliance)
