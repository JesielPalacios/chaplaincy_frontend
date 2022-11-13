import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { useUser } from '../../core/hooks/useUser'
import { DashboardSection, DashboradLayout } from '../layout/Layout'
import { Seo } from '../layout/Seo'
import { AddUser, ButtonsWrapper, Loading } from './BeneficiariesList.styles'
import { Container } from './BeneficiaryAddOrEdit.styles'
import CustomerAddOrEditForm from './BeneficiaryAddOrEditForm'
import { getCustomerService } from './beneficiaryService'
import { resetCustomer } from './beneficiarySlice'

export default function CustomerAddOrEdit({ title }) {
  let navigate = useNavigate()
  const [beneficiaryPhoto, setBeneficiaryPhoto] = useState(null)
  const { beneficiaryId } = useParams()
  const { isAuth } = useUser()
  const { customer, loading, error } = useSelector((state) => state.customer)
  const dispatch = useDispatch()

  useEffect(() => {
    title === 'Crear nuevo beneficiario' && dispatch(resetCustomer())
    title === 'Editar beneficiario' &&
      getCustomerService(dispatch, isAuth, beneficiaryId)
  }, [])

  return (
    <DashboradLayout>
      <Seo
        title={
          title === 'Crear nuevo beneficiario'
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
      {/* Algo salió mal, inténtelo de nuevo o póngase en contacto con el centro de */}
      {/* apoyo y soporte en: jesielvirtualsa@gmail.com */}

      <DashboardSection
        title={
          title === 'Crear nuevo beneficiario'
            ? title
            : title + ': ' + beneficiaryId
        }
      >
        {loading && <Loading />}
        {error && 'Algo salió mal'}
        {!loading && customer && (
          <Container>
            <div className="newContainer scroll">
              <div className="bottom">
                <div className="left">
                  {customer.beneficiaryPhoto &&
                  customer.beneficiaryPhoto != 'null' ? (
                    <img
                      crossOrigin="anonymous"
                      crossorigin="anonymous"
                      src={
                        beneficiaryPhoto
                          ? URL.createObjectURL(beneficiaryPhoto)
                          : // beneficiaryPhoto
                          customer.beneficiaryPhoto && customer.beneficiaryPhoto
                          ? 'http://localhost:3001' + customer.beneficiaryPhoto
                          : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                      }
                      alt="avatar"
                    />
                  ) : (
                    <img
                      src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      alt="avatar"
                    />
                  )}
                </div>
                <div className="right">
                  <CustomerAddOrEditForm
                    customer={customer}
                    title={title}
                    isAuth={isAuth}
                    dispatch={dispatch}
                    beneficiaryId={beneficiaryId}
                    beneficiaryPhoto={beneficiaryPhoto}
                    setBeneficiaryPhoto={setBeneficiaryPhoto}
                  />
                </div>
              </div>
            </div>
          </Container>
        )}
      </DashboardSection>
    </DashboradLayout>
  )
}
