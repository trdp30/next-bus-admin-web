import { authSlice } from '@containers/Auth/slice';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/index';

export const selectAuth = createSelector(
  (state: RootState) => state,
  (state) => state[authSlice.name]
);

export const selectUser = createSelector(selectAuth, (state) => state.user);

export const selectAuthInitialized = createSelector(selectAuth, (state) => state.initialized);
