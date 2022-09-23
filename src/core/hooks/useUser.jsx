import { useCallback, useContext, useState } from 'react'
import { Context } from '../context/UserContext'
import { loginService } from '../../services/user.service'

export const useUser = () => {
  const { isAuth, activateAuth, removeAuth, sidebar, showSidebar } =
    useContext(Context)
  const [state, setState] = useState({ loading: false, error: false })

  const login = useCallback(
    ({ email, password }) => {
      setState({ loading: true, error: false })
      loginService({ email, password })
        .then((jwt) => {
          activateAuth(jwt)
          setState({ loading: false, error: false })
        })
        .catch((err) => {
          removeAuth()
          setState({ loading: false, error: true })
          console.error(err)
        })
    },
    [activateAuth]
  )

  return {
    login,
    logOut: removeAuth,
    isAuth,
    loading: state.loading,
    error: state.error,
    sidebar,
    showSidebar
  }
}
