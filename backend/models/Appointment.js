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
  date: {
    type: Date,
    required: [true, "please provide appointment date"],
  },
  slot: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
})
module.exports = mongoose.model("Appointment", AppointmentSchema)
