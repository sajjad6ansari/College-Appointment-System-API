import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoadingSpinner } from '@/components/ui';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, isLoading, user } = useSelector((state) => state.auth);
  const location = useLocation();

  console.log('ProtectedRoute:', { isAuthenticated, isLoading, user, requiredRole, location: location.pathname });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    console.log('Role mismatch, user role:', user?.role, 'required:', requiredRole);
    // Redirect to appropriate dashboard based on user role
    if (user?.role === 'student') {
      return <Navigate to="/student/dashboard" replace />;
    } else if (user?.role === 'professor') {
      return <Navigate to="/professor/dashboard" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;