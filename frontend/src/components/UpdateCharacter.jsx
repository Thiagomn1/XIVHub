import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../context/user/userContext"
import "../pages/Settings.css"

function UpdateCharacter() {
  const [lodestone, setLodestone] = useState("")

  const { updateCharacter, isError } = useContext(UserContext)

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
    await updateCharacter(id)
    navigate("/")
  }

  return (
    <>
      <div className="form-control container">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-text">
              <span className="required">* </span> Lodestone URL:
            </label>
            <input
              type="character"
              name="character"
              id="character"
              value={lodestone}
              onChange={event => setLodestone(event.target.value)}
              className="form-input"
            />
          </div>
          <button className="btn">Update Character</button>
        </form>
      </div>
    </>
  )
}

export default UpdateCharacter
