const express = require("express")
const router = express.Router()

const {
  specifyAvailibility,
  confirmCancelAppointment,
} = require("../controllers/professor")

router.patch("/appointments/slots", specifyAvailibility)
router.patch("/appointments/:appointmentId", confirmCancelAppointment)

module.exports = router
