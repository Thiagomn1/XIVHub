import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaRegArrowAltCircleRight, FaCog } from "react-icons/fa"
import Login from "./Login"
import UserContext from "../context/user/userContext"
import Sidebar from "./Sidebar"
import Image from "../images/test.png"
import "./Navbar.css"

function Navbar() {
  const { xivUser, logoutUser } = useContext(UserContext)

  const navigate = useNavigate()

  const logout = async () => {
    await logoutUser()
    navigate("/")
  }

  return (
    <>
      <nav className="header">
        <Link to="/">
          <h1 className="logo">
            XIV <span>Hub</span>
          </h1>
        </Link>

        <div className="wrapper">
          <ul className="header-items">
            <Link to="/profile">
              <li>Profile</li>
            </Link>
            <Link to="/housing">
              <li>Housing</li>
            </Link>
            <Link to="/events">
              <li>Events</li>
            </Link>
            <Link to="/events">
              <li>Info</li>
            </Link>
          </ul>
        </div>

        {xivUser ? (
          <>
            <div className="character">
              <p className="name">
                {xivUser !== null && xivUser.character.length > 0 ? xivUser.character[0].Name : "Anon"}
              </p>
              <img
                src={
                  xivUser !== null && xivUser.character.length > 0 ? xivUser.character[0].Avatar : `${Image}`
                }
                className="profile-img"
                alt=""
              />
              <Link to="/addcharacter">
                <FaCog size={18} className="cog-icon" />
              </Link>
            </div>
            <button className="btn-outline btn-logout" onClick={logout}>
              <FaRegArrowAltCircleRight className="btn-icon" />
              Logout
            </button>
          </>
        ) : (
          <Login />
        )}
        <Sidebar />
      </nav>
    </>
  )
}

export default Navbar
