import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../../core/hooks/useUser'
import { getCustomerService } from './beneficiaryService'
import Chart from '../Chart'
import {
  AddUser,
  Container,
  Link,
  LoadingWrapper,
  Spinner,
} from './Beneficiary.styles'
import { DashboardSection, DashboradLayout } from '../layout/Layout'
import { Seo } from '../layout/Seo'
import { Loading } from './BeneficiariesList.styles'

export default function Customer() {
  let navigate = useNavigate()
  const { beneficiaryId } = useParams()
  const dispatch = useDispatch()
  const { customer, loading, error } = useSelector((state) => state.customer)
  const { isAuth } = useUser()

  useEffect(() => {
    getCustomerService(dispatch, isAuth, beneficiaryId)
  }, [])

  return (
    <DashboradLayout>
      <Seo
        title={(customer.firstName + ' ' + customer.firstSurname)
          .trim()
          .toLowerCase()
          .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
        subtitle="Perfil de beneficiario"
      />
      <DashboardSection title={'ID: ' + customer._id}>
        <Container>
          <Link to="/beneficiarios">Ir a beneficiarios</Link>
          <AddUser>Eliminar beneficiario</AddUser>

          {loading && <Loading />}

          <div className="scroll">
            {error && 'Something went wrong'}

            {!(loading && error) && (
              <>
                <div className="top">
                  <div className="left">
                    <h1 className="title">Información académica</h1>
                    <div className="item">
                      {/* <img
                        // src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                        src="https://via.placeholder.com/520x460"
                        alt={
                          'Imágen del usuario ' +
                          customer.firstName +
                          ' ' +
                          customer.firstSurname
                        }
                        className="itemImg"
                      /> */}
                      {customer.beneficiaryPhoto ? (
                        <img
                          crossorigin="anonymous"
                          // crossOrigin="anonymous"
                          src={
                            'http://localhost:3001' + customer.beneficiaryPhoto
                          }
                          alt={'customer image or avatar ' + customer.name}
                          className="itemImg"
                        />
                      ) : (
                        <img
                          src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                          alt={'customer image or avatar ' + customer.name}
                          className="itemImg"
                        />
                      )}
                      <div className="details">
                        <h1 className="itemTitle">
                          {(customer.firstName + ' ' + customer.firstSurname)
                            .trim()
                            .toLowerCase()
                            .replace(/\w\S*/g, (w) =>
                              w.replace(/^\w/, (c) => c.toUpperCase())
                            )}
                        </h1>
                        {customer.academicProgram && (
                          <div className="detailItem">
                            <span className="itemValue">
                              Estudiante de {customer.academicProgram}
                            {customer.profilePicture}
                            </span>
                          </div>
                        )}
                        {customer.studentCode && (
                          <div className="detailItem">
                            <span className="itemKey">Facultad de:</span>
                            <span className="itemValue">
                              {customer.academicProgram}
                            </span>
                          </div>
                        )}
                        {customer.studentCode && (
                          <div className="detailItem">
                            <span className="itemKey">Código estudiantil:</span>
                            <span className="itemValue">
                              {customer.studentCode}
                            </span>
                          </div>
                        )}
                        {customer.semester && (
                          <div className="detailItem">
                            <span className="itemKey">
                              Semestre académico actual:
                            </span>
                            <span className="itemValue">
                              {customer.semester}
                            </span>
                          </div>
                        )}
                        <div className="detailItem">
                          <span className="itemKey">Correo:</span>
                          <span className="itemValue">{customer.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="left">
                    <div
                      className="editButton"
                      onClick={() =>
                        navigate('/beneficiarios/' + beneficiaryId + '/editar')
                      }
                    >
                      Editar la información del beneficiario
                    </div>
                    <h1 className="title">Detalles personales</h1>
                    <div className="item">
                      <div className="details">
                        <div className="detailItem">
                          <span className="itemKey">Nombre completo:</span>
                          <span className="itemValue">
                            {(
                              customer.firstName +
                              ' ' +
                              customer.secondName +
                              ' ' +
                              customer.firstSurname +
                              ' ' +
                              customer.secondSurname
                            )
                              .trim()
                              .toLowerCase()
                              .replace(/\w\S*/g, (w) =>
                                w.replace(/^\w/, (c) => c.toUpperCase())
                              )}
                          </span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">
                            Tipo de documento de identidad:
                          </span>
                          <span className="itemValue">
                            {customer.typeCitizenshipNumberId}
                          </span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">
                            Número de identificación:
                          </span>
                          <span className="itemValue">
                            {customer.citizenshipNumberId}
                          </span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Dirección:</span>
                          <span className="itemValue">{customer.address}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Teléfono:</span>
                          <span className="itemValue">
                            {customer.cellPhoneNumber}
                          </span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Fecha de nacimiento:</span>
                          <span className="itemValue">
                            {customer.dateOfBirth &&
                              customer.dateOfBirth.slice(8, 10) /
                                customer.dateOfBirth.slice(6, 7) /
                                customer.dateOfBirth.slice(0, 4)}
                          </span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">País de nacimiento:</span>
                          <span className="itemValue">
                            {customer.countryOfBirth}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="right">
                  <Chart
                    aspect={3 / 1}
                    title="Cantidad de entrevistas ( Últimos 6 meses)"
                  />
                </div>
              </>
            )}
          </div>
        </Container>
      </DashboardSection>
    </DashboradLayout>
  )
}