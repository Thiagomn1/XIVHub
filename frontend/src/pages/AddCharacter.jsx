import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../context/user/userContext"

function Settings() {
  const [lodestone, setLodestone] = useState("")

  const { addCharacter, isError } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      console.log(isError)
    }
  }, [isError])

  const onSubmit = async event => {
    event.preventDefault()
    const lodestoneSplit = lodestone.split(/(\d+)/)
    const id = lodestoneSplit[1]
    await addCharacter(id)
    navigate("/")
  }

  return (
    <div className="form-control container" style={{ width: "400px" }}>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <h2 className="heading">Character</h2>
          <p className="text">You have no characters added yet</p>
          <label htmlFor="email" className="form-text">
            <span className="required">* </span> Add a new character:
          </label>
          <input
            type="character"
            name="character"
            value="character"
            id="character"
            value={lodestone}
            onChange={event => setLodestone(event.target.value)}
            className="form-input"
          />
        </div>
        <button className="btn">Register</button>
      </form>
    </div>
  )
}

export default Settings
