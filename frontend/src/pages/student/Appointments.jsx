import React, { useState, useEffect } from 'react';
import { studentService } from '../../services';
import { Card, CardHeader, CardContent, Badge, LoadingSpinner, Button } from '../../components/ui';
import { triggerDashboardRefresh } from '../../hooks/useDashboardRefresh';
import toast from 'react-hot-toast';

const StudentAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, upcoming, past, cancelled

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        const response = await studentService.getMyAppointments();
        setAppointments(response.appointments || []);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        toast.error('Failed to load appointments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    let filtered = appointments;
    const now = new Date();

    switch (filter) {
      case 'upcoming':
        filtered = appointments.filter(apt => 
          new Date(apt.date) >= now && apt.status === 'confirmed'
        );
        break;
      case 'past':
        filtered = appointments.filter(apt => 
          new Date(apt.date) < now || apt.status === 'completed'
        );
        break;
      case 'cancelled':
        filtered = appointments.filter(apt => apt.status === 'cancelled');
        break;
      case 'pending':
        filtered = appointments.filter(apt => apt.status === 'pending');
        break;
      default:
        filtered = appointments;
    }

    setFilteredAppointments(filtered);
  }, [filter, appointments]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      await studentService.cancelAppointment(appointmentId);
      toast.success('Appointment cancelled successfully');
      
      // Update the local state
      setAppointments(prev => 
        prev.map(apt => 
          apt._id === appointmentId 
            ? { ...apt, status: 'cancelled' }
            : apt
        )
      );

      // Trigger dashboard refresh to update statistics
      triggerDashboardRefresh();
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast.error('Failed to cancel appointment');
    }
  };

  const getFilterCount = (filterType) => {
    const now = new Date();
    switch (filterType) {
      case 'upcoming':
        return appointments.filter(apt => 
          new Date(apt.date) >= now && apt.status === 'confirmed'
        ).length;
      case 'past':
        return appointments.filter(apt => 
          new Date(apt.date) < now || apt.status === 'completed'
        ).length;
      case 'cancelled':
        return appointments.filter(apt => apt.status === 'cancelled').length;
      case 'pending':
        return appointments.filter(apt => apt.status === 'pending').length;
      default:
        return appointments.length;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">My Appointments</h1>
        <p className="text-blue-100">
          Manage your scheduled appointments and track their status.
        </p>
      </div>

      {/* Filter Tabs */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'upcoming', label: 'Upcoming' },
              { key: 'pending', label: 'Pending' },
              { key: 'past', label: 'Past' },
              { key: 'cancelled', label: 'Cancelled' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === key
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label} ({getFilterCount(key)})
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {filter !== 'all' ? filter + ' ' : ''}appointments found
            </h3>
            <p className="text-gray-500 mb-4">
              {filter === 'all' 
                ? "You haven't booked any appointments yet." 
                : `You don't have any ${filter} appointments.`
              }
            </p>
            {filter === 'all' && (
              <Button onClick={() => window.location.href = '/student/professors'}>
                Book Your First Appointment
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                        {appointment.professorId?.name?.charAt(0) || 'P'}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {appointment.professorId?.name || 'Professor'}
                        </h3>
                        <p className="text-gray-600">{appointment.professorId?.email || ''}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 font-medium">Date</p>
                        <p className="text-gray-900">
                          {new Date(appointment.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-gray-500 font-medium">Time</p>
                        <p className="text-gray-900">{appointment.slot}</p>
                      </div>
                      
                      <div>
                        <p className="text-gray-500 font-medium">Status</p>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>

                    {appointment.notes && (
                      <div className="mt-4">
                        <p className="text-gray-500 font-medium text-sm">Notes</p>
                        <p className="text-gray-700 text-sm mt-1">{appointment.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="ml-6 flex flex-col space-y-2">
                    {appointment.status === 'pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancelAppointment(appointment._id)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        Cancel
                      </Button>
                    )}
                    
                    {appointment.status === 'confirmed' && new Date(appointment.date) > new Date() && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancelAppointment(appointment._id)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        Cancel
                      </Button>
                    )}

                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentAppointments;