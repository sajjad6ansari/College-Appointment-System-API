const express = require("express")
const router = express.Router()

const {
  specifyAvailibility,
  confirmCancelAppointment,
  getAllMyAppointments,
  getAppointmentDetail,
  getDashboardStats,
  getProfile,
  updateProfile,
} = require("../controllers/professor")

// Availability management
router.patch("/appointments/slots", specifyAvailibility)

// Appointment management routes
router.get("/appointments", getAllMyAppointments)
router.get("/appointments/:appointmentId", getAppointmentDetail)
router.patch("/appointments/:appointmentId", confirmCancelAppointment)

// Dashboard and analytics
router.get("/dashboard", getDashboardStats)

// Profile routes
router.get("/profile", getProfile)
router.patch("/profile", updateProfile)

module.exports = router
