import React, { useState } from 'react';
import { studentService } from '../services';
import { Button, Input, LoadingSpinner } from './ui';
import toast from 'react-hot-toast';

const BookingModal = ({ isOpen, onClose, professor, onBookingSuccess }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.date || !formData.time) {
      toast.error('Please select both date and time for the appointment');
      return;
    }

    // Validate date is today or future
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      toast.error('Appointment date must be today or in the future');
      return;
    }

    // Check if selected date is weekend
    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      toast.error('Appointments are not available on weekends');
      return;
    }

    // Validate time is within professor availability (10AM-5PM)
    const timeDate = new Date(`2000-01-01T${formData.time}:00`);
    const hour = timeDate.getHours();
    if (hour < 10 || hour >= 17) {
      toast.error('Professor is only available between 10:00 AM and 5:00 PM');
      return;
    }

    setIsSubmitting(true);
    try {
      // Convert time to slot format (e.g., "09:00AM-10:00AM")
      const timeDate = new Date(`2000-01-01T${formData.time}:00`);
      const startTime = timeDate.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      }).replace(/\s/g, '');
      
      const endTimeDate = new Date(timeDate);
      endTimeDate.setHours(endTimeDate.getHours() + 1);
      const endTime = endTimeDate.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      }).replace(/\s/g, '');
      
      const slot = `${startTime}-${endTime}`;

      const appointmentData = {
        professorId: professor._id,
        date: formData.date,
        slot: slot
      };

      await studentService.bookAppointment(appointmentData);
      toast.success('Appointment booked successfully!');
      
      // Reset form
      setFormData({
        date: '',
        time: ''
      });
      
      onClose();
      if (onBookingSuccess) {
        onBookingSuccess();
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.message || 'Failed to book appointment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        date: '',
        time: ''
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  // Get today's date as minimum date
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Book Appointment</h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {professor && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                {professor.name?.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{professor.name}</h3>
                <p className="text-sm text-gray-600">{professor.department}</p>
                {professor.specialization && (
                  <p className="text-sm text-gray-500">{professor.specialization}</p>
                )}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date *
            </label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              min={minDate}
              required
              disabled={isSubmitting}
              className="w-full"
            />
            <p className="text-sm text-gray-500 mt-1">
              No appointments available on weekends
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time Slot *
            </label>
            <Input
              type="time"
              value={formData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              min="10:00"
              max="16:00"
              required
              disabled={isSubmitting}
              className="w-full"
            />
            <p className="text-sm text-gray-500 mt-1">
              Available: 10:00 AM - 5:00 PM (1 hour duration)
            </p>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Booking...
                </>
              ) : (
                'Book Appointment'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;