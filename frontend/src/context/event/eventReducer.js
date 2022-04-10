const userReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      }

    case "GET_EVENTS":
      return {
        ...state,
        loading: false,
        isSuccess: true,
        events: action.payload,
      }

    case "CREATE_EVENT":
      return {
        ...state,
        loading: false,
        isSuccess: true,
        events: action.payload,
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
