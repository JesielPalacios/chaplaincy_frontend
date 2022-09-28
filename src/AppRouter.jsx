import React, { Suspense } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import { GlobalStyle } from './components/layout/GlobalStyle'
import { useUser } from './core/hooks/useUser'

const Home = React.lazy(() => import('./components/Home/Home'))
const LogIn = React.lazy(() => import('./components/Login/Login'))
const Dashboard = React.lazy(() => import('./components/Dashboard/Dashboard'))
const CustomersList = React.lazy(() => import('./components/CustomersList'))
const Customer = React.lazy(() => import('./components/Customer'))
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
          {/* <Route path="usuarios" element={isAuth ? <Users /> : <Navigate replace to="/login" />} /> */}
          {/* <Route path="usuarios/:userId" element={isAuth ? <User /> : <Navigate replace to="/login" />} /> */}
          <Route path="beneficiarios" element={isAuth ? <CustomersList /> : <Navigate replace to="/login" />} />
          <Route path="beneficiarios/:customerId" element={isAuth ? <Customer /> : <Navigate replace to="/login" />} />
          <Route path="entrevistas" element={isAuth ? <Interviews /> : <Navigate replace to="/login" />} />
          {/* <Route path="entrevistas/:interviewId" element={isAuth ? <User /> : <Navigate replace to="/login" />} /> */}
        </Routes>
      </Router>
    </Suspense>
  )
}
