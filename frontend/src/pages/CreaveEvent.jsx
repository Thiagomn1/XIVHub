import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import EventContext from "../context/event/eventContext"
import Spinner from "../components/Spinner"

function Register() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [server, setServer] = useState("")
  const [date, setDate] = useState("")
  const [image, setImage] = useState("")

  const { createEvent, loading, isError, isSuccess } = useContext(EventContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      console.log("Error")
    }

    if (isSuccess) {
      navigate("/events")
    }
  }, [isSuccess, isError])

  const create = async event => {
    event.preventDefault()

    const eventData = {
      title,
      description,
      location,
      server,
      date,
      image,
    }

    await createEvent(eventData)
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <h2 className="heading" style={{ textAlign: "center" }}>
        New Event
      </h2>
      <form onSubmit={create} className="form-control container">
        <div className="form-group">
          <label htmlFor="title" className="form-text">
            <span className="required">* </span> Event Title:
          </label>
          <input
            type="title"
            name="title"
            value={title}
            id="title"
            className="form-input"
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-text">
            <span className="required">* </span>Description:
          </label>
          <input
            type="description"
            name="description"
            value={description}
            id="description"
            className="form-input"
            onChange={event => setDescription(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location" className="form-text">
            <span className="required">* </span>Location:
          </label>
          <input
            type="location"
            name="location"
            value={location}
            id="location"
            className="form-input"
            onChange={event => setLocation(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="server" className="form-text">
            <span className="required">* </span>Server:
          </label>
          <input
            type="text"
            name="server"
            value={server}
            id="server"
            className="form-input"
            onChange={event => setServer(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date" className="form-text">
            <span className="required">* </span>Date:
          </label>
          <input
            type="text"
            name="date"
            value={date}
            id="date"
            className="form-input"
            onChange={event => setDate(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image" className="form-text">
            <span className="required">* </span>Image:
          </label>
          <input
            type="text"
            name="image"
            value={image}
            id="image"
            className="form-input"
            onChange={event => setImage(event.target.value)}
          />
        </div>
        <button className="btn">Create</button>
      </form>
    </>
  )
}

export default Register
