import axios from "axios"

const register = async userData => {
  const response = await axios.post("/api/users", userData)

  if (response.data) {
    localStorage.setItem("xivUser", JSON.stringify(response.data[0]))
    localStorage.setItem("user", JSON.stringify(response.data[1]))
  }

  return response.data
}

const login = async userData => {
  const response = await axios.post("/api/users/login", userData)

  if (response.data) {
    localStorage.setItem("xivUser", JSON.stringify(response.data[0]))
    localStorage.setItem("user", JSON.stringify(response.data[1]))
  }

  return response.data
}

const characterUpdate = async characterData => {
  const response = await axios.put("/api/users/character/new", characterData)

  if (response.data) {
    localStorage.setItem("xivUser", JSON.stringify(response.data))
  }

  return response.data
}

const characterVerify = async characterData => {
  const response = await axios.put("/api/users/character", characterData)

  if (response.data) {
    localStorage.setItem("xivUser", JSON.stringify(response.data))
  }

  return response.data
}

const userService = {
  register,
  login,
  characterUpdate,
  characterVerify,
}

export default userService
