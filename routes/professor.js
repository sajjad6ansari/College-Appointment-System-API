const express = require("express")
const router = express.Router()

const {
  specifyAvailibility,
  confirmCancelAppointment,
} = require("../controllers/professor")

router.patch("/slots", specifyAvailibility)
router.patch("/:appointmentId", confirmCancelAppointment)

module.exports = router
