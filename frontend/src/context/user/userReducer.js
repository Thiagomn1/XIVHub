const userReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      }

    case "REGISTER_USER":
      return {
        ...state,
        loading: false,
        isSuccess: true,
        xivUser: action.payload[0],
        user: action.payload[1],
      }

    case "LOGIN_USER":
      return {
        ...state,
        loading: false,
        isSuccess: true,
        xivUser: action.payload[0],
        user: action.payload[1],
      }

    case "LOGOUT_USER":
      return {
        ...state,
        loading: false,
        isSuccess: true,
        xivUser: null,
        user: null,
      }

    case "ADD_CHARACTER":
      return {
        ...state,
        loading: false,
        isSuccess: true,
        xivUser: action.payload,
      }

    case "ERROR":
      return {
        ...state,
        loading: false,
        isError: action.payload,
      }
    default:
      return state
  }
}

export default userReducer
