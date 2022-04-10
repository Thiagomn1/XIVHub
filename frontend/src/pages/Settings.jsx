import { useState, useEffect, useContext } from "react"
import UpdateCharacter from "../components/UpdateCharacter"
import VerifyCharacter from "../components/VerifyCharacter"
import UserContext from "../context/user/userContext"
import "./Settings.css"

function Settings() {
  const [change, setChange] = useState(false)

  const { isError, xivUser } = useContext(UserContext)

  useEffect(() => {
    if (isError) {
      console.log(isError)
    }
  }, [isError])

  return (
    <>
      <h2 className="heading" style={{ textAlign: "center" }}>
        Character
      </h2>
      {xivUser && xivUser.character.length !== 0 && (
        <>
          <section className="profile">
            <div className="portrait">
              <img src={xivUser.character[0].Portrait} width="200px" alt="Character portrait" />
            </div>
            <div className="card-content">
              <p className="card-text">
                {xivUser.verified ? "Character Verified" : "Character not Verified"}
              </p>
              <h3 className="card-title">Name</h3>
              <p className="card-text">{xivUser.character[0].Name}</p>
              <h3 className="card-title">Server</h3>
              <p className="card-text">
                {xivUser.character[0].DC}, {xivUser.character[0].Server}
              </p>
              <button className="btn-outline" onClick={prevState => setChange(!change)}>
                Change Character
              </button>
            </div>
          </section>

          {xivUser.verified && <h3 className="card-title container">Character already verified!</h3>}

          {change ? <UpdateCharacter /> : !xivUser.verified && <VerifyCharacter />}
        </>
      )}
    </>
  )
}

export default Settings
