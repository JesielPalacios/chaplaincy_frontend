import { createContext, useState } from 'react'
export const Context = createContext()

const Provider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => {
    // return window.sessionStorage.getItem('token')
    return window.localStorage.getItem('token')
  })

  // const [sidebar, setSidebar] = useState(false)
  const [sidebar, setSidebar] = useState(true)

  const value = {
    isAuth,
    activateAuth: (token) => {
      setIsAuth(true)
      // window.sessionStorage.setItem('token', token)
      window.localStorage.setItem('token', token)
    },
    removeAuth: () => {
      setIsAuth(false)
      // return window.sessionStorage.removeItem('token')
      return window.localStorage.removeItem('token')
    },
    sidebar,
    showSidebar: () => setSidebar(!sidebar)
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default {
  Provider,
  Consumer: Context.Consumer
}
