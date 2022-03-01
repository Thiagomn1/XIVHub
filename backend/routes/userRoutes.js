const express = require("express")
const route = express.Router()
const { registerUser, loginUser } = require("../controllers/userController")

route.post("/", registerUser)

route.post("/login", loginUser)

module.exports = route
