import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user, triggerUnAuthenticate } = useAuth();

  const handleLogout = async () => {
    await triggerUnAuthenticate();
  };

  return (
    <div className="h-full bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Jatayat Dashboard</h1>
            <div className="flex items-center space-x-4">
              {user?.photoURL && (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover"
                />
              )}
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{user?.displayName || 'User'}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Jatayat Fleet Management</h2>
          <p className="text-xl text-gray-600">Manage your fleet, track vehicles, and monitor journeys from this dashboard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 text-center border border-gray-100">
            <div className="text-5xl mb-4">🚗</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Vehicle Management</h3>
            <p className="text-gray-600 mb-6">View and manage your fleet vehicles</p>
            <button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg">
              Manage Vehicles
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 text-center border border-gray-100">
            <div className="text-5xl mb-4">📍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Location Tracking</h3>
            <p className="text-gray-600 mb-6">Real-time vehicle tracking and monitoring</p>
            <button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg">
              View Tracking
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 text-center border border-gray-100">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h3>
            <p className="text-gray-600 mb-6">Fleet performance and journey analytics</p>
            <button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg">
              View Analytics
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 text-center border border-gray-100">
            <div className="text-5xl mb-4">⚙️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Settings</h3>
            <p className="text-gray-600 mb-6">Configure your account and preferences</p>
            <button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg">
              Open Settings
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
