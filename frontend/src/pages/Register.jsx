import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"

function Register() {
  const [email, setEmail] = useState("")
  const [lodestone, setLodestone] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")

  const navigate = useNavigate()

  const registerUser = async event => {
    event.preventDefault()
    const id = lodestone.split(/(\d+)/)

    const xivResponse = await axios.get(`https://xivapi.com/character/${id[1]}`)

    if (xivResponse.data) {
      localStorage.setItem("user", JSON.stringify(xivResponse.data))

      const userData = {
        name: xivResponse.data.Character.Name,
        email,
        password,
      }

      console.log(userData)

      const response = await axios.post("/api/users", userData)

      navigate("/")
    }
  }

  return (
    <div className="form-control container" style={{ width: "400px" }}>
      <form onSubmit={registerUser}>
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
        <button className="btn">Register</button>
      </form>
    </div>
  )
}

export default Register
