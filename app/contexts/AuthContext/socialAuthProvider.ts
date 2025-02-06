import { FacebookAuthProvider, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';

export const socialLoginProviders = {
  google: new GoogleAuthProvider(),
  facebook: new FacebookAuthProvider(),
  apple: new OAuthProvider('apple.com'),
  microsoft: new OAuthProvider('microsoft.com'),
};

export const getAuthProvider = (name: string) => {
  switch (name) {
    case 'google':
      return GoogleAuthProvider;
    default:
      return '';
  }
};
