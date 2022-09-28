import React, { Suspense } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import { GlobalStyle } from './components/layout/GlobalStyle'
import { useUser } from './core/hooks/useUser'

const Home = React.lazy(() => import('./components/Home/Home'))
const LogIn = React.lazy(() => import('./components/Login/Login'))
const Dashboard = React.lazy(() => import('./components/Dashboard/Dashboard'))
const CustomersList = React.lazy(() => import('./components/CustomersList'))
const Customer = React.lazy(() => import('./components/Customer'))
const CustomerAddOrEdit = React.lazy(() => import('./components/CustomerAddOrEdit'))
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

          <Route path="beneficiarios">
            <Route index element={isAuth ? <CustomersList /> : <Navigate replace to="/login" />} />
            <Route path=":customerId" element={isAuth ? <Customer /> : <Navigate replace to="/login" />} />
            <Route path="nuevo" element={isAuth ? <CustomerAddOrEdit title="Crear nuevo beneficiario" /> : <Navigate replace to="/login" />} />
            <Route path="editar">
              <Route path=":customerIdForEdit" element={isAuth ? <CustomerAddOrEdit title="Editar beneficiario" /> : <Navigate replace to="/login" />} />
            </Route>
          </Route>

          <Route path="entrevistas" element={isAuth ? <Interviews /> : <Navigate replace to="/login" />} />
        </Routes>
      </Router>
    </Suspense>
  )
}
