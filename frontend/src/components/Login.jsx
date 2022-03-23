import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import Modal from "react-modal"
import { FaRegArrowAltCircleRight } from "react-icons/fa"
import UserContext from "../context/user/userContext"

Modal.setAppElement("#root")

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const { loginUser, user } = useContext(UserContext)

  const navigate = useNavigate()

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const onSubmit = async event => {
    event.preventDefault()
    const userData = {
      email,
      password,
    }
    await loginUser(userData)

    if (user) {
      navigate("/")
      closeModal()
    }
  }

  return (
    <>
      <button className="btn-outline btn-logout" onClick={openModal}>
        <FaRegArrowAltCircleRight className="btn-icon" />
        Login
      </button>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        closeTimeoutMS={500}
        style={{
          content: {
            width: "90%",
            maxWidth: "600px",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            position: "relative",
            backgroundColor: "#1f1f1f",
            borderRadius: "20px",
          },
        }}
        contentLabel="Login"
      >
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <div className="container form-control">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-text">
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-input"
                placeholder="Email"
                value={email}
                style={{ width: "70%" }}
                onChange={event => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-text">
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-input"
                placeholder="Password"
                value={password}
                style={{ width: "70%" }}
                onChange={event => setPassword(event.target.value)}
              />
            </div>
            <button className="btn" style={{ width: "45%", minWidth: "200px" }}>
              <FaRegArrowAltCircleRight className="btn-icon" />
              Login
            </button>
          </form>
          <Link to="/register">
            <button
              onClick={closeModal}
              className="btn btn-outline"
              style={{ width: "45%", minWidth: "200px", marginTop: "15px" }}
            >
              Register here
            </button>
          </Link>
        </div>
      </Modal>
    </>
  )
}

export default Login
