import { Link } from "react-router-dom"
import { useContext, useEffect } from "react"
import Carousel from "../components/Carousel"
import UserContext from "../context/user/userContext"
import EventContext from "../context/event/eventContext"
import Spinner from "../components/Spinner"
import "./Home.css"

function Home() {
  const { xivUser } = useContext(UserContext)
  const { events, loading, getEvents } = useContext(EventContext)

  useEffect(() => {
    getEvents()
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <div className="hero container">
        <header className="hero-content">
          <h2 className="heading">XIVHub</h2>
          <p className="text">
            XIVHub provides a platform for players to browse current venues that are open in-game, and allows
            for venue owners to announce their opening dates and special events for players to see and attend.
          </p>
          {!xivUser && (
            <Link to="/register">
              <button className="btn-outline">Register Here</button>
            </Link>
          )}
        </header>
      </div>
      <section className="events">
        <h2 className="sub-heading">Events</h2>
        {events && events ? <Carousel events={events} /> : <h2>No events</h2>}
      </section>
    </>
  )
}

export default Home
