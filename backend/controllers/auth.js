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
      role: role, // Include the role in the response
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
      role: role, // Include the role in the response
    },
    token,
  });
};

const getCurrentUser = async (req, res) => {
  // req.user is set by the authentication middleware
  const userId = req.user.userId;
  const userRole = req.user.role; // Assuming the JWT includes role information
  
  let UserModel;
  if (userRole === "student") {
    UserModel = Student;
  } else if (userRole === "professor") {
    UserModel = Professor;
  } else {
    throw new UnauthenticatedError("Invalid user role");
  }

  const user = await UserModel.findById(userId).select('-password');
  if (!user) {
    throw new UnauthenticatedError("User not found");
  }

  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      id: user._id,
      email: user.email,
      role: userRole,
    }
  });
};

module.exports = { login, register, getCurrentUser };
