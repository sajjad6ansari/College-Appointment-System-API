const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const ProfessorSchema = new mongoose.Schema({
  // Basic Authentication Fields
  name: {
    type: String,
    required: [true, "please provide name"],
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    minlength: 7,
  },
  workingHour: {
    type: String,
    default: "10:00AM-5:00PM",
  },
  
  // Extended Profile Fields
  department: {
    type: String,
    trim: true,
    default: '',
  },
  specialization: {
    type: String,
    trim: true,
    default: '',
    maxlength: [300, "Specialization cannot exceed 300 characters"],
  },
  phone: {
    type: String,
    trim: true,
    default: '',
    match: [/^[\+]?[1-9][\d]{0,15}$|^$/, "Please provide a valid phone number"],
  },
  bio: {
    type: String,
    trim: true,
    default: '',
    maxlength: [1000, "Bio cannot exceed 1000 characters"],
  },
  officeLocation: {
    type: String,
    trim: true,
    default: '',
    maxlength: [200, "Office location cannot exceed 200 characters"],
  },
  officeHours: {
    type: String,
    trim: true,
    default: '',
  },
  qualifications: {
    type: String,
    trim: true,
    default: '',
    maxlength: [500, "Qualifications cannot exceed 500 characters"],
  },
  experience: {
    type: String,
    trim: true,
    default: '',
    maxlength: [100, "Experience cannot exceed 100 characters"],
  },
  
  // Additional Profile Information
  employeeId: {
    type: String,
    trim: true,
    sparse: true, // Allow null values but enforce uniqueness when present
  },
  title: {
    type: String,
    enum: ["Assistant Professor", "Associate Professor", "Full Professor", "Lecturer", "Adjunct Professor", "Visiting Professor", ""],
    default: "",
  },
  yearsOfExperience: {
    type: Number,
    min: 0,
    max: 50,
  },
  profileComplete: {
    type: Boolean,
    default: false,
  },
  isAvailableForAppointments: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
})

// Pre-save middleware to hash password only when modified
ProfessorSchema.pre("save", async function (next) {
  // Only hash password if it was modified (or is new)
  if (!this.isModified('password')) return next()
  
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Method to check if profile is complete
ProfessorSchema.methods.checkProfileCompleteness = function() {
  const requiredFields = ['name', 'email', 'department', 'specialization'];
  const isComplete = requiredFields.every(field => this[field] && this[field].toString().trim());
  
  this.profileComplete = isComplete;
  return isComplete;
}

// Pre-save middleware to update profile completeness
ProfessorSchema.pre('save', function(next) {
  this.checkProfileCompleteness();
  next();
})

ProfessorSchema.methods.comparePassword = async function (professorPassword) {
  const isMatch = await bcrypt.compare(professorPassword, this.password)
  return isMatch
}

ProfessorSchema.methods.createJWT = function () {
  return jwt.sign({ id: this._id, role: "professor" }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFE_TIME,
  })
}
module.exports = mongoose.model("Professor", ProfessorSchema)
