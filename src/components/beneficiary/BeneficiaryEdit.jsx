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
import { Container as Container2 } from './Beneficiary.styles'
import BeneficiaryEditForm from './BeneficiaryEditForm'
import { getCustomerService } from './beneficiaryService'
import { resetCustomer } from './beneficiarySlice'
import { useTranslator } from '../../core/hooks/useTranslator'

export default function CustomerAddOrEdit({ title }) {
  let navigate = useNavigate()
  const [beneficiaryPhoto, setBeneficiaryPhoto] = useState()
  const { beneficiaryId } = useParams()
  const { isAuth } = useUser()
  const { translator } = useTranslator()
  const { customer, loading, error, errorInfo } = useSelector(
    (state) => state.customer
  )
  const dispatch = useDispatch()

  useEffect(() => {
    getCustomerService(dispatch, isAuth, beneficiaryId)
  }, [])

  return (
    <DashboradLayout>
      <Seo
        title={
          'Editando beneficiario: ' +
          (customer.firstName + ' ' + customer.firstSurname)
            .trim()
            .toLowerCase()
            .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
        }
        subtitle="Formulario de edición de beneficiario"
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

      <DashboardSection title={'Editando: ' + beneficiaryId}>
        <Container>
          <div className="newContainer scroll">
            {loading && <Loading />}
            {/* {error && (
              <div>
                <h2>Algo salió mal</h2>
                <p>
                  {JSON.stringify(errorInfo, null, 2)}
                  
                  {syntaxHighlight(errorInfo)}
                </p>
                </div>
            )} */}
            {/* {error && (syntaxHighlight(errorInfo))} */}
            {/* {error && syntaxHighlight(errorInfo)} */}
            {/* {error &&
                JSON.stringify(errorInfo, null, 2)
              // JSON.stringify(
              //   JSON.parse(JSON.stringify(errorInfo, undefined, 2)),
              //   null,
              //   2
              // )
              //   .replace(/{/g, '')
              //   .replace(/}/g, '')
                // 
                } */}
            {
              error && (
                <div>
                  <div className="bottom">
                    <div className="bottom">
                      <div>
                        <h6 className="itemTitle">Código del error:</h6>
                        <span>
                          {/* {translator(errorInfo.code.replace('_', ''))} */}
                          {errorInfo.code}
                        </span>
                      </div>
                    </div>
                    <div className="bottom">
                      <div>
                        <h6>Nombre del error:</h6>
                        <span>
                          {/* {translator(errorInfo.name.replace('_', ''))} */}
                          {errorInfo.name}
                        </span>
                      </div>
                    </div>
                    <div className="bottom">
                      <div>
                        <h6>Mensaje del error:</h6>
                        <span>
                          {/* {translator(errorInfo.message.replace('_', ''))} */}
                          {errorInfo.message}
                        </span>
                      </div>
                    </div>

                    <p>
                      {/* <details>
                           <summary>Section 1</summary>
                           <main>
                             <p>
                               Mauris mauris ante, blandit et, ultrices a,
                               suscipit eget, quam. Integer ut neque. Vivamus
                               nisi metus, molestie vel, gravida in, condimentum
                               sit amet, nunc. Nam a nibh. Donec suscipit eros.
                               Nam mi. Proin viverra leo ut odio. Curabitur
                               malesuada. Vestibulum a velit eu ante scelerisque
                               vulputate.
                             </p>
                           </main>
                         </details> */}

                      {/* {JSON.stringify(errorInfo, null, 2)} */}
                    </p>
                  </div>
                </div>
              )

              //
            }
            {/* Algo salió mal, inténtelo de nuevo o póngase en contacto con el centro de */}
            {/* apoyo y soporte en: jesielvirtualsa@gmail.com */}
            {/* {error && validChildrenToRender.errorHandler3} */}

            {!loading && customer && (
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
                  <BeneficiaryEditForm
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
            )}
          </div>
        </Container>
      </DashboardSection>
    </DashboradLayout>
  )
}
