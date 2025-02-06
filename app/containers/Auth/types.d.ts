export interface AuthState {
  initializing: boolean;
  initialized: boolean;
  authenticated: boolean;
  authenticating: boolean;
  idToken: string | null;
  user?: User;
}

export interface AuthenticatePayload {
  idToken: string;
  user?: User;
}

export type Email = string;

export type Phone = string;

export type Password = string;

export interface ProviderData {
  providerId: string;
  uid: string;
  displayName: string;
  email: Email;
  phoneNumber: Phone | null;
  photoURL: string;
}

export interface StsTokenManager {
  refreshToken: string;
  idToken: string;
  expirationTime: number;
}

export interface FbUser {
  uid: string;
  email: Email;
  emailVerified: true;
  displayName: string;
  isAnonymous: false;
  photoURL: string;
  providerData: ProviderData[];
  stsTokenManager: StsTokenManager;
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
}

export interface Params {
  [key: string]: string;
}

export interface QueryParams {
  from?: string;
}
