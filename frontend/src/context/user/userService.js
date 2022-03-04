import axios from "axios"

const register = async userData => {
  const response = await axios.post("/api/users", userData)

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }

  return response.data
}

const login = async userData => {
  const response = await axios.post("/api/users/login", userData)

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }

  return response.data
}

const characterAdd = async characterData => {
  const response = await axios.put("/api/users/character", characterData)

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }

  return response.data
}

const userService = {
  register,
  login,
  characterAdd,
}

export default userService
