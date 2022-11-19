import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useUser } from '../../core/hooks/useUser'
import Chart from '../Dashboard/chart/Chart'
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
  const { customer } = useSelector((state) => state)
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

        !(customer.loading && customer.error) &&
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
    if (customer.customer === undefined) navigate('/beneficiarios/')
    console.log('beneficiaryId', beneficiaryId)

    getCustomerService(dispatch, isAuth, beneficiaryId)
  }, [])

  return (
    <DashboradLayout>
      <Seo
        title={(
          customer.customer.firstName +
          ' ' +
          customer.customer.firstSurname
        )
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

      <DashboardSection title={'ID: ' + customer.customer._id}>
        <Container>
          {/* <Link to="/beneficiarios">Ir a beneficiarios</Link> */}
          {/* <AddUser>Eliminar beneficiario</AddUser> */}

          {customer.loading && <Loading />}

          <div className="scroll">
            {customer.error && 'Something went wrong'}

            {!(customer.loading && customer.error) && (
              <>
                <div className="top">
                  <div className="left">
                    <h1 className="title">Información académica</h1>
                    <div className="item">
                      {customer.customer.beneficiaryPhoto != 'undefined' ? (
                        <img
                          className="itemImg"
                          crossOrigin="anonymous"
                          crossorigin="anonymous"
                          src={
                            'http://localhost:3001' +
                            customer.customer.beneficiaryPhoto
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
                          {(
                            customer.customer.firstName +
                            ' ' +
                            customer.customer.firstSurname
                          )
                            .trim()
                            .toLowerCase()
                            .replace(/\w\S*/g, (w) =>
                              w.replace(/^\w/, (c) => c.toUpperCase())
                            )}
                        </h1>
                        <div className="detailItem">
                          <span className="itemKey">Tipo de beneficiario:</span>
                          <span className="itemValue">
                            {customer.customer.categoryOrTypeOfOcupation &&
                              customer.customer.categoryOrTypeOfOcupation}
                          </span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Género:</span>
                          <span className="itemValue">
                            {customer.customer.gender &&
                              customer.customer.gender}
                          </span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Estado civil:</span>
                          <span className="itemValue">
                            {customer.customer.maritalStatus &&
                              customer.customer.maritalStatus}
                          </span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Estrato social:</span>
                          <span className="itemValue">
                            {customer.customer.socialStratum &&
                              customer.customer.socialStratum}
                          </span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Religión:</span>
                          <span className="itemValue">
                            {customer.customer.religion &&
                              customer.customer.religion}
                          </span>
                        </div>
                        {customer.customer.academicProgram && (
                          <div className="detailItem">
                            <span className="itemValue">
                              {customer.customer.academicProgram !=
                                'No aplica' &&
                                'Estudiante de ' +
                                  customer.customer.academicProgram}
                              {customer.customer.profilePicture}
                            </span>
                          </div>
                        )}
                        {customer.customer.academicProgram != 'No aplica' && (
                          <div className="detailItem">
                            <span className="itemKey">Facultad de:</span>
                            <span className="itemValue">
                              {customer.customer.academicProgram}
                            </span>
                          </div>
                        )}
                        {customer.customer.studentCode != 'undefined' && (
                          <div className="detailItem">
                            <span className="itemKey">Código estudiantil:</span>
                            <span className="itemValue">
                              {customer.customer.studentCode}
                            </span>
                          </div>
                        )}
                        {customer.customer.semester != 'No aplica' && (
                          <div className="detailItem">
                            <span className="itemKey">
                              Semestre académico actual:
                            </span>
                            <span className="itemValue">
                              {customer.customer.semester}
                            </span>
                          </div>
                        )}
                        {customer.customer.email != 'undefined' && (
                          <div className="detailItem">
                            <span className="itemKey">Correo:</span>
                            <span className="itemValue">
                              {customer.customer.email}
                            </span>
                          </div>
                        )}
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
                            {customer.customer.firstName &&
                              customer.customer.firstName
                                .trim()
                                .toLowerCase()
                                .replace(/\w\S*/g, (w) =>
                                  w.replace(/^\w/, (c) => c.toUpperCase())
                                )}{' '}
                            {customer.customer.secondName &&
                            customer.customer.secondName != 'undefined'
                              ? customer.customer.secondName
                                  .trim()
                                  .toLowerCase()
                                  .replace(/\w\S*/g, (w) =>
                                    w.replace(/^\w/, (c) => c.toUpperCase())
                                  )
                              : ''}{' '}
                            {customer.customer.firstSurname &&
                              customer.customer.firstSurname
                                .trim()
                                .toLowerCase()
                                .replace(/\w\S*/g, (w) =>
                                  w.replace(/^\w/, (c) => c.toUpperCase())
                                )}{' '}
                            {customer.customer.secondSurname &&
                            customer.customer.secondSurname != 'undefined'
                              ? customer.customer.secondSurname
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
                            {customer.customer.typeCitizenshipNumberId}
                          </span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">
                            Número de identificación:
                          </span>
                          <span className="itemValue">
                            {customer.customer.citizenshipNumberId}
                          </span>
                        </div>

                        {customer.customer.address != 'undefined' && (
                          <div className="detailItem">
                            <span className="itemKey">Dirección:</span>
                            <span className="itemValue">
                              {customer.customer.address}
                            </span>
                          </div>
                        )}

                        {customer.customer.cellPhoneNumber != 'undefined' && (
                          <div className="detailItem">
                            <span className="itemKey">Teléfono:</span>
                            <span className="itemValue">
                              {customer.customer.cellPhoneNumber}
                            </span>
                          </div>
                        )}

                        <div className="detailItem">
                          <span className="itemKey">Fecha de nacimiento:</span>
                          <span className="itemValue">
                            {customer.customer.birthDate &&
                              // customer.customer.birthDate.slice(8, 10) /
                              //   customer.customer.birthDate.slice(6, 7) /
                              //   customer.customer.birthDate.slice(0, 4)
                              // ----------------------------------
                              customer.customer.birthDate.slice(8, 10) +
                                ' - ' +
                                customer.customer.birthDate.slice(5, 7) +
                                ' - ' +
                                customer.customer.birthDate.slice(0, 4)}
                          </span>
                        </div>

                        <div className="detailItem">
                          <span className="itemKey">País de nacimiento:</span>
                          <span className="itemValue">
                            {customer.customer.birthCountry}
                          </span>
                        </div>

                        <div className="detailItem">
                          <span className="itemKey">
                            Departamento de nacimiento:
                          </span>
                          <span className="itemValue">
                            {customer.customer.birthDepartment}
                          </span>
                        </div>

                        <div className="detailItem">
                          <span className="itemKey">Ciudad de nacimiento:</span>
                          <span className="itemValue">
                            {customer.customer.birthCity}
                          </span>
                        </div>
                        {/*  */}
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
