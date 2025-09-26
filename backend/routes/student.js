const express = require("express")
const router = express.Router()

const {
  getAppointmentStatus,
  getSlotofProfessor,
  bookAppointment,
  getAllProfessors,
  getMyAppointments,
  cancelMyAppointment,
  getProfile,
  updateProfile,
} = require("../controllers/student")

// Professor-related routes
router.get("/professors", getAllProfessors)
router.get("/appointments/slots/:professorId", getSlotofProfessor)

// Appointment management routes
router.get("/appointments", getMyAppointments)
router.get("/appointments/status/:appointmentId", getAppointmentStatus)
router.post("/appointments/book", bookAppointment)
router.patch("/appointments/:appointmentId/cancel", cancelMyAppointment)

// Profile routes
router.get("/profile", getProfile)
router.patch("/profile", updateProfile)

module.exports = router
