const Professor = require("../models/Professor")
const Appointment = require("../models/Appointment")
const { NotFoundError } = require("../errors")
const mongoose = require("mongoose")

const specifyAvailibility = async (req, res) => {
  const professor = await Professor.findByIdAndUpdate(
    { _id: req.user.id },
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
  
  const query = { professorId: req.user.id }
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
    professorId: req.user.id
  }).populate("studentId", "name email")
  
  if (!appointment) {
    throw new NotFoundError("Appointment not found")
  }
  
  res.status(200).json(appointment)
}

// Get dashboard statistics for professor
const getDashboardStats = async (req, res) => {
  const professorId = new mongoose.Types.ObjectId(req.user.id)
  
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
    createdAt: { $gte: today, $lt: tomorrow }
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
  const professor = await Professor.findById(req.user.id).select("-password")
  
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
    profile: professor,
    appointmentStats
  })
}

// Update professor profile
const updateProfile = async (req, res) => {
  const allowedUpdates = ["name", "email", "workingHour"]
  const updates = {}
  
  // Filter only allowed fields
  Object.keys(req.body).forEach(key => {
    if (allowedUpdates.includes(key)) {
      updates[key] = req.body[key]
    }
  })
  
  const professor = await Professor.findByIdAndUpdate(
    req.user.id,
    updates,
    { new: true, runValidators: true }
  ).select("-password")
  
  if (!professor) {
    throw new NotFoundError("Professor not found")
  }
  
  res.status(200).json({
    message: "Profile updated successfully",
    profile: professor
  })
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
