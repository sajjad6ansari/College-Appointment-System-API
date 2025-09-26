const moment = require('moment');

// Validate appointment date (must be today or future, not weekends)
const validateAppointmentDate = (date) => {
  const appointmentDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Check if date is in the past
  if (appointmentDate < today) {
    return { isValid: false, message: 'Appointment date must be today or in the future' };
  }
  
  // Check if appointment is on weekend (Saturday = 6, Sunday = 0)
  const dayOfWeek = appointmentDate.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return { isValid: false, message: 'Appointments are not available on weekends' };
  }
  
  return { isValid: true };
};

// Validate appointment time (must be within professor's working hours 10AM-5PM)
const validateAppointmentTime = (slot, professorWorkingHours = "10:00AM-5:00PM") => {
  try {
    // Professor working hours
    const [pStartTime, pEndTime] = professorWorkingHours
      .split("-")
      .map((time) => moment(time, "hh:mmA"));

    // Student slot
    const [startTime, endTime] = slot
      .split("-")
      .map((time) => moment(time, "hh:mmA"));

    // Check if slot is within working hours
    if (startTime.isBefore(pStartTime) || endTime.isAfter(pEndTime)) {
      return { 
        isValid: false, 
        message: 'Professor is only available between 10:00AM and 5:00PM' 
      };
    }
    
    return { isValid: true };
  } catch (error) {
    return { isValid: false, message: 'Invalid time slot format' };
  }
};

// Check for appointment conflicts on the same date
const checkAppointmentConflicts = async (Appointment, professorId, date, slot, excludeAppointmentId = null) => {
  try {
    const appointmentDate = new Date(date);
    
    // Find existing appointments on the same date
    const query = { 
      professorId,
      date: appointmentDate,
      status: { $ne: "canceled" }
    };
    
    // Exclude current appointment if updating
    if (excludeAppointmentId) {
      query._id = { $ne: excludeAppointmentId };
    }
    
    const existingAppointments = await Appointment.find(query);
    
    // Parse requested slot
    const [startTime, endTime] = slot
      .split("-")
      .map((time) => moment(time, "hh:mmA"));
    
    // Check for conflicts
    for (let appointment of existingAppointments) {
      const [existingStart, existingEnd] = appointment.slot
        .split("-")
        .map((time) => moment(time, "hh:mmA"));

      if (startTime.isBefore(existingEnd) && endTime.isAfter(existingStart)) {
        return { 
          hasConflict: true, 
          message: 'Time slot is already booked for this date' 
        };
      }
    }
    
    return { hasConflict: false };
  } catch (error) {
    return { hasConflict: true, message: 'Error checking appointment conflicts' };
  }
};

// Complete appointment validation
const validateAppointment = async (Appointment, { professorId, date, slot, professorWorkingHours, excludeAppointmentId }) => {
  // Validate date
  const dateValidation = validateAppointmentDate(date);
  if (!dateValidation.isValid) {
    return { isValid: false, message: dateValidation.message };
  }
  
  // Validate time
  const timeValidation = validateAppointmentTime(slot, professorWorkingHours);
  if (!timeValidation.isValid) {
    return { isValid: false, message: timeValidation.message };
  }
  
  // Check conflicts
  const conflictCheck = await checkAppointmentConflicts(
    Appointment, 
    professorId, 
    date, 
    slot, 
    excludeAppointmentId
  );
  if (conflictCheck.hasConflict) {
    return { isValid: false, message: conflictCheck.message };
  }
  
  return { isValid: true };
};

module.exports = {
  validateAppointmentDate,
  validateAppointmentTime,
  checkAppointmentConflicts,
  validateAppointment
};