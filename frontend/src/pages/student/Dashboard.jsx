import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { studentService } from '../../services';
import { Card, CardHeader, CardContent, Badge, LoadingSpinner, Button } from '../../components/ui';
import BookingModal from '../../components/BookingModal';
import { useDashboardRefresh } from '../../hooks/useDashboardRefresh';
import toast from 'react-hot-toast';

const StudentDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    appointments: [],
    professors: [],
    stats: {
      totalAppointments: 0,
      upcomingAppointments: 0,
      completedAppointments: 0,
      cancelledAppointments: 0
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [bookingModal, setBookingModal] = useState({
    isOpen: false,
    professor: null
  });
  const { user } = useSelector((state) => state.auth);

  const fetchDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [appointmentsRes, professorsRes] = await Promise.all([
        studentService.getMyAppointments(),
        studentService.getAllProfessors(),
      ]);

      // Calculate stats from appointments
      const appointments = appointmentsRes.appointments || [];
      const stats = {
        totalAppointments: appointments.length,
        upcomingAppointments: appointments.filter(apt => 
          apt.status === 'confirmed' && new Date(apt.date) > new Date()
        ).length,
        completedAppointments: appointments.filter(apt => apt.status === 'completed').length,
        cancelledAppointments: appointments.filter(apt => apt.status === 'cancelled').length,
      };

      setDashboardData({
        appointments: appointments.slice(0, 5), // Latest 5 appointments
        professors: professorsRes.professors?.slice(0, 4) || [], // First 4 professors
        stats,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Set up dashboard refresh hook
  useDashboardRefresh(fetchDashboardData);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleBookAppointment = (professor) => {
    setBookingModal({
      isOpen: true,
      professor
    });
  };

  const handleCloseBookingModal = () => {
    setBookingModal({
      isOpen: false,
      professor: null
    });
  };

  const handleBookingSuccess = () => {
    // Refresh dashboard data to show new appointment
    fetchDashboardData();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const { appointments, professors, stats } = dashboardData;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-blue-100">
          Manage your appointments and connect with professors easily.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">Total Appointments</p>
                <p className="text-2xl font-bold text-blue-900">{stats?.totalAppointments || 0}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 mb-1">Upcoming</p>
                <p className="text-2xl font-bold text-green-900">{stats?.upcomingAppointments || 0}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 mb-1">Completed</p>
                <p className="text-2xl font-bold text-purple-900">{stats?.completedAppointments || 0}</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600 mb-1">Cancelled</p>
                <p className="text-2xl font-bold text-red-900">{stats?.cancelledAppointments || 0}</p>
              </div>
              <div className="bg-red-500 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Appointments</h3>
            <Link to="/student/appointments">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p>No appointments yet</p>
                  <Link to="/student/professors">
                    <Button className="mt-4">Book Your First Appointment</Button>
                  </Link>
                </div>
              ) : (
                appointments.map((appointment) => (
                  <div key={appointment._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {appointment.professorId?.name || 'Professor'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {new Date(appointment.date).toLocaleDateString()} at {appointment.slot}
                      </p>
                      <p className="text-sm text-gray-500">
                        {appointment.professorId?.email || ''}
                      </p>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Available Professors */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <h3 className="text-lg font-semibold">Available Professors</h3>
            <Link to="/student/professors">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {professors.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p>No professors available</p>
                </div>
              ) : (
                professors.map((professor) => (
                  <div key={professor._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                        {professor.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{professor.name}</h4>
                        <p className="text-sm text-gray-600">{professor.department || 'Professor'}</p>
                        <p className="text-sm text-gray-500">{professor.specialization || 'General'}</p>
                      </div>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => handleBookAppointment(professor)}
                    >
                      Book
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Quick Actions</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/student/professors">
              <div className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                <div className="bg-blue-500 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Browse Professors</h4>
                  <p className="text-sm text-gray-600">Find and book appointments</p>
                </div>
              </div>
            </Link>

            <Link to="/student/appointments">
              <div className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                <div className="bg-green-500 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">My Appointments</h4>
                  <p className="text-sm text-gray-600">Manage your bookings</p>
                </div>
              </div>
            </Link>

            <Link to="/student/profile">
              <div className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
                <div className="bg-purple-500 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Update Profile</h4>
                  <p className="text-sm text-gray-600">Manage your information</p>
                </div>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModal.isOpen}
        onClose={handleCloseBookingModal}
        professor={bookingModal.professor}
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
};

export default StudentDashboard;