const express = require("express")
const route = express.Router()
const {
  registerUser,
  loginUser,
  logoutUser,
  verifyCharacter,
  updateCharacter,
  getMe,
} = require("../controllers/userController")

const { protect } = require("../middleware/Auth")

route.post("/", registerUser)

route.post("/login", loginUser)

route.post("/logout", logoutUser)

route.get("/me", protect, getMe)

route.put("/character", verifyCharacter)

route.put("/character/new", updateCharacter)

module.exports = route
