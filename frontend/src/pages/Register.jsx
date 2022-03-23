import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router"
import UserContext from "../context/user/userContext"

function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [error, setError] = useState("")

  const { xivUser, user, registerUser, isError } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (xivUser || user) {
      navigate("/")
    }

    if (isError) {
      console.log(isError)
    }

    generateToken()
  }, [xivUser, isError, navigate])

  const register = async event => {
    event.preventDefault()

    if (password !== passwordConfirm) {
      setError("Passwords do not match")
    } else {
      const userData = {
        email,
        password,
      }

      await registerUser(userData)
    }
  }

  const generateToken = () => {
    const token = Math.random().toString(36).slice(2)
    setToken(`ff-${token}`)
  }

  return (
    <>
      <form onSubmit={register} className="form-control container">
        <div className="form-group">
          <label htmlFor="email" className="form-text">
            <span className="required">* </span> Email:
          </label>
          <input
            type="email"
            name="email"
            value={email}
            id="email"
            className="form-input"
            onChange={event => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-text">
            <span className="required">* </span>Password:
          </label>
          <input
            type="password"
            name="password"
            value={password}
            id="password"
            className="form-input"
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordConfirm" className="form-text">
            <span className="required">* </span>Confirm Password:
          </label>
          <input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            id="passwordConfirm"
            className="form-input"
            onChange={event => setPasswordConfirm(event.target.value)}
          />
        </div>
        <span className="attention-text">{error}</span>
        <button className="btn">Register</button>
      </form>
    </>
  )
}

export default Register
