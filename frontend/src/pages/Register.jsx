import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router"
import UserContext from "../context/user/userContext"

function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [lodestone, setLodestone] = useState("")
  const [token, setToken] = useState("")
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
      const lodestoneSplit = lodestone.split(/(\d+)/)
      const id = lodestoneSplit[1]

      const userData = {
        email,
        password,
        id,
      }

      await registerUser(userData, token)
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
        <div className="form-group">
          <label htmlFor="lodestone" className="form-text">
            <span className="required">* </span>Lodestone URL:
          </label>
          <input
            type="text"
            name="lodestone"
            value={lodestone}
            id="lodestone"
            className="form-input"
            onChange={event => setLodestone(event.target.value)}
          />
        </div>
        <span className="attention-text">{error}</span>
        <button className="btn">Register</button>
      </form>
      <div className="container" style={{ width: "800px" }}>
        <p className="attention-text">
          In order to verify your character ownership, please post the following code to your character's
          Lodestone Profile. You can delete the entry once the character has been verified.
        </p>
        <span className="required">{token}</span>
      </div>
    </>
  )
}

export default Register
