import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../context/user/userContext"
import "../pages/Settings.css"

function VerifyCharacter() {
  const [lodestone, setLodestone] = useState("")
  const [token, setToken] = useState("")

  const { verifyCharacter, isError, isSuccess } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      console.log(isError)
    }

    if (isSuccess) {
      console.log("Character successfully verified")
      navigate("/")
    }

    generateToken()
  }, [isError, isSuccess])

  const onSubmit = async event => {
    event.preventDefault()
    const lodestoneSplit = lodestone.split(/(\d+)/)
    const id = lodestoneSplit[1]
    console.log(token, lodestone)
    await verifyCharacter(id, token)
  }

  const generateToken = () => {
    const token = Math.random().toString(36).slice(2)
    setToken(`ff-${token}`)
  }

  return (
    <section className="verify">
      <div className="container" style={{ maxWidth: "800px" }}>
        <p className="attention-text" style={{ marginTop: "20px" }}>
          In order to verify your character ownership, please post the following code to your character's
          Lodestone Profile. You can delete the entry once the character has been verified.
        </p>
        <span className="required">{token}</span>
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
            <button className="btn">Verify Character</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default VerifyCharacter
