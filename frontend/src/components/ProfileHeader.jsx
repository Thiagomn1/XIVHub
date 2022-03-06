import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaRegArrowAltCircleRight, FaCog } from "react-icons/fa"
import Login from "./Login"
import UserContext from "../context/user/userContext"
import Image from "../images/test.png"

function Header() {
  const { xivUser, user, logoutUser } = useContext(UserContext)

  const navigate = useNavigate()

  const logout = async () => {
    await logoutUser()
    navigate("/")
  }

  if (!user) {
    return <Login />
  }

  return (
    <>
      <div className="character">
        <p className="name">
          {xivUser !== null && xivUser.character.length > 0 ? xivUser.character[0].Name : "Anon"}
        </p>
        <img
          src={xivUser !== null && xivUser.character.length > 0 ? xivUser.character[0].Avatar : `${Image}`}
          className="profile-img"
          alt=""
        />
        )
        <Link to="/addcharacter">
          <FaCog size={18} className="cog-icon" />
        </Link>
      </div>
      <button className="btn-outline" onClick={logout}>
        <FaRegArrowAltCircleRight className="btn-icon" />
        Logout
      </button>
    </>
  )
}

export default Header
