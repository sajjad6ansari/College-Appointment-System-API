import React, { useState, useEffect } from 'react';
import { professorService } from '../../services';
import { Card, CardHeader, CardContent, Button, LoadingSpinner, Badge } from '../../components/ui';
import toast from 'react-hot-toast';

const ProfessorSchedule = () => {
  const [schedule, setSchedule] = useState({
    monday: { enabled: false, startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    tuesday: { enabled: false, startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    wednesday: { enabled: false, startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    thursday: { enabled: false, startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    friday: { enabled: false, startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    saturday: { enabled: false, startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    sunday: { enabled: false, startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' }
  });
  const [appointmentDuration, setAppointmentDuration] = useState(30);
  const [bufferTime, setBufferTime] = useState(15);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  const dayNames = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  };

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        setIsLoading(true);
        
        // Note: Schedule API is not implemented in backend yet
        // Using default schedule settings for now
        console.log('Using default schedule settings - backend schedule API not implemented');

        // Fetch upcoming appointments to show in the schedule view
        try {
          const appointmentsResponse = await professorService.getAllMyAppointments();
          const upcoming = appointmentsResponse.appointments
            ?.filter(apt => 
              apt.status === 'confirmed' && 
              new Date(apt.date) >= new Date()
            )
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 10);
          setUpcomingAppointments(upcoming || []);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }

      } catch (error) {
        console.error('Error fetching schedule data:', error);
        toast.error('Failed to load schedule data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchScheduleData();
  }, []);

  const handleDayToggle = (day) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled
      }
    }));
  };

  const handleTimeChange = (day, field, value) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const handleSaveSchedule = async () => {
    setIsUpdating(true);
    try {
      // Use existing availability slots method (schedule API not implemented in backend)
      const slots = [];
      Object.entries(schedule).forEach(([day, config]) => {
        if (config.enabled) {
          slots.push({
            day: day,
            startTime: config.startTime,
            endTime: config.endTime,
            breakStart: config.breakStart,
            breakEnd: config.breakEnd
          });
        }
      });
      await professorService.setAvailability(slots);

      toast.success('Schedule updated successfully!');
    } catch (error) {
      console.error('Error updating schedule:', error);
      toast.error('Failed to update schedule. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const getEnabledDaysCount = () => {
    return Object.values(schedule).filter(day => day.enabled).length;
  };

  const getTotalHoursPerWeek = () => {
    let totalHours = 0;
    Object.values(schedule).forEach(day => {
      if (day.enabled) {
        const start = new Date(`2000-01-01 ${day.startTime}`);
        const end = new Date(`2000-01-01 ${day.endTime}`);
        const breakStart = new Date(`2000-01-01 ${day.breakStart}`);
        const breakEnd = new Date(`2000-01-01 ${day.breakEnd}`);
        
        const workHours = (end - start) / (1000 * 60 * 60);
        const breakHours = (breakEnd - breakStart) / (1000 * 60 * 60);
        totalHours += workHours - breakHours;
      }
    });
    return totalHours.toFixed(1);
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
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Working Hours & Schedule</h1>
        <p className="text-green-100">
          Set your availability for student appointments and manage your weekly schedule.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{getEnabledDaysCount()}</div>
            <div className="text-gray-600">Available Days</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{getTotalHoursPerWeek()}</div>
            <div className="text-gray-600">Hours/Week</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{upcomingAppointments.length}</div>
            <div className="text-gray-600">Upcoming Appointments</div>
          </CardContent>
        </Card>
      </div>

      {/* Appointment Settings */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Appointment Settings</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Appointment Duration (minutes)
              </label>
              <select
                value={appointmentDuration}
                onChange={(e) => setAppointmentDuration(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buffer Time Between Appointments (minutes)
              </label>
              <select
                value={bufferTime}
                onChange={(e) => setBufferTime(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value={0}>No buffer</option>
                <option value={5}>5 minutes</option>
                <option value={10}>10 minutes</option>
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Schedule */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Weekly Schedule</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(schedule).map(([day, config]) => (
            <div key={day} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={config.enabled}
                    onChange={() => handleDayToggle(day)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <h3 className="text-lg font-medium text-gray-900">{dayNames[day]}</h3>
                  {config.enabled && (
                    <Badge className="bg-green-100 text-green-800">Available</Badge>
                  )}
                </div>
              </div>
              
              {config.enabled && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={config.startTime}
                      onChange={(e) => handleTimeChange(day, 'startTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={config.endTime}
                      onChange={(e) => handleTimeChange(day, 'endTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Break Start
                    </label>
                    <input
                      type="time"
                      value={config.breakStart}
                      onChange={(e) => handleTimeChange(day, 'breakStart', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Break End
                    </label>
                    <input
                      type="time"
                      value={config.breakEnd}
                      onChange={(e) => handleTimeChange(day, 'breakEnd', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Appointments Preview */}
      {upcomingAppointments.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">
                      {appointment.studentName}
                    </div>
                    <div className="text-sm text-gray-600">
                      {appointment.subject}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(appointment.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      {appointment.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSaveSchedule}
          disabled={isUpdating}
          className="bg-green-600 hover:bg-green-700"
        >
          {isUpdating ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Saving...
            </>
          ) : (
            'Save Schedule'
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProfessorSchedule;