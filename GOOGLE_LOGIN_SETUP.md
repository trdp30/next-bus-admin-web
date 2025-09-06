# Google Login Setup for Jatayat Web

This guide will help you set up Google authentication for the Jatayat web application.

## Prerequisites

1. A Firebase project
2. Google Cloud Console access
3. Node.js and Yarn installed

## Setup Steps

### 1. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Google provider
   - Add your domain to authorized domains

### 2. Get Firebase Configuration

1. In Firebase Console, go to Project Settings
2. Scroll down to "Your apps" section
3. Click "Add app" and select Web
4. Register your app with a nickname
5. Copy the Firebase configuration object

### 3. Environment Variables

1. Copy the `env.example` file to `.env`:
   ```bash
   cp env.example .env
   ```

2. Fill in your Firebase configuration in `.env`:
   ```env
   VITE_API_KEY=your_api_key_here
   VITE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com
   VITE_PROJECT_ID=your_project_id
   VITE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_APP_ID=your_app_id
   VITE_MEASUREMENT_ID=your_measurement_id
   ```

### 4. Install Dependencies

The required dependencies are already included in `package.json`:
- `firebase`: ^12.2.1

If you need to install them:
```bash
yarn install
```

### 5. Run the Application

```bash
yarn dev
```

## Features Implemented

### Authentication Context
- **File**: `src/contexts/AuthContext/index.tsx`
- **Features**:
  - Google Sign-in with popup
  - User state management
  - Authentication status tracking
  - Error handling
  - Sign-out functionality

### Login Component
- **File**: `src/components/Login/index.tsx`
- **Features**:
  - Google Sign-in button
  - Loading states
  - Error display
  - Responsive design

### Dashboard Component
- **File**: `src/components/Dashboard/index.tsx`
- **Features**:
  - User profile display
  - Logout functionality
  - Fleet management cards
  - Responsive layout

### Firebase Configuration
- **File**: `src/utils/firebase/firebase.ts`
- **Features**:
  - Firebase initialization
  - Environment variable support
  - Auth state management
  - Token retrieval

## Usage

### Basic Authentication Flow

1. **Unauthenticated State**: Shows login screen with Google sign-in button
2. **Sign-in Process**: User clicks button → Google popup → Firebase authentication
3. **Authenticated State**: Shows dashboard with user info and fleet management options
4. **Sign-out**: User can logout from the dashboard

### Using the Auth Context

```tsx
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { 
    isAuthenticated, 
    user, 
    triggerGoogleLogin, 
    triggerUnAuthenticate 
  } = useAuth();

  // Your component logic
}
```

## Troubleshooting

### Common Issues

1. **Firebase not initialized**
   - Check if environment variables are set correctly
   - Ensure Firebase project is properly configured

2. **Google Sign-in popup blocked**
   - Check browser popup settings
   - Ensure domain is added to authorized domains in Firebase

3. **Authentication errors**
   - Check Firebase console for error logs
   - Verify Google OAuth configuration

### Environment Variables

Make sure all environment variables start with `VITE_` prefix for Vite to recognize them.

## Security Notes

- Never commit `.env` file to version control
- Use environment-specific Firebase projects for development/production
- Regularly rotate Firebase API keys
- Monitor authentication logs in Firebase Console

## Next Steps

- Integrate with your backend API
- Add role-based access control
- Implement additional authentication methods
- Add user profile management
- Connect to your existing user database
