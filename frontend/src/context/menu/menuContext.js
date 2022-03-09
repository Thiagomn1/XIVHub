import { createContext, useReducer, useState } from "react"

const MenuContext = createContext()

export const MenuProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(true)
  const closeSidebar = () => setSidebar(false)

  return (
    <MenuContext.Provider
      value={{
        sidebar: sidebar,
        showSidebar,
        closeSidebar,
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}
export default MenuContext
