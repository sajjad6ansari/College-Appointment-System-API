const express = require("express")
const router = express.Router()

const {
  getAppointmentStatus,
  getSlotofProfessor,
  bookAppointment,
} = require("../controllers/student")

router.get("/appointments/status/:appointmentId", getAppointmentStatus)
router.get("/appointments/slots/:professorId", getSlotofProfessor)
router.post("/appointments/book", bookAppointment)

module.exports = router
