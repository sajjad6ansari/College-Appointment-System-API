const Professor = require("../models/Professor")
const Appointment = require("../models/Appointment")
const { NotFoundError } = require("../errors")

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
module.exports = {
  confirmCancelAppointment,
  specifyAvailibility,
}
