# Authentication Flow with Automatic ME Query

## Overview
The application now automatically calls the `ME` query after successful authentication to fetch complete user data from the backend. This ensures that all user information is synchronized between Firebase Authentication and the backend database.

## Flow Diagram

```
User Login → Firebase Auth → Authentication Complete → ME Query → Backend User Data → App Ready
     ↓              ↓                    ↓                    ↓                    ↓
  Google OAuth   Firebase Token      Auth State         GraphQL Query      Complete User Data
```

## Key Components

### 1. `useAuthWithMe` Hook
**Location**: `src/hooks/useAuthWithMe.ts`

This is the main hook that orchestrates the authentication flow:

```typescript
const {
  firebaseUser,      // Immediate Firebase user data
  backendUser,       // Complete backend user data from ME query
  user,              // Combined data (prefers backend, fallback to Firebase)
  isAuthenticating,  // Firebase authentication loading
  isLoadingUser,     // ME query loading
  isLoading,         // Combined loading state
  error,             // Any authentication or ME query errors
  isAuthenticated,   // Authentication status
  triggerUnAuthenticate, // Logout function
  triggerGoogleLogin,    // Login function
} = useAuthWithMe();
```

### 2. Automatic ME Query Trigger
The hook automatically calls the `ME` query when:
- User is authenticated (`isAuthenticated = true`)
- Authentication is complete (`isAuthenticating = false`)
- Uses `network-only` fetch policy for fresh data

### 3. Data Merging Strategy
- **Primary**: Backend user data (from ME query)
- **Fallback**: Firebase user data (immediate)
- **Combined**: `user = backendUser || firebaseUser`

## Implementation Details

### Authentication States

1. **Initial State**: `isAuthenticating = true`, `isLoading = true`
2. **Firebase Auth Complete**: `isAuthenticating = false`, `isLoadingUser = true`
3. **ME Query Complete**: `isLoadingUser = false`, `isLoading = false`
4. **Ready**: User data available, app fully loaded

### Error Handling

- **Firebase Auth Errors**: Handled by `AuthContext`
- **ME Query Errors**: Handled by `useAuthWithMe` hook
- **Combined Error State**: `error = userError || authError`

### Loading States

- **Authentication Loading**: "Authenticating..."
- **User Data Loading**: "Loading user data..."
- **Error Display**: Shows specific error messages

## Usage Examples

### App Component
```typescript
const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading, error } = useAuthWithMe();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return <AuthenticatedApp />;
};
```

### Navigation Component
```typescript
const Navigation: React.FC = () => {
  const { user, triggerUnAuthenticate } = useAuthWithMe();
  
  return (
    <nav>
      <UserInfo user={user} />
      <LogoutButton onClick={triggerUnAuthenticate} />
    </nav>
  );
};
```

### Dashboard Component
```typescript
const Dashboard: React.FC = () => {
  const { user, isLoading } = useAuthWithMe();
  
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return <DashboardContent user={user} />;
};
```

## Benefits

### 1. **Complete User Data**
- Always have the most up-to-date user information
- Backend data includes role, permissions, and custom fields
- Firebase data provides immediate authentication state

### 2. **Seamless Experience**
- No manual ME query calls needed
- Automatic data synchronization
- Consistent loading states across the app

### 3. **Error Resilience**
- Graceful fallback to Firebase data
- Clear error messaging
- Proper error boundaries

### 4. **Performance**
- Network-only fetch policy ensures fresh data
- Efficient re-renders with proper dependency arrays
- Minimal API calls

## GraphQL Integration

### ME Query
```graphql
query Me {
  me {
    id
    firebaseId
    name
    email
    phoneNumber
    photoURL
    emailVerified
    phoneVerified
    role
    createdAt
  }
}
```

### Query Options
- **Skip**: `!isAuthenticated || isAuthenticating`
- **Fetch Policy**: `network-only`
- **Error Policy**: `all`

## Migration from Direct AuthContext Usage

### Before
```typescript
const { user, isAuthenticated } = useAuth();
```

### After
```typescript
const { user, isAuthenticated } = useAuthWithMe();
```

### Benefits of Migration
- Automatic ME query execution
- Complete user data synchronization
- Better error handling
- Consistent loading states

## Troubleshooting

### Common Issues

1. **ME Query Not Called**
   - Check if `isAuthenticated` is true
   - Verify `isAuthenticating` is false
   - Ensure Apollo Client is properly configured

2. **User Data Not Updated**
   - ME query uses `network-only` policy
   - Check backend authentication
   - Verify Firebase token is valid

3. **Loading States Not Working**
   - Check `isLoading` state
   - Verify error handling
   - Ensure proper dependency arrays

### Debug Information

```typescript
const { 
  firebaseUser, 
  backendUser, 
  isAuthenticated, 
  isAuthenticating, 
  isLoadingUser,
  error 
} = useAuthWithMe();

console.log('Auth Debug:', {
  firebaseUser,
  backendUser,
  isAuthenticated,
  isAuthenticating,
  isLoadingUser,
  error
});
```

## Future Enhancements

- **Caching Strategy**: Implement smart caching for ME query
- **Real-time Updates**: WebSocket integration for live user data
- **Offline Support**: Cache user data for offline usage
- **Data Validation**: Validate user data consistency
- **Performance Monitoring**: Track query performance and errors
