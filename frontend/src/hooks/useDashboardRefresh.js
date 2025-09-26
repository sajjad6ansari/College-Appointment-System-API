import { useEffect, useCallback } from 'react';

// Custom hook to handle dashboard data refresh
export const useDashboardRefresh = (fetchDashboardData) => {
  const refreshDashboard = useCallback(() => {
    if (fetchDashboardData) {
      fetchDashboardData();
    }
  }, [fetchDashboardData]);

  // Listen for custom dashboard refresh events
  useEffect(() => {
    const handleDashboardRefresh = () => {
      refreshDashboard();
    };

    window.addEventListener('dashboardRefresh', handleDashboardRefresh);
    
    return () => {
      window.removeEventListener('dashboardRefresh', handleDashboardRefresh);
    };
  }, [refreshDashboard]);

  return refreshDashboard;
};

// Utility function to trigger dashboard refresh across components
export const triggerDashboardRefresh = () => {
  window.dispatchEvent(new CustomEvent('dashboardRefresh'));
};