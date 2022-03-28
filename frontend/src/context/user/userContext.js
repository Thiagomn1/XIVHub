import { createContext, useReducer } from "react"
import userReducer from "./userReducer"
import axios from "axios"
import userService from "./userService"

const UserContext = createContext()

const xivUser = JSON.parse(localStorage.getItem("xivUser"))
const user = JSON.parse(localStorage.getItem("user"))

export const UserProvider = ({ children }) => {
  const initialState = {
    user: user ? user : null,
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
      lodestone: userData.id,
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

  const updateCharacter = async id => {
    const data = {
      email: user.email,
      lodestone: id,
    }

    try {
      const response = await userService.characterUpdate(data)
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

  const verifyCharacter = async (id, token) => {
    const data = {
      email: user.email,
      lodestone: id,
      token,
    }

    try {
      const response = await userService.characterVerify(data)
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
        user: state.user,
        xivUser: state.xivUser,
        loading: state.loading,
        isError: state.isError,
        isSucess: state.isSuccess,
        registerUser,
        loginUser,
        logoutUser,
        updateCharacter,
        verifyCharacter,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
export default UserContext
