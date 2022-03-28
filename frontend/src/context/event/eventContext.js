import { createContext, useReducer } from "react"
import eventReducer from "./eventReducer"
import eventService from "./eventService"

const EventContext = createContext()

export const EventProvider = ({ children }) => {
  const initialState = {
    events: null,
    loading: false,
    isSuccess: false,
    isError: "",
  }

  const [state, dispatch] = useReducer(eventReducer, initialState)

  const getEvents = async () => {
    dispatch({
      type: "LOADING",
    })

    try {
      const response = await eventService.getAllEvents()
      dispatch({
        type: "GET_EVENTS",
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
    <EventContext.Provider
      value={{
        events: state.events,
        loading: state.loading,
        isError: state.isError,
        isSucess: state.isSuccess,
        getEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}
export default EventContext
