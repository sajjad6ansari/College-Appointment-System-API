const jwt = require("jsonwebtoken")
const { UnauthenticatedError } = require("../errors")
const Student = require("../models/Student")
const Professor = require("../models/Professor")

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication Invalid ")
  }

  const token = authHeader.split(" ")[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    let user
    if (payload.role === "student") {
      user = await Student.findById(payload.id).select("-password")
    } else if (payload.role === "professor") {
      user = await Professor.findById(payload.id).select("-password")
    }

    // Include both user data and JWT payload info
    req.user = {
      id: payload.id,
      userId: payload.id,
      role: payload.role,
      ...user.toObject()
    }
    next()
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid ")
  }
}
module.exports = auth
