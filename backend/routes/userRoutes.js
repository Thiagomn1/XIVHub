const express = require("express")
const route = express.Router()
const { registerUser } = require("../controllers/userController")

route.post("/", registerUser)

module.exports = route
