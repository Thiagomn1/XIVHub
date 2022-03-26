const express = require("express")
const route = express.Router()
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
} = require("../controllers/eventController")

const { protect } = require("../middleware/Auth")

route.get("/", getAllEvents)

route.post("/", protect, createEvent)

route.get("/:id", getEvent)

route.put("/:id", protect, updateEvent)

route.delete("/:id", protect, deleteEvent)

module.exports = route
