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
    const xivResponse = await axios.get(`https://xivapi.com/character/${id[1]}`).catch(error => {
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

    const user = {
      name: xivResponse.data.Character.Name,
      lodestoneId: id[1].toString(),
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
      userJSON.push(xivResponse.data, user)
      localStorage.setItem("user", JSON.stringify(userJSON))
      dispatch({
        type: "REGISTER_USER",
        payload: userJSON,
      })
    }
  }

  const loginUser = async userData => {
    let userJSON = []

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
      const xivResponse = await axios
        .get(`https://xivapi.com/character/${response.data.lodestoneId}`)
        .catch(error => {
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

      userJSON.push(xivResponse.data, response.data)
      localStorage.setItem("user", JSON.stringify(userJSON))
      dispatch({
        type: "LOGIN_USER",
        payload: userJSON,
      })
    }
  }

  const logoutUser = () => {
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
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
export default UserContext
