import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Events from "./pages/Events"
import Register from "./pages/Register"
import Settings from "./pages/Settings"
import { UserProvider } from "./context/user/userContext"

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events" element={<Events />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  )
}

export default App
