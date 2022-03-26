const asyncHandler = require("express-async-handler")

const User = require("../models/UserModel")
const Event = require("../models/EventModel")

const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find()

  res.json(events)
})

const getEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)

  if (!event) {
    res.status(404)
    throw new Error("Event not found")
  }

  res.json(event)
})

const createEvent = asyncHandler(async (req, res) => {
  const { title, description, location, server, date, image } = req.body

  if (!title || !description || !location || !server || !date || !image) {
    res.status(400)
    throw new Error("Please fill out all the fields")
  }

  const user = await User.findById(req.user.id)

  const newDate = new Date(date)

  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const event = await Event.create({
    user: req.user.id,
    title,
    description,
    location,
    server,
    date: newDate,
    image,
  })

  if (event) {
    res.json(event)
  } else {
    res.status(400)
    throw new Error("Couldn't create new event")
  }
})

const updateEvent = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const event = await Event.findById(req.params.id)

  if (!event) {
    res.status(404)
    throw new Error("Event not found")
  }

  if (event.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Not Authorized")
  }

  const newEvent = await Event.findByIdAndUpdate(req.params.id.req.body)

  res.json(newEvent)
})

const deleteEvent = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const event = await Ticket.findById(req.params.id)

  if (!event) {
    res.status(404)
    throw new Error("Event not found")
  }

  if (event.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Not Authorized")
  }

  await event.remove()

  res.json({
    message: "Event was deleted successfully",
    success: true,
  })
})

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
}
