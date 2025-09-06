import type { DashboardCard, DashboardStats } from './types';

/**
 * Helper functions for the Dashboard page
 */

export const getDashboardCards = (): DashboardCard[] => {
  return [
    {
      id: 'vehicle-management',
      title: 'Vehicle Management',
      description: 'View and manage your fleet vehicles',
      icon: '🚗',
      action: 'Manage Vehicles',
      onClick: () => console.log('Navigate to vehicle management'),
    },
    {
      id: 'location-tracking',
      title: 'Location Tracking',
      description: 'Real-time vehicle tracking and monitoring',
      icon: '📍',
      action: 'View Tracking',
      onClick: () => console.log('Navigate to location tracking'),
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Fleet performance and journey analytics',
      icon: '📊',
      action: 'View Analytics',
      onClick: () => console.log('Navigate to analytics'),
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Configure your account and preferences',
      icon: '⚙️',
      action: 'Open Settings',
      onClick: () => console.log('Navigate to settings'),
    },
  ];
};

export const formatUserDisplayName = (displayName: string | null): string => {
  return displayName || 'User';
};

export const formatUserEmail = (email: string | null): string => {
  return email || 'No email provided';
};

export const getInitialStats = (): DashboardStats => {
  return {
    totalVehicles: 0,
    activeJourneys: 0,
    totalDistance: 0,
    alerts: 0,
  };
};

export const formatDistance = (distance: number): string => {
  if (distance < 1000) {
    return `${distance}m`;
  }
  return `${(distance / 1000).toFixed(1)}km`;
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};
