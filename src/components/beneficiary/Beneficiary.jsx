import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

import { useUser } from '../../core/hooks/useUser'
import Chart from '../Chart'
import { DashboardSection, DashboradLayout } from '../layout/Layout'
import { Seo } from '../layout/Seo'
import { AddUser, ButtonsWrapper, Loading } from './BeneficiariesList.styles'
import { Container } from './Beneficiary.styles'
import {
  deleteBeneficiaryService,
  getAllCustomersService,
  getCustomerService,
} from './beneficiaryService'

export default function Customer() {
  let navigate = useNavigate()
  const { beneficiaryId } = useParams()
  const dispatch = useDispatch()
  const { customer, loading, error } = useSelector((state) => state.customer)
  const { isAuth } = useUser()

  function handleDelete(id) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta acción no se podrá revertir.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--first)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar.',
      cancelButtonText: 'No, cancelar.',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteBeneficiaryService(dispatch, isAuth, id)
        getAllCustomersService(dispatch, isAuth)

        !(loading && error) &&
          Swal.fire(
            'Beneficiario eliminado',
            'El beneficiario ha sido eliminado exitosamente.',
            'success'
          )
        navigate('/beneficiarios')
      }
    })
  }

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

      <ButtonsWrapper>
        {/* <Link to="/beneficiarios" top="-45px" right="40px">
          <span className="tittle"> Ir a beneficiarios</span>
          <span className="icon">
            <ion-icon name="people-outline"></ion-icon>
          </span>
        </Link> */}
        {beneficiaryId && (
          <AddUser
            onClick={() => {
              handleDelete(beneficiaryId)
            }}
          >
            Borrar este beneficiario
            <DeleteOutlinedIcon className="productListDelete" />
          </AddUser>
        )}
        <AddUser onClick={() => navigate('/beneficiarios')}>
          Ir a beneficiarios
          <ArrowBackOutlinedIcon className="productListDelete" />
        </AddUser>
      </ButtonsWrapper>

      <DashboardSection title={'ID: ' + customer._id}>
        <Container>
          {/* <Link to="/beneficiarios">Ir a beneficiarios</Link> */}
          {/* <AddUser>Eliminar beneficiario</AddUser> */}

          {loading && <Loading />}

          <div className="scroll">
            {error && 'Something went wrong'}

            {!(loading && error) && (
              <>
                <div className="top">
                  <div className="left">
                    <h1 className="title">Información académica</h1>
                    <div className="item">
                      {customer.beneficiaryPhoto != 'null' ? (
                        <img
                          className="itemImg"
                          crossOrigin="anonymous"
                          crossorigin="anonymous"
                          src={
                            'http://localhost:3001' + customer.beneficiaryPhoto
                          }
                          alt="avatar"
                        />
                      ) : (
                        <img
                          className="itemImg"
                          src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                          alt="avatar"
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
                            {customer.firstName &&
                              customer.firstName
                                .trim()
                                .toLowerCase()
                                .replace(/\w\S*/g, (w) =>
                                  w.replace(/^\w/, (c) => c.toUpperCase())
                                )}{' '}
                            {customer.secondName &&
                            customer.secondName != 'null'
                              ? customer.secondName
                                  .trim()
                                  .toLowerCase()
                                  .replace(/\w\S*/g, (w) =>
                                    w.replace(/^\w/, (c) => c.toUpperCase())
                                  )
                              : ''}
                            {customer.firstSurname &&
                              customer.firstSurname
                                .trim()
                                .toLowerCase()
                                .replace(/\w\S*/g, (w) =>
                                  w.replace(/^\w/, (c) => c.toUpperCase())
                                )}
                            {customer.secondSurname &&
                            customer.secondSurname != 'null'
                              ? customer.secondSurname
                                  .trim()
                                  .toLowerCase()
                                  .replace(/\w\S*/g, (w) =>
                                    w.replace(/^\w/, (c) => c.toUpperCase())
                                  )
                              : ''}
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
