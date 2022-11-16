import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../../core/hooks/useUser'
import { getAllCustomersService } from '../beneficiary/beneficiaryService'
import { DashboardSection, DashboradLayout } from '../layout/Layout'
import { Seo } from '../layout/Seo'
import { Container } from './InterviewAddOrEdit.styles'
import CustomerAddOrEditForm from './InterviewAddOrEditForm'
import { AddUser, ButtonsWrapper, Loading } from './InterviewList.styles'
import { getInterviewService } from './interviewService'
import { resetInterview } from './InterviewSlice'

export default function CustomerAddOrEdit({ title }) {
  let navigate = useNavigate()
  const { interviewId } = useParams()
  const { isAuth } = useUser()
  const { interview, loading, error } = useSelector((state) => state.interview)
  let { customer } = useSelector((state) => state)
  let customerSlice = customer
  let customers = customerSlice.customers
  let loadingCustomer = customerSlice.loading
  let errorCustomer = customerSlice.error
  const dispatch = useDispatch()

  useEffect(() => {
    async function resetOldData() {
      await dispatch(resetInterview())
    }

    async function setInterview() {
      await getInterviewService(dispatch, isAuth, interviewId)
      await getAllCustomersService(dispatch, isAuth)
    }

    title === 'Agregar nueva entrevista' && resetOldData()

    title === 'Editar entrevista' && setInterview()
  }, [])

  return (
    <DashboradLayout>
      <Seo
        title={
          title === 'Agregar nueva entrevista'
            ? 'Agregar entrevista'
            : 'Actualizar entrevista'
        }
        subtitle="Formulario de nueva entrevista"
      />
      <ButtonsWrapper>
        {interviewId && (
          <AddUser onClick={() => navigate('/entrevistas/' + interviewId)}>
            Ir al perfil de detalles del beneficiario
            <PersonOutlineOutlinedIcon className="productListDelete" />
          </AddUser>
        )}
        <AddUser onClick={() => navigate('/entrevistas')}>
          Ir a entrevistas
          <PeopleAltOutlinedIcon className="productListDelete" />
        </AddUser>
      </ButtonsWrapper>

      <DashboardSection
        title={
          title === 'Agregar nueva entrevista'
            ? title
            : title + ': ' + interviewId
        }
      >
        <Container>
          <div className="newContainer scroll">
            {loading && <Loading />}

            {error && 'Algo salió mal'}

            {!(loading && error && loadingCustomer && errorCustomer) && (
              <div className="bottom">
                {/* <div className="left"></div> */}
                <div className="right">
                  <CustomerAddOrEditForm
                    interview={interview}
                    title={title}
                    isAuth={isAuth}
                    dispatch={dispatch}
                    interviewId={interviewId}
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
