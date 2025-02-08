import { AuthenticatePayload, AuthState } from '@containers/Auth/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { CurrentUser } from '@/types';

export const initialState: AuthState = {
  initializing: true,
  initialized: false,
  authenticated: false,
  authenticating: true,
  idToken: null,
  user: undefined,
  currentUser: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initialize: () => {
      return {
        ...initialState,
        initializing: true,
      };
    },
    initializeComplete: (state) => {
      state.initializing = false;
      state.initialized = true;
    },
    triggerAuthenticate: (_state) => {},
    authenticate: (state, action: PayloadAction<AuthenticatePayload>) => {
      state.initializing = false;
      state.initialized = true;
      state.authenticated = !!(action.payload?.idToken || '').trim();
      state.authenticating = false;
      state.idToken = action.payload?.idToken || null;
      state.user = action.payload.user;
    },
    authenticateFailed: (state) => {
      state.initializing = false;
      state.initialized = true;
      state.authenticated = false;
      state.authenticating = false;
    },
    unAuthenticate: (state) => {
      state.initializing = false;
      state.initialized = true;
      state.authenticated = false;
      state.authenticating = false;
    },

    initializeGoogleLogin: (_state) => {},
    storeCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
      state.currentUser = action.payload;
    },
    deleteAccount: (_state) => {},
  },
});

export const {
  initialize,
  initializeComplete,
  authenticate,
  unAuthenticate,
  authenticateFailed,
  initializeGoogleLogin,
  triggerAuthenticate,
  storeCurrentUser,
} = authSlice.actions;

export default authSlice.reducer;
