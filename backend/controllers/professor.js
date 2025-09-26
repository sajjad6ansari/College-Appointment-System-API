const Professor = require("../models/Professor")
const Appointment = require("../models/Appointment")
const { NotFoundError } = require("../errors")
const mongoose = require("mongoose")

const specifyAvailibility = async (req, res) => {
  const professor = await Professor.findByIdAndUpdate(
    { _id: req.user.userId },
    req.body,
    { new: true }
  )
  if (!professor) {
    throw new NotFoundError("Professor not found")
  }
  res.status(200).json({
    message: "Working hours updated successfully",
    name: professor.name,
    updatedWorkingHour: professor.workingHour,
  })
}

const confirmCancelAppointment = async (req, res) => {
  const appointment = await Appointment.findOneAndUpdate(
    { _id: req.params.appointmentId },
    { status: req.body.status },
    { new: true, upsert: false }
  )
  res.status(200).json(appointment)
}

// Get all appointments for the logged-in professor
const getAllMyAppointments = async (req, res) => {
  const { status, limit = 50, page = 1 } = req.query
  
  const query = { professorId: req.user.userId }
  if (status) {
    query.status = status
  }
  
  const appointments = await Appointment.find(query)
    .populate("studentId", "name email")
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
  
  const total = await Appointment.countDocuments(query)
  
  res.status(200).json({
    appointments,
    totalAppointments: total,
    currentPage: page,
    totalPages: Math.ceil(total / limit)
  })
}

// Get detailed appointment information with student details
const getAppointmentDetail = async (req, res) => {
  const appointment = await Appointment.findOne({
    _id: req.params.appointmentId,
    professorId: req.user.userId
  }).populate("studentId", "name email")
  
  if (!appointment) {
    throw new NotFoundError("Appointment not found")
  }
  
  res.status(200).json(appointment)
}

// Get dashboard statistics for professor
const getDashboardStats = async (req, res) => {
  const professorId = new mongoose.Types.ObjectId(req.user.userId)
  
  // Get appointment statistics
  const appointmentStats = await Appointment.aggregate([
    { $match: { professorId: professorId } },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    }
  ])
  
  // Get total appointments count
  const totalAppointments = await Appointment.countDocuments({ professorId })
  
  // Get recent appointments
  const recentAppointments = await Appointment.find({ professorId })
    .populate("studentId", "name email")
    .sort({ createdAt: -1 })
    .limit(5)
  
  // Get today's appointments
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const todayAppointments = await Appointment.find({
    professorId,
    date: { $gte: today, $lt: tomorrow },
    status: { $ne: "canceled" }
  }).populate("studentId", "name email")
  
  res.status(200).json({
    appointmentStats,
    totalAppointments,
    recentAppointments,
    todayAppointments,
    todayCount: todayAppointments.length
  })
}

// Get professor profile
const getProfile = async (req, res) => {
  const professor = await Professor.findById(req.user.userId).select("-password")
  
  if (!professor) {
    throw new NotFoundError("Professor not found")
  }
  
  // Get appointment statistics
  const appointmentStats = await Appointment.aggregate([
    { $match: { professorId: new mongoose.Types.ObjectId(professor._id) } },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    }
  ])
  
  res.status(200).json({
    professor: professor,
    appointmentStats
  })
}

// Update professor profile
const updateProfile = async (req, res) => {
  try {
    // Define allowed fields for professor profile updates
    const allowedUpdates = [
      "name", "email", "workingHour", "department", "specialization", 
      "phone", "bio", "officeLocation", "officeHours", "qualifications", 
      "experience", "employeeId", "title", "yearsOfExperience", 
      "isAvailableForAppointments"
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
    
    const professor = await Professor.findByIdAndUpdate(
      req.user.userId,
      updates,
      { new: true, runValidators: true }
    ).select("-password")
    
    if (!professor) {
      throw new NotFoundError("Professor not found")
    }
    
    res.status(200).json({
      message: "Profile updated successfully",
      professor: professor
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
  confirmCancelAppointment,
  specifyAvailibility,
  getAllMyAppointments,
  getAppointmentDetail,
  getDashboardStats,
  getProfile,
  updateProfile,
}
