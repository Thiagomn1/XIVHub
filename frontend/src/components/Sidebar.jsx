import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaRegArrowAltCircleRight, FaBars, FaWindowClose } from "react-icons/fa"
import UserContext from "../context/user/userContext"
import MenuContext from "../context/menu/menuContext"
import Image from "../images/test.png"
import "./Navbar.css"

function Sidebar() {
  const { xivUser, logoutUser } = useContext(UserContext)

  const { sidebar, showSidebar, closeSidebar } = useContext(MenuContext)

  const navigate = useNavigate()

  const logout = async () => {
    await logoutUser()
    navigate("/")
  }

  return (
    <>
      <div className="menu-bars">
        <FaBars onClick={showSidebar} />
      </div>
      {xivUser ? (
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <div className="nav-wrapper">
            <div className="nav-character">
              <FaWindowClose className="menu-close" size={18} onClick={closeSidebar} />
              <img
                src={
                  xivUser !== null && xivUser.character.length > 0 ? xivUser.character[0].Avatar : `${Image}`
                }
                className="profile-img"
                alt=""
              />
              <p className="nav-text">
                {xivUser !== null && xivUser.character.length > 0 ? xivUser.character[0].Name : "Anon"}
              </p>
              <button className="nav-btn" onClick={logout}>
                <FaRegArrowAltCircleRight className="btn-icon" />
                Logout
              </button>
            </div>
          </div>
          <ul className="nav-items">
            <Link to="/housing">
              <li className="nav-item" onClick={closeSidebar}>
                Housing
              </li>
            </Link>
            <Link to="/events">
              <li className="nav-item" onClick={closeSidebar}>
                Events
              </li>
            </Link>

            <hr className="break" />
            <Link to="/profile"></Link>
            <li className="nav-item" onClick={closeSidebar}>
              Profile
            </li>
            <Link to="/addcharacter">
              <li className="nav-item" onClick={closeSidebar}>
                Update Character
              </li>
            </Link>

            <Link to="/settings">
              <li className="nav-item" onClick={closeSidebar}>
                Settings
              </li>
            </Link>

            <hr className="break" />
            <Link to="/about">
              <li className="nav-item" onClick={closeSidebar}>
                Info
              </li>
            </Link>
          </ul>
        </nav>
      ) : (
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <div className="nav-wrapper">
            <FaWindowClose className="menu-close" size={18} onClick={closeSidebar} />
          </div>
          <ul className="nav-items">
            <Link to="/housing">
              <li className="nav-item" onClick={closeSidebar}>
                Housing
              </li>
            </Link>
            <Link to="/events">
              <li className="nav-item" onClick={closeSidebar}>
                Events
              </li>
            </Link>

            <hr className="break" />
            <Link to="/about">
              <li className="nav-item" onClick={closeSidebar}>
                Info
              </li>
            </Link>
          </ul>
        </nav>
      )}
    </>
  )
}

export default Sidebar
