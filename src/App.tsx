import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { initializeFirebase } from './utils/firebase/firebase';
import { apolloClient } from './apollo/client';
import { Login, Dashboard, UserProfile } from './pages';
import Navigation from './components/navigation/Navigation';
import './App.css';

const AppContent: React.FC = () => {
  const { isAuthenticated, isAuthenticating, isLoadingUser, error } = useAuth();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  if (isAuthenticating || isLoadingUser) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
        <p className="text-lg">
          {isAuthenticating ? 'Authenticating...' : 'Loading user data...'}
        </p>
        {error && (
          <p className="text-red-200 text-sm mt-2">Error: {error}</p>
        )}
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderPage = () => {
    switch (currentPath) {
      case '/profile':
        return <UserProfile />;
      case '/':
      case '/dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Navigation currentPath={currentPath} onNavigate={handleNavigate} />
      <div className="flex-1">
        {renderPage()}
      </div>
    </div>
  );
};

function App() {
  useEffect(() => {
    // Initialize Firebase when the app starts
    initializeFirebase();
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
