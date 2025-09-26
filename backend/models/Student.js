const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const StudentSchema = new mongoose.Schema({
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
  
  // Extended Profile Fields
  studentId: {
    type: String,
    trim: true,
    sparse: true, // Allow null values but enforce uniqueness when present
  },
  department: {
    type: String,
    trim: true,
    default: '',
  },
  year: {
    type: String,
    enum: ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate", ""],
    default: "",
  },
  program: {
    type: String,
    trim: true,
    default: '',
  },
  phone: {
    type: String,
    trim: true,
    default: '',
    match: [/^[\+]?[1-9][\d]{0,15}$|^$/, "Please provide a valid phone number"],
  },
  address: {
    type: String,
    trim: true,
    default: '',
    maxlength: [200, "Address cannot exceed 200 characters"],
  },
  emergencyContact: {
    type: String,
    trim: true,
    default: '',
  },
  emergencyPhone: {
    type: String,
    trim: true,
    default: '',
    match: [/^[\+]?[1-9][\d]{0,15}$|^$/, "Please provide a valid emergency phone number"],
  },
  interests: {
    type: String,
    trim: true,
    default: '',
    maxlength: [300, "Interests cannot exceed 300 characters"],
  },
  bio: {
    type: String,
    trim: true,
    default: '',
    maxlength: [500, "Bio cannot exceed 500 characters"],
  },
  
  // Additional Profile Information
  gpa: {
    type: Number,
    min: 0,
    max: 4.0,
  },
  dateOfBirth: {
    type: Date,
  },
  profileComplete: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
})
// Pre-save middleware to hash password only when modified
StudentSchema.pre("save", async function (next) {
  // Only hash password if it was modified (or is new)
  if (!this.isModified('password')) return next()
  
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Method to check if profile is complete
StudentSchema.methods.checkProfileCompleteness = function() {
  const requiredFields = ['name', 'email', 'department', 'year', 'program'];
  const isComplete = requiredFields.every(field => this[field] && this[field].toString().trim());
  
  this.profileComplete = isComplete;
  return isComplete;
}

// Pre-save middleware to update profile completeness
StudentSchema.pre('save', function(next) {
  this.checkProfileCompleteness();
  next();
})

StudentSchema.methods.comparePassword = async function (studentPassword) {
  const isMatch = await bcrypt.compare(studentPassword, this.password)
  return isMatch
}

StudentSchema.methods.createJWT = function () {
  return jwt.sign({ role: "student", id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFE_TIME,
  })
}
module.exports = mongoose.model("Student", StudentSchema)
