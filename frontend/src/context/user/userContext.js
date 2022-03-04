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
    isSuccess: false,
    isError: "",
  }

  const [state, dispatch] = useReducer(userReducer, initialState)

  const registerUser = async userData => {
    dispatch({
      type: "LOADING",
    })

    const user = {
      email: userData.email,
      password: userData.password,
    }

    try {
      const response = await userService.register(user)
      dispatch({
        type: "REGISTER_USER",
        payload: response,
      })
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload:
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString(),
      })
    }
  }

  const loginUser = async userData => {
    try {
      const response = await userService.login(userData)
      dispatch({
        type: "LOGIN_USER",
        payload: response,
      })
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload:
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString(),
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

  const addCharacter = async id => {
    const data = {
      email: xivUser.email,
      lodestoneId: id,
    }

    try {
      const response = await userService.characterAdd(data)
      dispatch({
        type: "ADD_CHARACTER",
        payload: response,
      })
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload:
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString(),
      })
    }
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
        addCharacter,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
export default UserContext
