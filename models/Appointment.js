const mongoose = require("mongoose")

const Student = require("./Student")
const Professor = require("./Professor")

const AppointmentSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["pending", "confirmed", "canceled"],
    default: "pending",
  },
  professorId: {
    type: mongoose.Types.ObjectId,
    ref: "Professor",
    required: [true, "please provide Professor id"],
  },
  studentId: {
    type: mongoose.Types.ObjectId,
    ref: "Student",
    required: [true, "please provide Student id"],
  },
  slot: {
    type: String,
    required: true,
  },
})
module.exports = mongoose.model("Appointment", AppointmentSchema)
