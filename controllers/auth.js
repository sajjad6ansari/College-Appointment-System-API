const { BadRequestError, UnauthenticatedError } = require("../errors")
const { StatusCodes } = require("http-status-codes")
const Student = require("../models/Student")
const Professor = require("../models/Professor")

const login = async (req, res) => {
  const { email, password, role } = req.body

  if (!email || !password) {
    throw new BadRequestError("Please provide both email and password")
  }
  if (role !== "student" && role !== "professor") {
    throw new BadRequestError("Please specify your role (student/teacher)")
  }

  let UserModel
  if (role === "student") {
    UserModel = Student
  } else if (role === "professor") {
    UserModel = Professor
  }

  user = await UserModel.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials")
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials")
  }
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      id: user._id,
      email: user.email,
    },
    token,
  })
}

module.exports = { login }
