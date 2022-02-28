import { createContext, useReducer } from "react"
import userReducer from "./userReducer"
import axios from "axios"

const UserContext = createContext()

const xivUser = JSON.parse(localStorage.getItem("user"))

export const UserProvider = ({ children }) => {
  const initialState = {
    xivUser: xivUser ? xivUser : null,
    loading: false,
    isError: "",
  }

  const [state, dispatch] = useReducer(userReducer, initialState)

  const registerUser = async userData => {
    let userJSON = []
    const id = userData.lodestone.split(/(\d+)/)
    const xivResponse = await axios.get(`https://xivapi.com/character/${id[1]}`)

    const user = {
      name: xivResponse.data.Character.Name,
      email: userData.email,
      password: userData.password,
    }

    const response = await axios.post("/api/users", user)

    if (response.data) {
      userJSON.push(xivResponse.data, user)
      dispatch({
        type: "REGISTER_USER",
        payload: user,
      })
      return userJSON
    }
  }

  return (
    <UserContext.Provider
      value={{ xivUser: state.xivUser, loading: state.loading, isError: state.isError, registerUser }}
    >
      {children}
    </UserContext.Provider>
  )
}
export default UserContext
