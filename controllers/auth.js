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

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    throw new BadRequestError("Please provide name, email, password, and role");
  }

  if (role !== "student" && role !== "professor") {
    throw new BadRequestError("Please specify your role (student/professor)");
  }

  let UserModel;
  if (role === "student") {
    UserModel = Student;
  } else if (role === "professor") {
    UserModel = Professor;
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("Email already registered");
  }

  const user = await UserModel.create({ name, email, password });

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      id: user._id,
      email: user.email,
    },
    token,
  });
};

module.exports = { login, register };
