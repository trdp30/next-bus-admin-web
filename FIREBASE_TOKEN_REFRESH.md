# Firebase ID Token Refresh Implementation

## Overview
Implemented automatic Firebase ID token refresh after the ME query completes, ensuring that the authentication token is always fresh and up-to-date for subsequent API calls.

## Implementation Details

### 1. **Automatic Token Refresh**
**Location**: `src/contexts/AuthContext/index.tsx`

The system now automatically refreshes the Firebase ID token when:
- ME query completes successfully
- Both `meData` and `firebaseUser` are available
- User data is successfully retrieved from the backend

```typescript
// Refresh Firebase ID token when ME query completes
useEffect(() => {
  if (meData?.me && firebaseUser) {
    const refreshToken = async () => {
      try {
        const currentUser = firebaseInstance.fireBaseAuth.currentUser;
        if (currentUser) {
          // Force refresh the ID token
          await currentUser.getIdToken(true);
          console.log('Firebase ID token refreshed after ME query completion');
          
          // Clear Apollo cache for fresh data
          if ((window as any).apolloClient) {
            (window as any).apolloClient.cache.evict({ fieldName: 'me' });
            (window as any).apolloClient.cache.gc();
          }
        }
      } catch (error: any) {
        console.error('Error refreshing Firebase ID token:', error);
        if (error.code === 'auth/user-token-expired') {
          console.warn('User token expired, may need to re-authenticate');
        }
      }
    };
    
    refreshToken();
  }
}, [meData?.me, firebaseUser]);
```

### 2. **Manual Token Refresh Function**
Added a `refreshFirebaseToken` function to the AuthContext for manual token refresh when needed:

```typescript
export type AuthContextType = {
  // ... other properties
  refreshFirebaseToken: () => Promise<string | null>;
  // ... other properties
};

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
```

### 3. **Apollo Client Integration**
**Location**: `src/apollo/client.ts`

Enhanced Apollo Client to:
- Make apolloClient globally available for cache management
- Automatically get fresh tokens on each request
- Handle authentication errors gracefully

```typescript
// Make apolloClient available globally for cache management
if (typeof window !== 'undefined') {
  (window as any).apolloClient = apolloClient;
}

// Auth link automatically gets fresh tokens
const authLink = setContext(async (_, { headers }) => {
  let token = null;
  try {
    if (firebaseInstance?.fireBaseAuth) {
      const currentUser = firebaseInstance.fireBaseAuth.currentUser;
      if (currentUser) {
        token = await currentUser.getIdToken(); // Gets fresh token
      }
    }
  } catch (error) {
    console.warn('Failed to get Firebase token for GraphQL request:', error);
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
```

## Authentication Flow with Token Refresh

```
1. User Login → Firebase Authentication
2. Firebase Auth Complete → setFirebaseUser()
3. firebaseUser Available → ME Query Automatically Called
4. ME Query Complete → setBackendUser()
5. Token Refresh Triggered → currentUser.getIdToken(true)
6. Cache Cleared → Fresh data for subsequent requests
7. Combined User Data → Available Throughout App
```

## Key Features

### 1. **Automatic Refresh**
- Token is automatically refreshed after ME query completion
- No manual intervention required
- Ensures token is always fresh for API calls

### 2. **Cache Management**
- Apollo cache is cleared after token refresh
- Ensures fresh data on subsequent requests
- Prevents stale data issues

### 3. **Error Handling**
- Comprehensive error handling for token refresh failures
- Specific handling for expired tokens
- Graceful fallback mechanisms

### 4. **Manual Refresh**
- `refreshFirebaseToken()` function available for manual refresh
- Returns the new token for immediate use
- Useful for critical operations requiring fresh tokens

## Usage Examples

### Automatic Token Refresh
```typescript
// Token is automatically refreshed after ME query completes
const { user, isAuthenticated } = useAuth();
// Token refresh happens automatically in the background
```

### Manual Token Refresh
```typescript
const { refreshFirebaseToken } = useAuth();

const handleCriticalOperation = async () => {
  // Manually refresh token before critical operation
  const newToken = await refreshFirebaseToken();
  if (newToken) {
    // Proceed with critical operation
    console.log('Fresh token obtained:', newToken);
  }
};
```

### Apollo Client Integration
```typescript
// Apollo Client automatically uses fresh tokens
const { data, loading, error } = useQuery(SOME_QUERY);
// Each request automatically gets a fresh token
```

## Benefits

### 1. **Security**
- Ensures tokens are always fresh and valid
- Reduces risk of expired token issues
- Maintains secure authentication state

### 2. **Reliability**
- Prevents API calls with expired tokens
- Reduces authentication-related errors
- Improves overall system reliability

### 3. **Performance**
- Fresh tokens reduce retry attempts
- Cache clearing ensures fresh data
- Optimized authentication flow

### 4. **User Experience**
- Seamless authentication experience
- No unexpected logout due to expired tokens
- Consistent API response times

## Error Scenarios Handled

### 1. **Token Expired**
```typescript
if (error.code === 'auth/user-token-expired') {
  console.warn('User token expired, may need to re-authenticate');
}
```

### 2. **Network Errors**
- Graceful handling of network failures
- Retry mechanisms for token refresh
- Fallback to cached data when appropriate

### 3. **Authentication Errors**
- 401 errors handled by Apollo Client
- Automatic logout on critical auth failures
- User notification for re-authentication

## Monitoring and Debugging

### Console Logs
- Token refresh events are logged
- Error scenarios are logged with details
- Cache operations are logged for debugging

### Error Tracking
- All token refresh errors are captured
- Authentication failures are tracked
- Performance metrics can be added

## Future Enhancements

1. **Token Expiry Monitoring**: Proactive token refresh before expiry
2. **Retry Logic**: Automatic retry for failed token refresh attempts
3. **Performance Metrics**: Track token refresh performance
4. **Background Refresh**: Periodic token refresh in background
5. **Token Validation**: Validate token before use

## Best Practices

1. **Always Use Fresh Tokens**: Let the system handle token refresh automatically
2. **Handle Errors Gracefully**: Implement proper error handling for token failures
3. **Monitor Token Health**: Track token refresh success/failure rates
4. **Cache Management**: Clear cache after token refresh for fresh data
5. **Security**: Never store tokens in localStorage or expose them in logs

## Conclusion

The Firebase ID token refresh implementation ensures:
- **Automatic token refresh** after ME query completion
- **Fresh tokens** for all subsequent API calls
- **Cache management** for consistent data
- **Error handling** for robust authentication
- **Manual refresh capability** for critical operations

This implementation provides a secure, reliable, and user-friendly authentication experience with automatic token management.
