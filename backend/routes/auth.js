const express = require("express")
const router = express.Router()

const { login, register, getCurrentUser } = require("../controllers/auth")
const authenticateUser = require("../middlewares/authentication")

router.post("/login", login)
router.post("/register", register)
router.get("/me", authenticateUser, getCurrentUser)

module.exports = router
