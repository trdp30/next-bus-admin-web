import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import type { DashboardStats, UserProfile } from './types';
import { getInitialStats, getDashboardCards } from './helper';

/**
 * Custom hooks for the Dashboard page
 */

export const useDashboard = () => {
  const { user, triggerUnAuthenticate } = useAuth();
  const [stats, setStats] = useState<DashboardStats>(getInitialStats());
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = useCallback(async () => {
    try {
      await triggerUnAuthenticate();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [triggerUnAuthenticate]);

  const loadDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual data fetching
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data - replace with real API calls
      setStats({
        totalVehicles: 12,
        activeJourneys: 3,
        totalDistance: 1250,
        alerts: 2,
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  return {
    user: user as UserProfile | null,
    stats,
    isLoading,
    handleLogout,
    loadDashboardData,
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
