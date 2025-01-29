const Professor = require("../models/Professor")
const Student = require("../models/Student")
const Appointment = require("../models/Appointment")
const { NotFoundError } = require("../errors")
const StatusCodes = require("http-status-codes")
const moment = require("moment")

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
  try {
    req.body.studentId = req.user.id

    const { professorId, slot } = req.body

    const [startTime, endTime] = slot
      .split("-")
      .map((time) => moment(time, "hh:mmA"))

    // console.log(startTime)
    // console.log(endTime)

    const existingAppointments = await Appointment.find({ professorId })

    for (let appointment of existingAppointments) {
      const [existingStart, existingEnd] = appointment.slot
        .split("-")
        .map((time) => moment(time, "hh:mmA"))

      // console.log(existingStart)
      // console.log(existingEnd)
      if (
        startTime.isBefore(existingEnd) &&
        endTime.isAfter(existingStart) // Overlapping condition
      ) {
        return res
          .status(400)
          .json({ message: "Slot overlaps with an existing appointment." })
      }
    }

    // If no overlap, create appointment
    const appointment = await Appointment.create(req.body)
    res.status(200).json(appointment)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
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
