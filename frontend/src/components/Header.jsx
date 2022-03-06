import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Modal from "react-modal"
import ProfileHeader from "./ProfileHeader"
import UserContext from "../context/user/userContext"

Modal.setAppElement("#root")

function Header() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const { xivUser, user, logoutUser, loginUser, isError } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      console.log(isError)
    }
  }, [xivUser, isError, navigate])

  return (
    <nav className="header">
      <Link to="/">
        <h1 className="logo">
          XIV <span>Hub</span>
        </h1>
      </Link>

      <ul>
        <li>Profile</li>
        <Link to="/events">
          <li>Events</li>
        </Link>
      </ul>
      <ProfileHeader />
    </nav>
  )
}

export default Header
