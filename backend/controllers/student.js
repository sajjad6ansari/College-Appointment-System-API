const Professor = require("../models/Professor")
const Student = require("../models/Student")
const Appointment = require("../models/Appointment")
const { NotFoundError } = require("../errors")
const StatusCodes = require("http-status-codes")
const moment = require("moment")
const mongoose = require("mongoose")

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
  req.body.studentId = req.user.id

  const { professorId, slot } = req.body

  const professor = await Professor.findById({ _id: professorId })

  //professor working hours
  const [pStartTime, pEndTime] = professor.workingHour
    .split("-")
    .map((time) => moment(time, "hh:mmA"))

  //student slot
  const [startTime, endTime] = slot
    .split("-")
    .map((time) => moment(time, "hh:mmA"))

  // console.log("startTime" + startTime)
  // console.log("endTime" + endTime)

  //Professor working hours check
  if (startTime.isBefore(pStartTime) || endTime.isAfter(pEndTime)) {
    return res
      .status(400)
      .json({ message: "Slot is outside of working hours of professor" })
  }

  const existingAppointments = await Appointment.find({ professorId })

  for (let appointment of existingAppointments) {
    const [existingStart, existingEnd] = appointment.slot
      .split("-")
      .map((time) => moment(time, "hh:mmA"))

    // console.log("existingStart" + existingStart)
    // console.log("existingEnd" + existingEnd)
    if (startTime.isBefore(existingEnd) && endTime.isAfter(existingStart)) {
      return res
        .status(400)
        .json({ message: "Slot overlaps with an existing appointment." })
    }
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
      `No such appointment found having studentId: ${req.user.id}`
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
  const appointments = await Appointment.find({ studentId: req.user.id })
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
      studentId: req.user.id,
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
  const student = await Student.findById(req.user.id).select("-password")
  
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
    profile: student,
    appointmentStats
  })
}

// Update student profile
const updateProfile = async (req, res) => {
  const allowedUpdates = ["name", "email"]
  const updates = {}
  
  // Filter only allowed fields
  Object.keys(req.body).forEach(key => {
    if (allowedUpdates.includes(key)) {
      updates[key] = req.body[key]
    }
  })
  
  const student = await Student.findByIdAndUpdate(
    req.user.id,
    updates,
    { new: true, runValidators: true }
  ).select("-password")
  
  if (!student) {
    throw new NotFoundError("Student not found")
  }
  
  res.status(200).json({
    message: "Profile updated successfully",
    profile: student
  })
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
