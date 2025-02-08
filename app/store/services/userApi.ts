import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import { catchError } from '@utils/sentry';
import { storeCurrentUser } from '@containers/Auth/slice';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQuery,
  tagTypes: ['Users'],
  endpoints: (build) => ({
    getCurrentUser: build.query({
      query: () => 'user/me',
      providesTags: (result) => (result ? [{ type: 'Users', id: result?._id }] : ['Users']),
      onQueryStarted: async (_id, { dispatch, queryFulfilled }) => {
        try {
          // @ts-expect-error sdf
          const { data, error } = await queryFulfilled;
          if (!error) {
            dispatch(storeCurrentUser(data));
          }
        } catch (error) {
          catchError({
            title: 'Get current user',
            error: error as Error,
          });
        }
      },
    }),
    getUserById: build.query({
      query: (userId) => `user/${userId}`,
      providesTags: (result) => (result ? [{ type: 'Users', id: result?._id }] : ['Users']),
    }),
    getUsers: build.query({
      query: (queryParams) => ({
        url: 'user',
        params: queryParams,
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }: { _id: string }) => ({ type: 'Users', id: _id })), { type: 'Users', id: 'LIST' }]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    updateUser: build.mutation({
      query({ id, ...payload }) {
        return {
          url: `user/${id}`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: (_result, _error, arg) => [{ type: 'Users', id: arg.id }],
    }),
    createUser: build.mutation({
      query: (payload) => ({
        url: 'user',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Users'],
    }),
    registerUser: build.mutation({
      query: (payload) => ({
        url: 'user/register',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `user/profile/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Users', id: arg }],
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useRegisterUserMutation,
  useDeleteUserMutation,
} = userApi;
