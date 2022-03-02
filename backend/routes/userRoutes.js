const express = require("express")
const route = express.Router()
const { registerUser, loginUser, addCharacter } = require("../controllers/userController")

route.post("/", registerUser)

route.post("/character", addCharacter)

route.post("/login", loginUser)

module.exports = route
