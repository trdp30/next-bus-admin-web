import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { initializeFirebase } from './utils/firebase/firebase';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';

const AppContent: React.FC = () => {
  const { isAuthenticated, isAuthenticating } = useAuth();

  if (isAuthenticating) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return isAuthenticated ? <Dashboard /> : <Login />;
};

function App() {
  useEffect(() => {
    // Initialize Firebase when the app starts
    initializeFirebase();
  }, []);

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
