import { createContext, useReducer } from "react"
import userReducer from "./userReducer"
import axios from "axios"
import userService from "./userService"

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
    const user = {
      email: userData.email,
      password: userData.password,
    }

    const response = await axios.post("/api/users", user).catch(error => {
      if (error.response) {
        dispatch({
          type: "ERROR",
          payload:
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString(),
        })
      }
    })

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data))
      dispatch({
        type: "REGISTER_USER",
        payload: response.data,
      })
    }
  }

  const addCharacter = async id => {
    const xivResponse = await axios.get(`https://xivapi.com/character/${id}`).catch(error => {
      if (error.response) {
        dispatch({
          type: "ERROR",
          payload:
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString(),
        })
      }
    })

    const email = xivUser.email

    const character = {
      name: xivResponse.data.Character.Name,
      email: email,
      lodestoneId: id,
      character: xivResponse.data.Character,
    }

    const characterData = await userService.characterAdd(character)

    console.log(characterData)
  }

  const loginUser = async userData => {
    const response = await axios.post("/api/users/login", userData).catch(error => {
      if (error.response) {
        dispatch({
          type: "ERROR",
          payload:
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString(),
        })
      }
    })

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data))
      dispatch({
        type: "LOGIN_USER",
        payload: response.data,
      })
    }
  }

  const logoutUser = async () => {
    await axios.post("/api/users/logout").catch(error => {
      if (error.response) {
        dispatch({
          type: "ERROR",
          payload:
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString(),
        })
      }
    })
    localStorage.clear()

    dispatch({
      type: "LOGOUT_USER",
    })
  }

  return (
    <UserContext.Provider
      value={{
        xivUser: state.xivUser,
        loading: state.loading,
        isError: state.isError,
        registerUser,
        addCharacter,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
export default UserContext
