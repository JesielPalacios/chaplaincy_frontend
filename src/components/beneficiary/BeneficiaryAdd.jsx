import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../../core/hooks/useUser'
import { DashboardSection, DashboradLayout } from '../layout/Layout'
import { Seo } from '../layout/Seo'
import { AddUser, ButtonsWrapper } from './BeneficiariesList.styles'
import { Container } from './BeneficiaryAddOrEdit.styles'
import CustomerAddForm from './BeneficiaryAddForm'

export default function CustomerAdd() {
  let navigate = useNavigate()
  const [beneficiaryPhoto, setBeneficiaryPhoto] = useState()
  const { beneficiaryId } = useParams()
  const {  error, errorInfo } = useSelector(
    (state) => state.customer
  )
  const dispatch = useDispatch()
  const { isAuth } = useUser()

  // dispatch(resetCustomer())

  return (
    <DashboradLayout>
      <Seo
        title="Agregar beneficiario"
        subtitle="Formulario de nuevo beneficiario"
      />
      <ButtonsWrapper>
        <AddUser onClick={() => navigate('/beneficiarios')}>
          Ir a beneficiarios
          <PeopleAltOutlinedIcon className="productListDelete" />
        </AddUser>
      </ButtonsWrapper>

      <DashboardSection title="Agregar beneficiario">
        <Container>
          <div className="newContainer scroll">
            {error && (
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
            )}

            <div className="bottom">
              <div className="left">
                <img
                  src={
                    beneficiaryPhoto
                      ? URL.createObjectURL(beneficiaryPhoto)
                      : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                  }
                  alt="avatar"
                />
              </div>
              <div className="right">
                <CustomerAddForm
                  dispatch={dispatch}
                  title='Agregar beneficiario'
                  isAuth={isAuth}
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
