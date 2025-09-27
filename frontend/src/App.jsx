import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loadUser } from './store/authSlice';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Layout from './components/Layout';
import BackendWarning from './components/BackendWarning';

// Import pages (will create these next)
import StudentDashboard from './pages/student/Dashboard';
import StudentProfessors from './pages/student/Professors';
import StudentAppointments from './pages/student/Appointments';
import StudentProfile from './pages/student/Profile';

import ProfessorDashboard from './pages/professor/Dashboard';
import ProfessorAppointments from './pages/professor/Appointments';
import ProfessorSchedule from './pages/professor/Schedule';
import ProfessorProfile from './pages/professor/Profile';

function App() {
  const dispatch = useDispatch();

  // Load user on app start if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <BackendWarning />
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Student routes */}
            <Route path="/student/*" element={
              <ProtectedRoute requiredRole="student">
                <Layout>
                  <Routes>
                    <Route path="dashboard" element={<StudentDashboard />} />
                    <Route path="professors" element={<StudentProfessors />} />
                    <Route path="appointments" element={<StudentAppointments />} />
                    <Route path="profile" element={<StudentProfile />} />
                    <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Protected Professor routes */}
            <Route path="/professor/*" element={
              <ProtectedRoute requiredRole="professor">
                <Layout>
                  <Routes>
                    <Route path="dashboard" element={<ProfessorDashboard />} />
                    <Route path="appointments" element={<ProfessorAppointments />} />
                    <Route path="schedule" element={<ProfessorSchedule />} />
                    <Route path="profile" element={<ProfessorProfile />} />
                    <Route path="*" element={<Navigate to="/professor/dashboard" replace />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
          
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: '#4aed88',
                },
              },
            }}
          />
        </div>
      </Router>
  );
}

export default App;
