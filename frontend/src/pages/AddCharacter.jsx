import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../context/user/userContext"

function Settings() {
  const [lodestone, setLodestone] = useState("")

  const { addCharacter, isError, xivUser } = useContext(UserContext)

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
    <>
      <h2 className="heading" style={{ textAlign: "center" }}>
        Character
      </h2>
      <section className="profile">
        <div className="portrait">
          <img src={xivUser.character[0].Character.Portrait} width="200px" alt="Character portrait" />
        </div>
        <div className="card-content">
          <h3 className="card-title">Name</h3>
          <p className="card-text">{xivUser.name}</p>
          <h3 className="card-title">Server</h3>
          <p className="card-text">
            {xivUser.character[0].Character.DC}, {xivUser.character[0].Character.Server}
          </p>
        </div>
      </section>

      <div className="form-control container" style={{ width: "400px" }}>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-text">
              <span className="required">* </span> Update character:
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
          <button className="btn">Update</button>
        </form>
      </div>
    </>
  )
}

export default Settings
