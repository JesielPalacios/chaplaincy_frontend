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
  const { beneficiaryId } = useParams()
  const { isAuth } = useUser()
  const { customer, loading, error } = useSelector((state) => state.customer)
  const { customers } = useSelector((state) => state.customer)
  const dispatch = useDispatch()

  useEffect(() => {
    title === 'Crear nuevo beneficiario' &&
      dispatch(resetCustomer()) &&
      getAllCustomersService(dispatch, isAuth)
    title === 'Editar beneficiario' &&
      getCustomerService(dispatch, isAuth, beneficiaryId)
  }, [])

  return (
    <DashboradLayout>
      <Seo
        title={
          title === 'Agregar nueva entrevista'
            ? 'Nuevo beneficiario'
            : (customer.firstName + ' ' + customer.firstSurname)
                .trim()
                .toLowerCase()
                .replace(/\w\S*/g, (w) =>
                  w.replace(/^\w/, (c) => c.toUpperCase())
                )
        }
        subtitle="Formulario de nuevo beneficiario"
      />
      <ButtonsWrapper>
        {beneficiaryId && (
          <AddUser onClick={() => navigate('/beneficiarios/' + beneficiaryId)}>
            Ir al perfil de detalles del beneficiario
            <PersonOutlineOutlinedIcon className="productListDelete" />
          </AddUser>
        )}
        <AddUser onClick={() => navigate('/beneficiarios')}>
          Ir a beneficiarios
          <PeopleAltOutlinedIcon className="productListDelete" />
        </AddUser>
      </ButtonsWrapper>

      <DashboardSection
        title={
          title === 'Agregar nueva entrevista'
            ? title
            : title + ': ' + beneficiaryId
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
                    beneficiaryId={beneficiaryId}
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
