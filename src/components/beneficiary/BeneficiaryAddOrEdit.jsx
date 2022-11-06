import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useUser } from '../../core/hooks/useUser'
import { DashboardSection, DashboradLayout } from '../layout/Layout'
import { Seo } from '../layout/Seo'
import { Link } from './Beneficiary.styles'
import { Container } from './BeneficiaryAddOrEdit.styles'
import CustomerAddOrEditForm from './BeneficiaryAddOrEditForm'
import { getCustomerService } from './beneficiaryService'
import { resetCustomer } from './beneficiarySlice'

export default function CustomerAddOrEdit({ title }) {
  const [beneficiaryPhoto, setBeneficiaryPhoto] = useState(null)
  // ('https://via.placeholder.com/520x460')
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
      <DashboardSection
        title={
          title === 'Crear nuevo beneficiario'
            ? title
            : title + ': ' + beneficiaryId
        }
      >
        <Container>
          <Link to="/beneficiarios" top="-45px" right="40px">
            Ir a beneficiarios
          </Link>

          <div className="newContainer scroll">
            <div className="bottom">
              <div className="left">
                <img
                  src={
                    beneficiaryPhoto
                      ? URL.createObjectURL(beneficiaryPhoto)
                      : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                  }
                  alt=""
                />
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
      </DashboardSection>
    </DashboradLayout>
  )
}

function FormItem({ children, id, title, important }) {
  return (
    <div className="formInput">
      <label htmlFor={id}>
        {title}

        {important && (
          <span>
            *<sup>Required</sup>
          </span>
        )}
      </label>

      {children}
    </div>
  )
}
