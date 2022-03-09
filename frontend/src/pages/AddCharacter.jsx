import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../context/user/userContext"
import "./AddCharacter.css"

function Settings() {
  const [lodestone, setLodestone] = useState("")
  const [token, setToken] = useState("")

  const { addCharacter, isError, xivUser } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      console.log(isError)
    }

    generateToken()
  }, [isError])

  const onSubmit = async event => {
    event.preventDefault()
    const lodestoneSplit = lodestone.split(/(\d+)/)
    const id = lodestoneSplit[1]
    await addCharacter(id)
    navigate("/")
  }

  const generateToken = () => {
    const token = Math.random().toString(36).slice(2)
    setToken(`ff-${token}`)
  }

  return (
    <>
      <h2 className="heading" style={{ textAlign: "center" }}>
        Character
      </h2>
      {xivUser && xivUser.character.length !== 0 ? (
        <>
          <section className="profile">
            <div className="portrait">
              <img src={xivUser.character[0].Portrait} width="200px" alt="Character portrait" />
            </div>
            <div className="card-content">
              <h3 className="card-title">Name</h3>
              <p className="card-text">{xivUser.character[0].Name}</p>
              <h3 className="card-title">Server</h3>
              <p className="card-text">
                {xivUser.character[0].DC}, {xivUser.character[0].Server}
              </p>
            </div>
          </section>
          <div className="form-control container">
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
              <button className="btn">Update Character</button>
            </form>
          </div>
        </>
      ) : (
        <>
          <p className="text">No characters added yet</p>
          <div className="form-control container">
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
              <button className="btn">Add Character</button>
            </form>
          </div>
        </>
      )}
      <div className="container" style={{ width: "800px" }}>
        <p className="attention-text" style={{ marginTop: "20px" }}>
          In order to verify your character ownership, please post the following code to your character's
          Lodestone Profile. You can delete the entry once the character has been verified.
        </p>
        <span className="required">{token}</span>
      </div>
    </>
  )
}

export default Settings
