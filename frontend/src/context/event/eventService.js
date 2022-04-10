import axios from "axios"

const getAllEvents = async () => {
  const response = await axios.get("/api/events")

  return response.data
}

const createEvent = async eventData => {
  const response = await axios.post("/api/events", eventData)

  return response.data
}

const eventService = {
  getAllEvents,
  createEvent,
}

export default eventService
