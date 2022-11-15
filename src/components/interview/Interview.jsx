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
import { AddUser, ButtonsWrapper, Loading } from './InterviewList.styles'
import { Container } from './Interview.styles'
import {
  deleteInterviewService,
  getAllInterviewsService,
  getInterviewService,
} from './interviewService'

export default function Customer() {
  let navigate = useNavigate()
  const { interviewId } = useParams()
  const dispatch = useDispatch()
  const {
    interview: { interview, loading, error },
    customer: { customers },
  } = useSelector((state) => state)
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
        await deleteInterviewService(dispatch, isAuth, id)
        getAllInterviewsService(dispatch, isAuth)

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

  function setBeneficiary() {
    let name

    customers.map((item) => {
      if (item.citizenshipNumberId === interview.beneficiary)
        name = (item.firstName + ' ' + item.firstSurname)
          .trim()
          .toLowerCase()
          .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
    })

    return name
  }

  useEffect(() => {
    getInterviewService(dispatch, isAuth, interviewId)
  }, [])

  return (
    <DashboradLayout>
      <Seo
        title={(interview.firstName + ' ' + interview.firstSurname)
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
        {interviewId && (
          <AddUser
            onClick={() => {
              handleDelete(interviewId)
            }}
          >
            Borrar esta entrevista
            <DeleteOutlinedIcon className="productListDelete" />
          </AddUser>
        )}
        <AddUser onClick={() => navigate('/beneficiarios')}>
          Ir a entrevistas
          <ArrowBackOutlinedIcon className="productListDelete" />
        </AddUser>
      </ButtonsWrapper>

      <DashboardSection title={'ID: ' + interview._id}>
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
                    <h1 className="title">Beneficiario de la entrevista</h1>
                    <div className="item">
                      {interview.beneficiaryPhoto != 'null' ? (
                        <img
                          className="itemImg"
                          crossOrigin="anonymous"
                          crossorigin="anonymous"
                          src={
                            'http://localhost:3001' + interview.beneficiaryPhoto
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
                        <h1 className="itemTitle">{setBeneficiary()}</h1>
                        {interview.academicProgram && (
                          <div className="detailItem">
                            <span className="itemValue">
                              Estudiante de {interview.academicProgram}
                              {interview.profilePicture}
                            </span>
                          </div>
                        )}
                        {interview.studentCode && (
                          <div className="detailItem">
                            <span className="itemKey">Facultad de:</span>
                            <span className="itemValue">
                              {interview.academicProgram}
                            </span>
                          </div>
                        )}
                        {interview.studentCode && (
                          <div className="detailItem">
                            <span className="itemKey">Código estudiantil:</span>
                            <span className="itemValue">
                              {interview.studentCode}
                            </span>
                          </div>
                        )}
                        {interview.semester && (
                          <div className="detailItem">
                            <span className="itemKey">
                              Semestre académico actual:
                            </span>
                            <span className="itemValue">
                              {interview.semester}
                            </span>
                          </div>
                        )}
                        <div className="detailItem">
                          <span className="itemKey">Correo:</span>
                          <span className="itemValue">{interview.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="left">
                    <div
                      className="editButton"
                      onClick={() =>
                        navigate('/beneficiarios/' + interviewId + '/editar')
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
                            {interview.firstName &&
                              interview.firstName
                                .trim()
                                .toLowerCase()
                                .replace(/\w\S*/g, (w) =>
                                  w.replace(/^\w/, (c) => c.toUpperCase())
                                )}{' '}
                            {interview.secondName &&
                            interview.secondName != 'null'
                              ? interview.secondName
                                  .trim()
                                  .toLowerCase()
                                  .replace(/\w\S*/g, (w) =>
                                    w.replace(/^\w/, (c) => c.toUpperCase())
                                  )
                              : ''}
                            {interview.firstSurname &&
                              interview.firstSurname
                                .trim()
                                .toLowerCase()
                                .replace(/\w\S*/g, (w) =>
                                  w.replace(/^\w/, (c) => c.toUpperCase())
                                )}
                            {interview.secondSurname &&
                            interview.secondSurname != 'null'
                              ? interview.secondSurname
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
                            {interview.typeCitizenshipNumberId}
                          </span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">
                            Número de identificación:
                          </span>
                          <span className="itemValue">
                            {interview.citizenshipNumberId}
                          </span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Dirección:</span>
                          <span className="itemValue">{interview.address}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Teléfono:</span>
                          <span className="itemValue">
                            {interview.cellPhoneNumber}
                          </span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Fecha de nacimiento:</span>
                          <span className="itemValue">
                            {interview.dateOfBirth &&
                              interview.dateOfBirth.slice(8, 10) /
                                interview.dateOfBirth.slice(6, 7) /
                                interview.dateOfBirth.slice(0, 4)}
                          </span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">País de nacimiento:</span>
                          <span className="itemValue">
                            {interview.countryOfBirth}
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
