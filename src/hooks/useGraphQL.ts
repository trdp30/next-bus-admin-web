import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import type { OperationVariables } from '@apollo/client';
import type { DocumentNode } from 'graphql';

/**
 * Custom hook for GraphQL operations
 */

// Generic query hook
export const useGraphQLQuery = <TData = any, TVariables extends OperationVariables = OperationVariables>(
  query: DocumentNode,
  options?: {
    variables?: TVariables;
    skip?: boolean;
    fetchPolicy?: 'cache-first' | 'cache-and-network' | 'network-only' | 'cache-only' | 'no-cache';
    errorPolicy?: 'none' | 'ignore' | 'all';
  }
) => {
  return useQuery<TData, TVariables>(query, {
    variables: options?.variables,
    skip: options?.skip,
    fetchPolicy: options?.fetchPolicy || 'cache-and-network',
    errorPolicy: options?.errorPolicy || 'all',
  });
};

// Generic mutation hook
export const useGraphQLMutation = <TData = any, TVariables = Record<string, any>>(
  mutation: DocumentNode,
  options?: {
    onCompleted?: (data: TData) => void;
    onError?: (error: any) => void;
    refetchQueries?: Array<{ query: DocumentNode; variables?: any }>;
  }
) => {
  return useMutation<TData, TVariables>(mutation, {
    onCompleted: options?.onCompleted,
    onError: options?.onError,
    refetchQueries: options?.refetchQueries,
  });
};

// Lazy query hook
export const useGraphQLLazyQuery = <TData = any, TVariables extends OperationVariables = OperationVariables>(
  query: DocumentNode,
  options?: {
    onCompleted?: (data: TData) => void;
    onError?: (error: any) => void;
  }
) => {
  return useLazyQuery<TData, TVariables>(query, {
    onCompleted: options?.onCompleted,
    onError: options?.onError,
  });
};

// Hook for handling GraphQL errors
export const useGraphQLErrorHandler = () => {
  const handleError = (error: any) => {
    if (error?.graphQLErrors?.length > 0) {
      error.graphQLErrors.forEach((err: any) => {
        console.error('GraphQL Error:', err.message);
      });
    }

    if (error?.networkError) {
      console.error('Network Error:', error.networkError);
    }
  };

  return { handleError };
};