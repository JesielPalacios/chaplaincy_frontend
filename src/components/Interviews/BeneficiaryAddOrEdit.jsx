import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { useUser } from '../../core/hooks/useUser'
import { getAllCustomersService } from '../beneficiary/beneficiaryService'
import { DashboardSection, DashboradLayout } from '../layout/Layout'
import { Seo } from '../layout/Seo'
import { AddUser, ButtonsWrapper, Loading } from './BeneficiariesList.styles'
import { Container } from './BeneficiaryAddOrEdit.styles'
import CustomerAddOrEditForm from './BeneficiaryAddOrEditForm'
import { getCustomerService } from './beneficiaryService'
import { resetCustomer } from './beneficiarySlice'

export default function CustomerAddOrEdit({ title }) {
  let navigate = useNavigate()
  const { interviewId } = useParams()
  const { isAuth } = useUser()
  const { customer, loading, error } = useSelector((state) => state.customer)
  const { customers } = useSelector((state) => state.customer)
  const dispatch = useDispatch()

  useEffect(() => {
    title === 'Agregar nueva entrevista' &&
      dispatch(resetCustomer()) &&
      getAllCustomersService(dispatch, isAuth)
    title === 'Editar entrevista' &&
      getCustomerService(dispatch, isAuth, interviewId)
  }, [])

  return (
    <DashboradLayout>
      <Seo
        title={
          title === 'Agregar nueva entrevista'
            ? 'Nueva entrevista'
            : (customer.firstName + ' ' + customer.firstSurname)
                .trim()
                .toLowerCase()
                .replace(/\w\S*/g, (w) =>
                  w.replace(/^\w/, (c) => c.toUpperCase())
                )
        }
        subtitle="Formulario de nueva entrevista"
      />
      <ButtonsWrapper>
        {interviewId && (
          <AddUser onClick={() => navigate('/entrevistas/' + interviewId)}>
            Ir al perfil de detalles del beneficiario
            <PersonOutlineOutlinedIcon className="productListDelete" />
          </AddUser>
        )}
        <AddUser onClick={() => navigate('/entrevistas')}>
          Ir a entrevistas
          <PeopleAltOutlinedIcon className="productListDelete" />
        </AddUser>
      </ButtonsWrapper>

      <DashboardSection
        title={
          title === 'Agregar nueva entrevista'
            ? title
            : title + ': ' + interviewId
        }
      >
        <Container>
          <div className="newContainer scroll">
            {loading && <Loading />}

            {error && 'Algo salió mal'}

            {!(loading && error) && customer && (
              <div className="bottom">
                {/* <div className="left"></div> */}
                <div className="right">
                  <CustomerAddOrEditForm
                    customer={customer}
                    title={title}
                    isAuth={isAuth}
                    dispatch={dispatch}
                    interviewId={interviewId}
                    customers={customers}
                  />
                </div>
              </div>
            )}
          </div>
        </Container>
      </DashboardSection>
    </DashboradLayout>
  )
}
