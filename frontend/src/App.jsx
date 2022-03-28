import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Events from "./pages/Events"
import Register from "./pages/Register"
import Settings from "./pages/Settings"
import { UserProvider } from "./context/user/userContext"
import { MenuProvider } from "./context/menu/menuContext"
import { EventProvider } from "./context/event/eventContext"

function App() {
  return (
    <>
      <EventProvider>
        <MenuProvider>
          <UserProvider>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/events" element={<Events />} />
                <Route path="/addcharacter" element={<Settings />} />
              </Routes>
            </Router>
          </UserProvider>
        </MenuProvider>
      </EventProvider>
    </>
  )
}

export default App
