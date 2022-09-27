import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import { useUser } from './core/hooks/useUser'
import { GlobalStyle } from './components/layout/GlobalStyle'

const Home = React.lazy(() => import('./components/Home/Home'))
const LogIn = React.lazy(() => import('./components/Login/Login'))
const Dashboard = React.lazy(() => import('./components/Dashboard/Dashboard'))
// const Users = React.lazy(() => import('./components/Users/Users'))
const Users = React.lazy(() => import('./components/Users/Users3'))
const User = React.lazy(() => import('./components/User/Users3'))
const Interviews = React.lazy(() => import('./components/Interviews/Interviews'))

export const AppRouter = () => {
  const { isAuth } = useUser()

  return (
    <Suspense fallback="Cargando...">
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={!isAuth ? <LogIn /> : <Navigate replace to="/" />} />
          <Route path="dashboard" element={isAuth ? <Dashboard /> : <Navigate replace to="/login" />} />
          <Route path="usuarios" element={isAuth ? <Users /> : <Navigate replace to="/login" />} />
          <Route path="usuarios/:userId" element={isAuth ? <User /> : <Navigate replace to="/login" />} />
          <Route path="entrevistas" element={isAuth ? <Interviews /> : <Navigate replace to="/login" />} />
        </Routes>
      </Router>
    </Suspense>
  )
}
