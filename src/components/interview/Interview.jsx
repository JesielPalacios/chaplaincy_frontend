import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
    let beneficiary
    let name

    customers.map((item) => {
      if (item.citizenshipNumberId === interview.beneficiary) {
        beneficiary = item

        name = (item.firstName + ' ' + item.firstSurname)
          .trim()
          .toLowerCase()
          .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
      }
    })

    return { beneficiary: beneficiary, name: name }
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
        <AddUser onClick={() => navigate('/entrevistas')}>
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
                    {setBeneficiary().beneficiary && (
                      <Link
                        className="editButton"
                        to={
                          '/beneficiarios/' + setBeneficiary().beneficiary._id
                        }
                      >
                        Ver este beneficiario
                      </Link>
                    )}
                    <h1 className="title">Beneficiario de la entrevista</h1>
                    <div className="item">
                      {setBeneficiary().beneficiary &&
                      setBeneficiary().beneficiary.beneficiaryPhoto !=
                        'null' ? (
                        <img
                          className="itemImg"
                          crossOrigin="anonymous"
                          crossorigin="anonymous"
                          src={
                            'http://localhost:3001' +
                            setBeneficiary().beneficiary.beneficiaryPhoto
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
                        <h1 className="itemTitle">{setBeneficiary().name}</h1>

                        {console.log(
                          'setBeneficiary().beneficiary',
                          setBeneficiary()
                        )}

                        {setBeneficiary().beneficiary &&
                        setBeneficiary().beneficiary.academicProgram !=
                          'null' ? (
                          <div className="detailItem">
                            <span className="itemKey">Facultad de:</span>
                            <span className="itemValue">
                              {setBeneficiary().beneficiary.academicProgram}
                            </span>
                          </div>
                        ) : (
                          ''
                        )}

                        {setBeneficiary().beneficiary &&
                        setBeneficiary().beneficiary.studentCode != 'null' ? (
                          <div className="detailItem">
                            <span className="itemKey">Código estudiantil:</span>
                            <span className="itemValue">
                              {setBeneficiary().beneficiary.studentCode}
                            </span>
                          </div>
                        ) : (
                          ''
                        )}

                        {setBeneficiary().beneficiary &&
                        setBeneficiary().beneficiary.semester != 'null' ? (
                          <div className="detailItem">
                            <span className="itemKey">
                              Semestre académico actual:
                            </span>
                            <span className="itemValue">
                              {setBeneficiary().beneficiary.semester}
                            </span>
                          </div>
                        ) : (
                          ''
                        )}

                        {setBeneficiary().beneficiary &&
                        setBeneficiary().beneficiary.email != 'null' ? (
                          <div className="detailItem">
                            <span className="itemKey">Correo:</span>
                            <span className="itemValue">
                              {setBeneficiary().beneficiary.email}
                            </span>
                          </div>
                        ) : (
                          ''
                        )}
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
                      Editar la información de la entrevista
                    </div>
                    <h1 className="title">Detalles de la entrevista</h1>
                    <div className="item">
                      <div className="details">
                        <div className="detailItem">
                          <span className="itemKey">
                            Tipo / categoría de la entrevista:
                          </span>
                          <span className="itemValue">{interview.topic}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">
                            Departamento de remisión:
                          </span>
                          <span className="itemValue">
                            {interview.referralDepartment}
                          </span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Estado de revisión:</span>
                          <span className="itemValue">{interview.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="top">
                  <div className="left">
                    <div
                      className="editButton"
                      onClick={() =>
                        navigate('/beneficiarios/' + interviewId + '/editar')
                      }
                    >
                      Editar la información de la entrevista
                    </div>
                    <h1 className="title">Descripción de la entrevista</h1>
                    <div className="item">
                      <div className="details">
                        <div className="details">
                          <div className="detailItem">
                            <span className="itemKey">
                              Detalle de la descripción
                            </span>
                            <span className="itemValue">
                              {interview.topicDescription}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="top">
                  <div className="left">
                    <div
                      className="editButton"
                      onClick={() =>
                        navigate('/beneficiarios/' + interviewId + '/editar')
                      }
                    >
                      Editar la información de la entrevista
                    </div>
                    <h1 className="title">
                      Descripción de los pasos a seguir de la entrevista
                    </h1>
                    <div className="item">
                      <div className="details">
                        <div className="details">
                          <div className="detailItem">
                            <span className="itemKey">
                              Pasos a seguir de acuerdo a la descripción:
                            </span>
                            <span className="itemValue">
                              {interview.actionsDescription}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </Container>
      </DashboardSection>
    </DashboradLayout>
  )
}
