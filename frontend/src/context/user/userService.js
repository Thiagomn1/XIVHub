import axios from "axios"

const characterAdd = async characterData => {
  const response = await axios.post("/api/users/character", characterData)

  return response.data
}

const userService = {
  characterAdd,
}

export default userService
