const userReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_USER":
      return {
        ...state,
        xivUser: action.payload,
      }

    case "LOGIN_USER":
      return {
        ...state,
        xivUser: action.payload,
      }

    case "LOGOUT_USER":
      return {
        ...state,
        xivUser: null,
      }

    case "ERROR":
      return {
        ...state,
        isError: action.payload,
      }
    default:
      return state
  }
}

export default userReducer
