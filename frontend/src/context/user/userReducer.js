const userReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_USER":
      return {
        ...state,
        xivUser: action.payload,
      }

    case "LOGIN_USER":
      return state

    case "ERROR":
      return {
        ...state,
        isError: action.payload,
      }
  }
}

export default userReducer
