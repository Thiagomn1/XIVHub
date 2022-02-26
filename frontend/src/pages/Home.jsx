import { Link } from "react-router-dom"
import Carousel from "../components/Carousel"

function Home() {
  return (
    <>
      <div className="hero container">
        <header className="hero-content">
          <h2 className="heading">XIVHub</h2>
          <p className="text">
            XIVHub provides a platform for players to browse current venues that are open in-game, and allows
            for venue owners to announce their opening dates and special events for players to see and attend.
          </p>
          <Link to="/register">
            <button className="btn-outline">Register Here</button>
          </Link>
        </header>
      </div>
      <section className="events">
        <h2 className="sub-heading">Events</h2>
        <Carousel />
      </section>
    </>
  )
}

export default Home
