import React, { Suspense } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { Loading } from './components/beneficiary/BeneficiariesList.styles'

import { GlobalStyle } from './components/layout/GlobalStyle'
import { useUser } from './core/hooks/useUser'

const Home = React.lazy(() => import('./components/Home/Home'))
const LogIn = React.lazy(() => import('./components/Login/Login'))
const Dashboard = React.lazy(() => import('./components/Dashboard/Dashboard'))
const UserList = React.lazy(() => import('./components/user/UserList'))
const BeneficiaryList = React.lazy(() => import('./components/beneficiary/BeneficiariesList'))
const Beneficiary = React.lazy(() => import('./components/beneficiary/Beneficiary'))
const BeneficiaryAdd = React.lazy(() => import('./components/beneficiary/BeneficiaryAdd'))
// const CustomerEdit = React.lazy(() => import('./components/beneficiary/BeneficiaryEdit'))
const BeneficiaryAddOrEdit = React.lazy(() => import('./components/beneficiary/BeneficiaryAddOrEdit'))
const Interviews = React.lazy(() => import('./components/interview/InterviewsList'))
const Interview = React.lazy(() => import('./components/interview/Interview'))
const InterviewAddOrEdit = React.lazy(() => import('./components/interview/InterviewAddOrEdit'))

export const AppRouter = () => {
  const { isAuth } = useUser()

  return (
    <Suspense fallback={<Loading />}>
      <GlobalStyle />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={!isAuth ? <LogIn /> : <Navigate replace to="/" />} />
          <Route path="dashboard" element={isAuth ? <Dashboard /> : <Navigate replace to="/login" />} />

          {/* <Route path="administradores">
            <Route index element={isAuth ? <BeneficiaryList /> : <Navigate replace to="/login" />} />
            <Route path="nuevo" element={isAuth ? <BeneficiaryAdd /> : <Navigate replace to="/login" />} />
            <Route path=":beneficiaryId">
              <Route index element={isAuth ? <Beneficiary /> : <Navigate replace to="/login" />} />
              <Route path="editar" element={isAuth ? <BeneficiaryAddOrEdit title='Editar beneficiario' /> : <Navigate replace to="/login" />} />
            </Route>
          </Route> */}
                        // {/* <Route path="editar" element={isAuth ? <CustomerEdit /> : <Navigate replace to="/login" />} /> */}


          <Route path="beneficiarios">
            <Route index element={isAuth ? <BeneficiaryList /> : <Navigate replace to="/login" />} />
            <Route path="nuevo" element={isAuth ? <BeneficiaryAdd /> : <Navigate replace to="/login" />} />
            <Route path=":beneficiaryId">
              <Route index element={isAuth ? <Beneficiary /> : <Navigate replace to="/login" />} />
              {/* <Route path="editar" element={isAuth ? <CustomerEdit /> : <Navigate replace to="/login" />} /> */}
              <Route path="editar" element={isAuth ? <BeneficiaryAddOrEdit title='Editar beneficiario' /> : <Navigate replace to="/login" />} />
            </Route>
          </Route>

          <Route path="entrevistas">
            <Route index element={isAuth ? <Interviews /> : <Navigate replace to="/login" />} />
            <Route path="agregar" element={isAuth ? <InterviewAddOrEdit title="Agregar nueva entrevista" /> : <Navigate replace to="/login" />} />
            <Route path=":interviewId">
              <Route index element={isAuth ? <Interview /> : <Navigate replace to="/login" />} />
              <Route path="editar" element={isAuth ? <InterviewAddOrEdit title="Editar entrevista" /> : <Navigate replace to="/login" />} />
            </Route>
          </Route>

        </Routes>
      </Router>
    </Suspense>
  )
}
