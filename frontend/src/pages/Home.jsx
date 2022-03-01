import { Link } from "react-router-dom"
import { useContext } from "react"
import Carousel from "../components/Carousel"
import UserContext from "../context/user/userContext"

function Home() {
  const { xivUser } = useContext(UserContext)

  return (
    <>
      <div className="hero container">
        <header className="hero-content">
          <h2 className="heading">XIVHub</h2>
          <p className="text" style={{ paddingBottom: "20px" }}>
            {/* XIVHub provides a platform for players to browse current venues that are open in-game, and allows
            for venue owners to announce their opening dates and special events for players to see and attend. */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et odio nec magna eleifend rhoncus
            semper porttitor quam. Suspendisse ut nisi nec dui ullamcorper porta. Maecenas ac dignissim diam.
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
        <Carousel />
      </section>
    </>
  )
}

export default Home
