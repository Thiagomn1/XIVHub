import { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import EventContext from "../context/event/eventContext"
import EventItem from "../components/EventItem"
import Spinner from "../components/Spinner"

function Events() {
  const { events, getEvents, loading } = useContext(EventContext)

  useEffect(() => {
    getEvents()
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <div>
      <div className="search-form container">
        <Link to="/createevent">
          <button className="btn-outline">New Event</button>
        </Link>
      </div>
      <form className="search-form container">
        <div className="select">
          <select name="datacenter" id="datacenter" className="search-dropdown">
            <option value="Adamantoise">Primal</option>
            <option value="Crystal">Crystal</option>
            <option value="Aether">Aether</option>
            <option value="Chaos">Chaos</option>
            <option value="Gaia">Gaia</option>
            <option value="Elemental">Elemental</option>
            <option value="Mana">Mana</option>
            <option value="Light">Light</option>
          </select>
        </div>

        <div className="select">
          <select name="location" id="location" className="search-dropdown">
            <option value="Mist">Mist</option>
            <option value="Lavender Beds">Lavender Beds</option>
            <option value="Goblet">Goblet</option>
            <option value="Shirogane">Shirogane</option>
          </select>
        </div>
        <input type="text" name="tag" id="tag" placeholder="Tags" className="search-input" />
      </form>
      {events && events.map(event => <EventItem key={event._id} event={event} />)}
    </div>
  )
}

export default Events
