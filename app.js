require("dotenv").config()
require("express-async-errors")

const helmet = require("helmet")
const cors = require("cors")
const xss = require("xss-clean")

const express = require("express")
const app = express()

const connectDB = require("./db/connect")

const authenticateUser = require("./middlewares/authentication")
const notFoundMiddleware = require("./middlewares/notFound")

const authRoutes = require("./routes/auth")
const studentRoutes = require("./routes/student")
const professorRoutes = require("./routes/professor")

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

app.use("/api/v1", authRoutes)
app.use("/api/v1/student", authenticateUser, studentRoutes)
app.use("/api/v1/professor", authenticateUser, professorRoutes)

app.use(notFoundMiddleware)

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
