import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { professorService } from '../../services';
import { Card, CardHeader, CardContent, Badge, LoadingSpinner, Button } from '../../components/ui';
import { useDashboardRefresh } from '../../hooks/useDashboardRefresh';
import toast from 'react-hot-toast';

const ProfessorDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    appointments: [],
    stats: {
      totalAppointments: 0,
      pendingAppointments: 0,
      confirmedAppointments: 0,
      completedAppointments: 0,
      todaysAppointments: 0,
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const fetchDashboardData = useCallback(async () => {
      try {
        setIsLoading(true);
        const [appointmentsRes, statsRes] = await Promise.all([
          professorService.getAllMyAppointments(),
          professorService.getDashboardStats(),
        ]);

        const appointments = appointmentsRes.appointments || [];
        
        // Calculate stats from appointments if stats API doesn't provide them
        const today = new Date().toDateString();
        const calculatedStats = {
          totalAppointments: appointments.length,
          pendingAppointments: appointments.filter(apt => apt.status === 'pending').length,
          confirmedAppointments: appointments.filter(apt => apt.status === 'confirmed').length,
          completedAppointments: appointments.filter(apt => apt.status === 'completed').length,
          todaysAppointments: appointments.filter(apt => 
            new Date(apt.date).toDateString() === today
          ).length,
        };

        setDashboardData({
          appointments: appointments.slice(0, 5), // Latest 5 appointments
          stats: statsRes.stats || calculatedStats,
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

  const handleQuickAction = async (appointmentId, action) => {
    try {
      await professorService.updateAppointmentStatus(appointmentId, action);
      toast.success(`Appointment ${action} successfully`);
      
      // Refresh complete dashboard data including stats
      const [appointmentsRes, statsRes] = await Promise.all([
        professorService.getAllMyAppointments(),
        professorService.getDashboardStats(),
      ]);

      const appointments = appointmentsRes.appointments || [];
      
      // Calculate fresh stats from appointments
      const today = new Date().toDateString();
      const calculatedStats = {
        totalAppointments: appointments.length,
        pendingAppointments: appointments.filter(apt => apt.status === 'pending').length,
        confirmedAppointments: appointments.filter(apt => apt.status === 'confirmed').length,
        completedAppointments: appointments.filter(apt => apt.status === 'completed').length,
        todaysAppointments: appointments.filter(apt => 
          new Date(apt.date).toDateString() === today
        ).length,
      };

      setDashboardData({
        appointments: appointments.slice(0, 5), // Latest 5 appointments
        stats: statsRes.stats || calculatedStats,
      });
    } catch (error) {
      console.error(`Error ${action}ing appointment:`, error);
      toast.error(`Failed to ${action} appointment`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const { appointments, stats } = dashboardData;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, Professor {user?.name}! 👨‍🏫
        </h1>
        <p className="text-green-100">
          Manage your appointments and help students achieve their goals.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">Total</p>
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

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600 mb-1">Pending</p>
                <p className="text-2xl font-bold text-yellow-900">{stats?.pendingAppointments || 0}</p>
              </div>
              <div className="bg-yellow-500 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 mb-1">Confirmed</p>
                <p className="text-2xl font-bold text-green-900">{stats?.confirmedAppointments || 0}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-600 mb-1">Today</p>
                <p className="text-2xl font-bold text-indigo-900">{stats?.todaysAppointments || 0}</p>
              </div>
              <div className="bg-indigo-500 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
            <h3 className="text-lg font-semibold">Recent Appointment Requests</h3>
            <Link to="/professor/appointments">
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
                  <Link to="/professor/schedule">
                    <Button className="mt-4">Set Your Availability</Button>
                  </Link>
                </div>
              ) : (
                appointments.map((appointment) => (
                  <div key={appointment._id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {appointment.studentId?.name || 'Student'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {new Date(appointment.date).toLocaleDateString()} at {appointment.slot}
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.studentId?.email || ''}
                        </p>
                      </div>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>
                    {appointment.status === 'pending' && (
                      <div className="flex space-x-2 mt-3">
                        <Button 
                          size="sm" 
                          onClick={() => handleQuickAction(appointment._id, 'confirmed')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Accept
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleQuickAction(appointment._id, 'cancelled')}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          Decline
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Quick Actions</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link to="/professor/appointments">
                <div className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                  <div className="bg-blue-500 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Manage Appointments</h4>
                    <p className="text-sm text-gray-600">View and respond to requests</p>
                  </div>
                </div>
              </Link>

              <Link to="/professor/schedule">
                <div className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                  <div className="bg-green-500 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Set Availability</h4>
                    <p className="text-sm text-gray-600">Manage your schedule</p>
                  </div>
                </div>
              </Link>

              <Link to="/professor/profile">
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
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Today's Schedule</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {appointments.filter(apt => 
              new Date(apt.date).toDateString() === new Date().toDateString() && 
              apt.status === 'confirmed'
            ).length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>No appointments scheduled for today</p>
              </div>
            ) : (
              appointments
                .filter(apt => 
                  new Date(apt.date).toDateString() === new Date().toDateString() && 
                  apt.status === 'confirmed'
                )
                .map((appointment) => (
                  <div key={appointment._id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-500 p-2 rounded-full">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {appointment.studentId?.name || 'Student'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {appointment.slot} - {appointment.studentId?.email || ''}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessorDashboard;