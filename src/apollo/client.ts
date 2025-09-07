import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { firebaseInstance } from '../utils/firebase/firebase';

// HTTP link to your GraphQL endpoint
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

// Auth link to add Firebase token to requests
const authLink = setContext(async (_, { headers }) => {
  let token = null;

  try {
    if (firebaseInstance?.fireBaseAuth) {
      const currentUser = firebaseInstance.fireBaseAuth.currentUser;
      if (currentUser) {
        token = await currentUser.getIdToken();
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

// Error link to handle GraphQL errors
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);

    // Handle specific network errors
    if ('statusCode' in networkError) {
      if (networkError.statusCode === 401) {
        console.error('Authentication error - user may need to re-login');
        // You can dispatch a logout action here if needed
      }
    }
  }
});

// Create Apollo Client
export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      // Define cache policies for your data
      Query: {
        fields: {
          // Add field policies here if needed
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

// Make apolloClient available globally for cache management
if (typeof window !== 'undefined') {
  (window as any).apolloClient = apolloClient;
}

export default apolloClient;
