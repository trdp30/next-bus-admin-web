# Apollo Client Setup for Jatayat Web

This document outlines the Apollo Client configuration and usage in the Jatayat web application.

## 🚀 **Setup Overview**

Apollo Client has been configured to connect to your backend GraphQL server running on `localhost:4000`.

## 📁 **File Structure**

```
src/
├── apollo/
│   └── client.ts              # Apollo Client configuration
├── graphql/
│   ├── queries.ts             # GraphQL queries
│   ├── mutations.ts           # GraphQL mutations
│   ├── fragments.ts           # Reusable GraphQL fragments
│   └── index.ts               # Export all GraphQL operations
├── hooks/
│   └── useGraphQL.ts          # Custom GraphQL hooks
└── App.tsx                    # Apollo Provider integration
```

## ⚙️ **Configuration**

### **Apollo Client Setup**
- **Endpoint**: `http://localhost:4000/graphql`
- **Authentication**: Firebase token automatically added to requests
- **Error Handling**: Comprehensive error handling for network and GraphQL errors
- **Caching**: In-memory cache with configurable policies

### **Authentication Integration**
- Firebase tokens are automatically attached to GraphQL requests
- Token refresh is handled automatically
- 401 errors are logged for potential re-authentication needs

## 🔧 **Usage Examples**

### **Using GraphQL Queries**

```typescript
import { useGraphQLQuery } from '../hooks/useGraphQL';
import { ME_QUERY, VEHICLES_QUERY } from '../graphql';

const MyComponent = () => {
  // Simple query
  const { data, loading, error } = useGraphQLQuery(ME_QUERY);
  
  // Query with variables
  const { data: vehicles } = useGraphQLQuery(VEHICLES_QUERY, {
    variables: { where: { isActive: true } }
  });
  
  // Query with custom options
  const { data: userData } = useGraphQLQuery(ME_QUERY, {
    skip: !isAuthenticated,
    fetchPolicy: 'network-only',
    errorPolicy: 'all'
  });
};
```

### **Using GraphQL Mutations**

```typescript
import { useGraphQLMutation } from '../hooks/useGraphQL';
import { ASSIGN_VEHICLE_MUTATION } from '../graphql';

const MyComponent = () => {
  const [assignVehicle, { loading, error }] = useGraphQLMutation(
    ASSIGN_VEHICLE_MUTATION,
    {
      onCompleted: (data) => {
        console.log('Vehicle assigned:', data);
      },
      onError: (error) => {
        console.error('Assignment failed:', error);
      }
    }
  );

  const handleAssign = () => {
    assignVehicle({
      variables: {
        vehicleId: 'vehicle-123',
        password: 'password123'
      }
    });
  };
};
```

### **Using Lazy Queries**

```typescript
import { useGraphQLLazyQuery } from '../hooks/useGraphQL';
import { SEARCH_PLACES_QUERY } from '../graphql';

const SearchComponent = () => {
  const [searchPlaces, { data, loading }] = useGraphQLLazyQuery(
    SEARCH_PLACES_QUERY,
    {
      onCompleted: (data) => {
        console.log('Search results:', data);
      }
    }
  );

  const handleSearch = (query: string) => {
    searchPlaces({ variables: { query } });
  };
};
```

## 📊 **Available Queries**

### **User Queries**
- `ME_QUERY` - Get current user information

### **Vehicle Queries**
- `VEHICLES_QUERY` - Get all vehicles with filtering
- `CURRENT_ASSIGNED_VEHICLE_QUERY` - Get currently assigned vehicle

### **Tracking Queries**
- `CURRENT_TRACKING_SESSION_QUERY` - Get active tracking session

### **Place Queries**
- `PLACES_QUERY` - Get places with filtering
- `SEARCH_PLACES_QUERY` - Search places by query

### **Trip Type Queries**
- `TRIP_TYPES_QUERY` - Get trip types

## 🔄 **Available Mutations**

### **Authentication**
- `REGISTER_USER` - Register new user

### **Vehicle Management**
- `ASSIGN_VEHICLE` - Assign vehicle to user
- `UNASSIGN_VEHICLE` - Unassign vehicle from user

### **Tracking**
- `START_TRACKING_MUTATION` - Start tracking session
- `STOP_TRACKING_MUTATION` - Stop tracking session

### **Places**
- `CREATE_PLACE` - Create new place
- `UPDATE_PLACE` - Update existing place

### **Trip Types**
- `CREATE_TRIP_TYPE` - Create new trip type
- `UPDATE_TRIP_TYPE` - Update existing trip type

## 🎯 **Error Handling**

The Apollo Client is configured with comprehensive error handling:

### **GraphQL Errors**
- Automatically logged to console
- Can be handled in component error boundaries

### **Network Errors**
- 401 errors logged for authentication issues
- Network connectivity issues handled gracefully

### **Custom Error Handling**
```typescript
import { useGraphQLErrorHandler } from '../hooks/useGraphQL';

const MyComponent = () => {
  const { handleError } = useGraphQLErrorHandler();
  
  const { data, error } = useGraphQLQuery(ME_QUERY);
  
  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error, handleError]);
};
```

## 🔐 **Authentication Flow**

1. User logs in with Firebase
2. Firebase token is automatically attached to GraphQL requests
3. Backend validates Firebase token
4. GraphQL operations proceed with user context

## 🚀 **Best Practices**

1. **Use Custom Hooks** - Encapsulate GraphQL logic in custom hooks
2. **Error Handling** - Always handle loading and error states
3. **Caching** - Leverage Apollo's caching for better performance
4. **Type Safety** - Use TypeScript interfaces for GraphQL responses
5. **Optimistic Updates** - Use optimistic responses for better UX

## 🔧 **Development Tips**

1. **Apollo DevTools** - Install Apollo Client DevTools browser extension
2. **Network Tab** - Monitor GraphQL requests in browser dev tools
3. **Error Logging** - Check console for detailed error information
4. **Cache Inspection** - Use Apollo DevTools to inspect cache state

## 📝 **Adding New Queries/Mutations**

1. Add to `src/graphql/queries.ts` or `src/graphql/mutations.ts`
2. Export from `src/graphql/index.ts`
3. Use in components with custom hooks
4. Add TypeScript interfaces for response types

The Apollo Client is now fully integrated and ready to communicate with your backend GraphQL server!
