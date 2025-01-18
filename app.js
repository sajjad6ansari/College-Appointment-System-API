const Student = require("./models/Student")
const Professor = require("./models/Professor")

require("dotenv").config()
require("express-async-errors")

const express = require("express")
const app = express()

const connectDB = require("./db/connect")

const authenticateUser = require("./middlewares/authentication")

const authRoutes = require("./routes/auth")
const studentRoutes = require("./routes/student")
const professorRoutes = require("./routes/professor")

app.use(express.json())

app.get("/api/v1/home", (req, res) => {
  res.send("college appointment system api")
})

app.post("/api/v1/student/", async (req, res) => {
  const student = await Student.create({ ...req.body })
  res.status(200).json({ user: student })
})

app.post("/api/v1/professor/", async (req, res) => {
  const professor = await Professor.create({ ...req.body })
  res.status(200).json({ user: professor })
})

app.use("/api/v1", authRoutes)
app.use("/api/v1/student/appointments", authenticateUser, studentRoutes)
app.use("/api/v1/professor/appointments", authenticateUser, professorRoutes)

// const notFoundMiddleware = require("./middleware/not-found")
// const errorHandlerMiddleware = require("./middleware/error-handler")

const port = process.env.PORT || 4000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server listening on the port ${port}........`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
