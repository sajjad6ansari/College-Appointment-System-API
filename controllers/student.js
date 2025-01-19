const Professor = require("../models/Professor")
const Student = require("../models/Student")
const Appointment = require("../models/Appointment")
const { NotFoundError } = require("../errors")
const StatusCodes = require("http-status-codes")

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

module.exports = {
  getAppointmentStatus,
  getSlotofProfessor,
  bookAppointment,
}
