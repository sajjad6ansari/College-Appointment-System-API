const express = require("express")
const router = express.Router()

const {
  getAppointmentStatus,
  getSlotofProfessor,
  bookAppointment,
} = require("../controllers/student")

router.get("/status/:appointmentId", getAppointmentStatus)
router.get("/slots/:professorId", getSlotofProfessor)
router.post("/book", bookAppointment)

module.exports = router
