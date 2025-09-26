const Professor = require("../models/Professor")
const Student = require("../models/Student")
const Appointment = require("../models/Appointment")
const { NotFoundError } = require("../errors")
const StatusCodes = require("http-status-codes")
const moment = require("moment")
const mongoose = require("mongoose")
const { validateAppointment } = require("../utils/appointmentValidations")

const getSlotofProfessor = async (req, res) => {
  console.log(req.params)
  const professor = await Professor.findOne({ _id: req.params.professorId })
  if (!professor) {
    throw new NotFoundError(
      `No such professor found with ${req.params.professorId}`
    )
  }
  res
    .status(200)
    .json({ professorName: professor.name, slot: professor.workingHour })
}

const bookAppointment = async (req, res) => {
  req.body.studentId = req.user.userId

  const { professorId, slot, date } = req.body

  // Validate required fields
  if (!professorId || !slot || !date) {
    return res.status(400).json({ message: "Professor ID, slot, and date are required" })
  }

  const professor = await Professor.findById({ _id: professorId })
  if (!professor) {
    return res.status(404).json({ message: "Professor not found" })
  }

  // Use validation utilities
  const validation = await validateAppointment(Appointment, {
    professorId,
    date,
    slot,
    professorWorkingHours: professor.workingHour || "10:00AM-5:00PM"
  })

  if (!validation.isValid) {
    return res.status(400).json({ message: validation.message })
  }

  const appointment = await Appointment.create(req.body)
  res.status(200).json(appointment)
}
const getAppointmentStatus = async (req, res) => {
  const appointment = await Appointment.findById({
    _id: req.params.appointmentId,
  })
  if (!appointment) {
    throw new NotFoundError(
      `No such appointment found having studentId: ${req.user.userId}`
    )
  }

  res.status(200).json(appointment)
}

// Get all professors for student to choose from
const getAllProfessors = async (req, res) => {
  const professors = await Professor.find({}, "name email workingHour")
  res.status(200).json({
    professors,
    count: professors.length
  })
}

// Get all appointments for the logged-in student
const getMyAppointments = async (req, res) => {
  const appointments = await Appointment.find({ studentId: req.user.userId })
    .populate("professorId", "name email workingHour")
    .sort({ createdAt: -1 })
  
  res.status(200).json({
    appointments,
    count: appointments.length
  })
}

// Cancel appointment by student
const cancelMyAppointment = async (req, res) => {
  const appointment = await Appointment.findOneAndUpdate(
    { 
      _id: req.params.appointmentId, 
      studentId: req.user.userId,
      status: { $ne: "canceled" } // Can't cancel already canceled appointments
    },
    { status: "canceled" },
    { new: true }
  )
  
  if (!appointment) {
    throw new NotFoundError("Appointment not found or already canceled")
  }
  
  res.status(200).json({
    message: "Appointment canceled successfully",
    appointment
  })
}

// Get student profile
const getProfile = async (req, res) => {
  const student = await Student.findById(req.user.userId).select("-password")
  
  if (!student) {
    throw new NotFoundError("Student not found")
  }
  
  // Get appointment statistics
  const appointmentStats = await Appointment.aggregate([
    { $match: { studentId: new mongoose.Types.ObjectId(student._id) } },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    }
  ])
  
  res.status(200).json({
    student: student,
    appointmentStats
  })
}

// Update student profile
const updateProfile = async (req, res) => {
  try {
    // Define allowed fields for student profile updates
    const allowedUpdates = [
      "name", "email", "studentId", "department", "year", "program", 
      "phone", "address", "emergencyContact", "emergencyPhone", 
      "interests", "bio", "gpa", "dateOfBirth"
    ]
    
    const updates = {}
    
    // Filter only allowed fields
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key]
      }
    })
    
    // Validate that we have at least one field to update
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided for update"
      })
    }
    
    const student = await Student.findByIdAndUpdate(
      req.user.userId,
      updates,
      { new: true, runValidators: true }
    ).select("-password")
    
    if (!student) {
      throw new NotFoundError("Student not found")
    }
    
    res.status(200).json({
      message: "Profile updated successfully",
      student: student
    })
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message)
      return res.status(400).json({
        message: "Validation failed",
        errors: errors
      })
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]
      return res.status(400).json({
        message: `${field} already exists`,
        field: field
      })
    }
    
    // Handle cast errors (invalid ObjectId, etc.)
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: "Invalid data format provided"
      })
    }
    
    // Re-throw other errors to be handled by global error handler
    throw error
  }
}

module.exports = {
  getAppointmentStatus,
  getSlotofProfessor,
  bookAppointment,
  getAllProfessors,
  getMyAppointments,
  cancelMyAppointment,
  getProfile,
  updateProfile,
}
