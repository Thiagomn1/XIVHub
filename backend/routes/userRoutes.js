const express = require("express")
const route = express.Router()
const { registerUser, loginUser, logoutUser, addCharacter, getMe } = require("../controllers/userController")

const { protect } = require("../middleware/Auth")

route.post("/", registerUser)

route.post("/login", loginUser)

route.post("/logout", logoutUser)

route.get("/me", protect, getMe)

route.put("/character", addCharacter)

module.exports = route
