import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGraphQLQuery } from '../../hooks/useGraphQL';
import { VEHICLES_QUERY, CURRENT_TRACKING_SESSION_QUERY } from '../../graphql';
import type { DashboardStats, UserProfile } from './types';
import { getInitialStats, getDashboardCards } from './helper';

/**
 * Custom hooks for the Dashboard page
 */

export const useDashboard = () => {
  const { user, triggerUnAuthenticate, isAuthenticated } = useAuth();
  const [stats, setStats] = useState<DashboardStats>(getInitialStats());

  // GraphQL queries
  const { data: vehiclesData, loading: vehiclesLoading, error: vehiclesError } = useGraphQLQuery(
    VEHICLES_QUERY,
    { skip: !isAuthenticated }
  );

  const { data: trackingData, loading: trackingLoading, error: trackingError } = useGraphQLQuery(
    CURRENT_TRACKING_SESSION_QUERY,
    { skip: !isAuthenticated }
  );

  const handleLogout = useCallback(async () => {
    try {
      await triggerUnAuthenticate();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [triggerUnAuthenticate]);

  // Calculate stats from GraphQL data
  useEffect(() => {
    if (vehiclesData?.vehicles && trackingData) {
      const totalVehicles = vehiclesData.vehicles.length;
      const activeJourneys = trackingData.currentTrackingSession ? 1 : 0;

      setStats({
        totalVehicles,
        activeJourneys,
        totalDistance: 0, // This would need to be calculated from tracking data
        alerts: 0, // This would need to be calculated from various sources
      });
    }
  }, [vehiclesData, trackingData]);

  const isLoading = vehiclesLoading || trackingLoading;

  return {
    user: user as UserProfile | null,
    stats,
    isLoading,
    handleLogout,
    // GraphQL data
    vehiclesData,
    trackingData,
    // Errors
    vehiclesError,
    trackingError,
  };
};

export const useDashboardCards = () => {
  const [cards] = useState(() => getDashboardCards());

  const handleCardClick = useCallback((cardId: string) => {
    const card = cards.find(c => c.id === cardId);
    if (card) {
      card.onClick();
    }
  }, [cards]);

  return {
    cards,
    handleCardClick,
  };
};

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats>(getInitialStats());

  const updateStats = useCallback((newStats: Partial<DashboardStats>) => {
    setStats(prev => ({ ...prev, ...newStats }));
  }, []);

  const refreshStats = useCallback(async () => {
    // Implement stats refresh logic
    console.log('Refreshing dashboard stats...');
  }, []);

  return {
    stats,
    updateStats,
    refreshStats,
  };
};
