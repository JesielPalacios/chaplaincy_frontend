import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import PostAddIcon from '@mui/icons-material/PostAdd'
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined'
import html2canvas from 'html2canvas'
import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { DarkModeContext } from '../../core/context/darkModeContext'
import { useUser } from '../../core/hooks/useUser'
import { getAllUsersService } from '../../services/user.service'
import {
  AddUser,
  ButtonsWrapper,
  Container,
} from '../beneficiary/BeneficiariesList.styles'
import {
  getAllCustomersService,
  getBeneficiaryStatsService,
} from '../beneficiary/beneficiaryService'
import {
  getAllInterviewsService,
  getInterviewStatsService,
  getLatestInterviewsService,
} from '../interview/interviewService'
import { DashboardSection, DashboradLayout } from '../layout/Layout'
import { Seo } from '../layout/Seo'
import Chart from './chart/Chart'
import Featured from './featured/Featured'
import './home.scss'
import { List as Table } from './table/Table'
import Widget from './widget/Widget'

export function exportImage() {
  // html2canvas(document.querySelector('#plantList')).then((canvas) => {
  //   var img = canvas.toDataURL('image/png')
  //   var link = document.createElement('a')
  //   link.download = 'export.png'
  //   link.href = img
  //   link.click()
  // })

  html2canvas(document.body).then((canvas) => {
    // html2canvas(document.querySelector('#plantList')).then((canvas) => {
    // html2canvas(document.getElementById("plantsList")).then((canvas) => {
    let img = canvas.toDataURL('image/png')
    let link = document.createElement('a')
    link.download = 'export.png'
    link.href = img
    link.click()
    link.remove()
  })
}

const Dashboard = () => {
  let navigate = useNavigate()
  const { isAuth } = useUser()
  const { darkMode } = useContext(DarkModeContext)
  const { customer, interview, user } = useSelector((state) => state)

  const dispatch = useDispatch()

  let date = new Date()

  function findByCategoryFilter(stats, descriptionProcess) {
    let counter = 0

    descriptionProcess.counter &&
      stats &&
      stats.map((item) => {
        if (item._id != descriptionProcess.description) {
          counter += item.count
        }
      })

    !descriptionProcess.counter &&
      stats &&
      stats.map((item) => {
        if (item._id === descriptionProcess.description) {
          counter += item.count
        }
      })

    return counter
  }

  function setInterviewsPerStatus() {
    let completedInterviews = 0
    let pendingInterviews = 0
    let canceledInterviews = 0
    let interviewsCounter = 0

    interview.stats.interviewsPerStatus &&
      interview.stats.interviewsPerStatus.map((item) => {
        if (item._id === 'Completada') {
          completedInterviews += item.count
        } else if (item._id === 'Pendiente') {
          pendingInterviews += item.count
        } else if (item._id === 'Cancelada') {
          canceledInterviews += item.count
        }
        interviewsCounter += item.count
      })

    return {
      interviewsCounter,
      completedInterviews,
      pendingInterviews,
      canceledInterviews,
    }
  }

  function setInterviewsPerMonth() {
    const yearMontsNameAndTotalValues = [
      // { name: 'January', Total: 1200 },
      // { name: 'February', Total: 2100 },
      // { name: 'March', Total: 800 },
      // { name: 'April', Total: 1600 },
      // { name: 'May', Total: 900 },
      // { name: 'June', Total: 1700 },
      { number: 1, name: 'Enero', Total: 0 },
      { number: 2, name: 'Febrero', Total: 0 },
      { number: 3, name: 'Marzo', Total: 0 },
      { number: 4, name: 'Abril', Total: 0 },
      { number: 5, name: 'Mayo', Total: 0 },
      { number: 6, name: 'Junio', Total: 0 },
      { number: 7, name: 'Julio', Total: 0 },
      { number: 8, name: 'Agosto', Total: 0 },
      { number: 9, name: 'Septiembre', Total: 0 },
      { number: 10, name: 'Octubre', Total: 0 },
      { number: 11, name: 'Noviembre', Total: 0 },
      { number: 12, name: 'Diciembre', Total: 0 },
    ]
    const secondSemester = [
      { number: 1, name: 'Enero', Total: 0 },
      { number: 2, name: 'Febrero', Total: 0 },
      { number: 3, name: 'Marzo', Total: 0 },
      { number: 4, name: 'Abril', Total: 0 },
      { number: 5, name: 'Mayo', Total: 0 },
      { number: 6, name: 'Junio', Total: 0 },
    ]
    const firstSemester = [
      { number: 7, name: 'Julio', Total: 0 },
      { number: 8, name: 'Agosto', Total: 0 },
      { number: 9, name: 'Septiembre', Total: 0 },
      { number: 10, name: 'Octubre', Total: 0 },
      { number: 11, name: 'Noviembre', Total: 0 },
      { number: 12, name: 'Diciembre', Total: 0 },
    ]

    let parsedData = []

    interview.stats.createdPerMonth &&
      interview.stats.createdPerMonth.map((item) => {
        yearMontsNameAndTotalValues.map((month) => {
          if (item._id === month.number) {
            yearMontsNameAndTotalValues[month.number - 1].Total = item.count
          }
        })
      })

    yearMontsNameAndTotalValues.map((item) => {
      parsedData.push({
        name: item.name,
        Total: item.Total,
      })
    })

    return parsedData
  }

  const firstSemester = [
    { number: 1, name: 'Enero', Total: 0 },
    { number: 2, name: 'Febrero', Total: 0 },
    { number: 3, name: 'Marzo', Total: 0 },
    { number: 4, name: 'Abril', Total: 0 },
    { number: 5, name: 'Mayo', Total: 0 },
    { number: 6, name: 'Junio', Total: 0 },
  ]
  const secondSemester = [
    { number: 7, name: 'Julio', Total: 0 },
    { number: 8, name: 'Agosto', Total: 0 },
    { number: 9, name: 'Septiembre', Total: 0 },
    { number: 10, name: 'Octubre', Total: 0 },
    { number: 11, name: 'Noviembre', Total: 0 },
    { number: 12, name: 'Diciembre', Total: 0 },
  ]
  const firstAndSecondSemester = [
    { number: 1, name: 'Enero', Total: 0 },
    { number: 2, name: 'Febrero', Total: 0 },
    { number: 3, name: 'Marzo', Total: 0 },
    { number: 4, name: 'Abril', Total: 0 },
    { number: 5, name: 'Mayo', Total: 0 },
    { number: 6, name: 'Junio', Total: 0 },
    { number: 7, name: 'Julio', Total: 0 },
    { number: 8, name: 'Agosto', Total: 0 },
    { number: 9, name: 'Septiembre', Total: 0 },
    { number: 10, name: 'Octubre', Total: 0 },
    { number: 11, name: 'Noviembre', Total: 0 },
    { number: 12, name: 'Diciembre', Total: 0 },
  ]

  function setInterviewsPerMonthInSemester(infoMonths, monthStats) {
    let parsedData = []
    let months = infoMonths

    monthStats &&
      monthStats.map((item) => {
        infoMonths.map((month) => {
          if (item._id === month.number) {
            infoMonths[
              infoMonths.findIndex((object) => {
                return object.number === month.number
              })
            ].Total = item.count
          }
        })
      })

    months.map((item) => {
      parsedData.push({
        name: item.name,
        Total: item.Total,
      })
    })

    return parsedData
  }

  function checkIfInterviews() {
    const {
      completedInterviews,
      pendingInterviews,
      canceledInterviews,
      interviewsCounter,
    } = setInterviewsPerStatus()

    if (
      completedInterviews === 0 &&
      pendingInterviews === 0 &&
      canceledInterviews === 0 &&
      interviewsCounter === 0
    ) {
      // console.log('interviewsCounter', interviewsCounter)
      return interviewsCounter
    } else {
      return (
        (completedInterviews * 100) / (interviewsCounter - canceledInterviews)
      )
    }
  }

  const widgets = [
    {
      widgetTitle: 'Beneficiarios',
      counter: customer.customers.length,
      link: '/beneficiarios',
      linkLabel: 'Ver todos los beneficiarios',
      icon: (
        <PersonOutlinedIcon
          className="icon"
          //   color: 'crimson',
          //   backgroundColor: 'rgba(255, 0, 0, 0.2)',
          // --------------------------------------------
          // backgroundColor: 'rgba(128, 0, 128, 0.2)',
          // color: 'purple',
          // --------------------------------------------
          style={{
            color: 'blue',
            backgroundColor: 'rgba(0, 115, 255, 0.2)',
          }}
        />
      ),
    },

    {
      widgetTitle: 'Entrevistas',
      counter: interview.interviews.length,
      link: '/entrevistas',
      linkLabel: 'Ver todas las entrevistas',
      icon: (
        <AccountBalanceWalletOutlinedIcon
          className="icon"
          style={{
            backgroundColor: 'rgba(218, 165, 32, 0.2)',
            color: 'goldenrod',
          }}
        />
      ),
    },

    {
      widgetTitle: 'Remisiones',
      counter: findByCategoryFilter(
        interview.stats.interviewsPerReferralDepartment,
        { counter: true, description: 'No necesita remisi??n' }
      ),
      link: '/entrevistas',
      linkLabel: 'Ver todas las entrevistas',
      percentage:
        interview.interviews.length === 0
          ? 0
          : (findByCategoryFilter(
              interview.stats.interviewsPerReferralDepartment,
              {
                counter: true,
                description: 'No necesita remisi??n',
              }
            ) *
              100) /
            interview.interviews.length,
      icon: (
        <AccountBalanceWalletOutlinedIcon
          className="icon"
          style={{
            backgroundColor: 'rgba(0, 128, 0, 0.2)',
            color: 'green',
          }}
        />
      ),
    },

    {
      widgetTitle: 'Administradores',
      counter: user.users.length === 0 ? 0 : user.users.length,
      link: '/administradores',
      linkLabel: 'Ver todos los administradores',
      icon: (
        <AccountBalanceWalletOutlinedIcon
          className="icon"
          style={{
            backgroundColor: 'rgba(128, 0, 128, 0.2)',
            color: 'purple',
          }}
        />
      ),
    },
  ]

  const widgets2 = [
    {
      widgetTitle: 'Entrevistas completadas',
      counter: setInterviewsPerStatus().completedInterviews,
      link: '/entrevistas',
      linkLabel: 'Ver todas las entrevistas',
      percentage:
        setInterviewsPerStatus().completedInterviews === 0
          ? 0
          : (setInterviewsPerStatus().completedInterviews * 100) /
            interview.interviews.length,
      icon: (
        <AccountBalanceWalletOutlinedIcon
          className="icon"
          style={{
            backgroundColor: 'rgba(0, 128, 0, 0.2)',
            color: 'green',
          }}
        />
      ),
    },

    {
      widgetTitle: 'Entrevistas pendientes',
      counter: setInterviewsPerStatus().pendingInterviews,
      link: '/entrevistas',
      linkLabel: 'Ver todas las entrevistas',
      percentage:
        setInterviewsPerStatus().pendingInterviews === 0
          ? 0
          : (setInterviewsPerStatus().pendingInterviews * 100) /
            interview.interviews.length,
      icon: (
        <AccountBalanceWalletOutlinedIcon
          className="icon"
          style={{
            backgroundColor: 'rgba(0, 128, 0, 0.2)',
            color: 'green',
          }}
        />
      ),
    },

    {
      widgetTitle: 'Entrevistas canceladas',
      counter: setInterviewsPerStatus().canceledInterviews,
      link: '/entrevistas',
      linkLabel: 'Ver todas las entrevistas',
      percentage:
        setInterviewsPerStatus().canceledInterviews === 0
          ? 0
          : (setInterviewsPerStatus().canceledInterviews * 100) /
            interview.interviews.length,
      icon: (
        <AccountBalanceWalletOutlinedIcon
          className="icon"
          style={{
            backgroundColor: 'rgba(0, 128, 0, 0.2)',
            color: 'green',
          }}
        />
      ),
    },
    {
      widgetTitle: 'Entrevistas sin remisi??n a otros departamentos',
      counter: Math.abs(
        findByCategoryFilter(interview.stats.interviewsPerReferralDepartment, {
          counter: true,
          description: 'No necesita remisi??n',
        }) - interview.interviews.length
      ),
      link: '/entrevistas',
      linkLabel: 'Ver todas las entrevistas',
      percentage: Math.abs(
        setInterviewsPerStatus().completedInterviews === 0
          ? 0
          : ((findByCategoryFilter(
              interview.stats.interviewsPerReferralDepartment,
              { counter: true, description: 'No necesita remisi??n' }
            ) -
              interview.interviews.length) *
              100) /
              interview.interviews.length
      ),
      icon: (
        <AccountBalanceWalletOutlinedIcon
          className="icon"
          style={{
            backgroundColor: 'rgba(0, 128, 0, 0.2)',
            color: 'green',
          }}
        />
      ),
    },
  ]

  const widgets3 = [
    {
      widgetTitle: 'Estudiantes de la UNAC',
      counter: findByCategoryFilter(customer.stats.categoryOrTypeOfOcupation, {
        counter: false,
        description: 'Estudiante de la UNAC',
      }),
      link: '/beneficiarios',
      linkLabel: 'Ver todos los beneficiarios',
      percentage:
        findByCategoryFilter(customer.stats.categoryOrTypeOfOcupation, {
          counter: false,
          description: 'Estudiante de la UNAC',
        }) === 0
          ? 0
          : (findByCategoryFilter(customer.stats.categoryOrTypeOfOcupation, {
              counter: false,
              description: 'Estudiante de la UNAC',
            }) *
              100) /
            customer.customers.length,
      icon: (
        <AccountBalanceWalletOutlinedIcon
          className="icon"
          style={{
            backgroundColor: 'rgba(0, 128, 0, 0.2)',
            color: 'green',
          }}
        />
      ),
    },

    {
      widgetTitle: 'Miembros de la IASD',
      counter: findByCategoryFilter(customer.stats.religion, {
        counter: false,
        description: 'Cristiano',
      }),
      link: '/beneficiarios',
      linkLabel: 'Ver todos los beneficiarios',
      percentage:
        findByCategoryFilter(customer.stats.religion, {
          counter: false,
          description: 'Cristiano',
        }) === 0
          ? 0
          : (findByCategoryFilter(customer.stats.religion, {
              counter: false,
              description: 'Cristiano',
            }) *
              100) /
            customer.customers.length,
      icon: (
        <AccountBalanceWalletOutlinedIcon
          className="icon"
          style={{
            backgroundColor: 'rgba(0, 128, 0, 0.2)',
            color: 'green',
          }}
        />
      ),
    },
    {
      widgetTitle: 'Registrados este mes',
      counter: findByCategoryFilter(customer.stats.createdPerMonth, {
        counter: false,
        description: date.getMonth() + 1,
      }),
      link: '/beneficiarios',
      linkLabel: 'Ver todos los beneficiarios',
      percentage:
        findByCategoryFilter(customer.stats.createdPerMonth, {
          counter: false,
          description: date.getMonth() + 1,
        }) === 0
          ? 0
          : (findByCategoryFilter(customer.stats.createdPerMonth, {
              counter: false,
              description: date.getMonth() + 1,
            }) *
              100) /
            customer.customers.length,
      icon: (
        <AccountBalanceWalletOutlinedIcon
          className="icon"
          style={{
            backgroundColor: 'rgba(0, 128, 0, 0.2)',
            color: 'green',
          }}
        />
      ),
    },
    {
      widgetTitle: 'Registrados este a??o',
      counter: findByCategoryFilter(customer.stats.createdPerYear, {
        description: date.getFullYear(),
      }),
      link: '/beneficiarios',
      linkLabel: 'Ver todos los beneficiarios',
      percentage:
        findByCategoryFilter(customer.stats.createdPerYear, {
          description: date.getFullYear(),
        }) === 0
          ? 0
          : (findByCategoryFilter(customer.stats.createdPerYear, {
              description: date.getFullYear(),
            }) *
              100) /
            customer.customers.length,
      icon: (
        <AccountBalanceWalletOutlinedIcon
          className="icon"
          style={{
            backgroundColor: 'rgba(0, 128, 0, 0.2)',
            color: 'green',
          }}
        />
      ),
    },
  ]

  const interviewswStats = [
    {
      title: 'Por tipo',
      stats: interview.stats.interviewsPerTopic,
    },
    {
      title: 'Por departamento de remisi??n',
      stats: interview.stats.interviewsPerReferralDepartment,
    },
    {
      title: 'Por estado de entrevista',
      stats: interview.stats.interviewsPerStatus,
    },
    {
      title: 'Por a??o de creaci??n',
      stats: interview.stats.createdPerYear,
    },
  ]

  const beneficiariesStats = [
    {
      title: 'Por tipo de g??nero',
      stats: customer.stats.gender,
    },
    {
      title: 'Por tipo de documento de identificaci??n',
      stats: customer.stats.typeCitizenshipNumberId,
    },
    {
      title: 'Por tipo de programa acad??mico',
      stats: customer.stats.academicProgram,
    },
    {
      title: 'Por n??mero de semestre acad??mico',
      stats: customer.stats.semester,
    },
    {
      title: 'Por pa??s de or??gen',
      stats: customer.stats.birthCountry,
    },
    {
      title: 'Por departamento de or??gen',
      stats: customer.stats.birthDepartment,
    },
    {
      title: 'Por ciudad de or??gen',
      stats: customer.stats.birthCity,
    },
    {
      title: 'Por estado civil',
      stats: customer.stats.maritalStatus,
    },
    {
      title: 'Por estrato social',
      stats: customer.stats.socialStratum,
    },
    {
      title: 'Por religi??n',
      stats: customer.stats.religion,
    },
    {
      title: 'Por tipo de beneficiario',
      stats: customer.stats.categoryOrTypeOfOcupation,
    },
  ]

  const interviewsCharts = [
    {
      title: 'Entrevistas creadas los primeros 6 meses del a??o',
      data: setInterviewsPerMonthInSemester(
        firstSemester,
        interview.stats.createdPerMonth
      ),
    },
    {
      title: 'Entrevistas creadas los ??ltimos 6 meses del a??o"',
      data: setInterviewsPerMonthInSemester(
        secondSemester,
        interview.stats.createdPerMonth
      ),
    },
  ]

  const beneficiariesCharts = [
    {
      title: 'Beneficiarios creados los primeros 6 meses del a??o',
      data: setInterviewsPerMonthInSemester(
        firstSemester,
        customer.stats.createdPerMonth
      ),
    },
    {
      title: 'Beneficiarios creados los ??ltimos 6 meses del a??o',
      data: setInterviewsPerMonthInSemester(
        secondSemester,
        customer.stats.createdPerMonth
      ),
    },
  ]

  function handleUpdate() {
    Swal.fire({
      title: 'Actualizar dashboard',
      text: '??Est?? seguro que quiere actualizar el dashboard?',
      icon: 'warning',
      showCancelButton: true,
      // confirmButtonColor: '#0f1141',
      confirmButtonColor: 'var(--first)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'S??, actualizar.',
      cancelButtonText: 'No, cancelar.',
    }).then((result) => {
      if (result.isConfirmed) {
        let timerInterval
        Swal.fire({
          title: 'Cargando..!',
          html: 'Trallendo toda la informaci??n, no te preocupes, s??lo tarda un momento',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          },
        }).then((result) => {
          getAllCustomersService(dispatch, isAuth)
          getAllInterviewsService(dispatch, isAuth)
          getInterviewStatsService(dispatch, isAuth)
          getAllUsersService(dispatch, isAuth)
          getLatestInterviewsService(dispatch, isAuth)

          getInterviewStatsService(dispatch, isAuth)
          getBeneficiaryStatsService(dispatch, isAuth)
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            // console.log('I was closed by the timer')
          }
        })

        // !error && Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
      }
    })
  }

  useEffect(() => {
    getAllCustomersService(dispatch, isAuth)
    getAllInterviewsService(dispatch, isAuth)
    getInterviewStatsService(dispatch, isAuth)
    getAllUsersService(dispatch, isAuth)
    getLatestInterviewsService(dispatch, isAuth)

    getInterviewStatsService(dispatch, isAuth)
    getBeneficiaryStatsService(dispatch, isAuth)
  }, [])

  return (
    <DashboradLayout className={darkMode ? 'app dark' : 'app ligth'}>
      <Seo
        title="Dashboard (Panel de control)"
        subtitle="Dashboard (Panel de control)"
      />
      <ButtonsWrapper>
        <AddUser onClick={exportImage}>
          Imprimir
          <PrintOutlinedIcon className="productListDelete" />
        </AddUser>
        <AddUser onClick={handleUpdate}>
          Actualizar estad??sticas
          <CachedOutlinedIcon className="productListDelete" />
        </AddUser>
        <AddUser onClick={() => navigate('/beneficiarios/nuevo')}>
          Crear nuevo beneficiario
          <PersonAddAltOutlinedIcon className="productListDelete" />
        </AddUser>

        <AddUser AddUser onClick={() => navigate('/entrevistas/agregar')}>
          Crear nueva entrevista
          <PostAddIcon className="productListDelete" />
        </AddUser>
      </ButtonsWrapper>

      <DashboardSection title="Panel de control">
        <Container>
          <div className="scroll ">
            <div className=" home">
              <div className="homeContainer">
                <div className="widgets">
                  {widgets.map((item) => (
                    <Widget
                      key={item.widgetTitle}
                      darkMode={darkMode}
                      widgetTitle={item.widgetTitle}
                      counter={item.counter}
                      link={item.link}
                      linkLabel={item.linkLabel}
                      percentage={item.percentage}
                      icon={item.icon}
                    />
                  ))}
                </div>
                <div className="charts">
                  <Featured
                    darkMode={darkMode}
                    setInterviewsPerStatus={setInterviewsPerStatus()}
                  />
                  {/* <Chart
                    darkMode={darkMode}
                    title="Entrevistas de los ??ltimos 6 meses del a??o"
                    aspect={2 / 1}
                    data={setInterviewsPerMonthInSemester(
                      secondSemester,
                      interview.stats.createdPerMonth
                    )}
                    flex={4}
                  /> */}

                  {/* {console.log(
                    'interview.stats.createdPerMonth',
                    interview.stats.createdPerMonth
                  )}
                  {console.log(
                    setInterviewsPerMonthInSemester(
                      secondSemester,
                      interview.stats.createdPerMonth
                    )
                  )} */}

                  {interviewsCharts.map((item, index) => {
                    if (index === 1) {
                      return (
                        <Chart
                          darkMode={darkMode}
                          title={item.title}
                          aspect={2 / 1}
                          data={item.data}
                          flex={4}
                        />
                      )
                    }
                  })}
                </div>
                <div
                  className={
                    darkMode
                      ? 'listContainer  border app dark'
                      : 'listContainer border app light'
                  }
                >
                  <div className="listTitle">??ltimas entrevistas</div>
                  <Table
                    interviews={interview.latestInterviews}
                    customers={customer.customers}
                    users={user.users}
                  />
                </div>
                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}

                {/* <div className="top">
                  <div className="left">
                    <h1 className="title">Beneficiario de la entrevista</h1>
                    <div className="details">
                      kjmnbghjmnb
                      <div className="details">
                        <h1 className="itemTitle2">sdfgb vfgb vfgv</h1>
                        dcfgbhnbvgbfhb
                        <div className="detailItem">
                          <span className="itemKey">C??digo estudiantil:</span>
                          <span className="itemValue">sdvsdvsdvs</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">C??digo estudiantil:</span>
                          <span className="itemValue">sdvsdvsdvs</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">C??digo estudiantil:</span>
                          <span className="itemValue">sdvsdvsdvs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="charts">
                  <div
                    style={{
                      display: 'flex',
                      display: 'grid',
                      flexWrap: 'wrap',
                      gap: '10px',
                      marginBottom: '5px',
                      gridTemplateColumns: '3fr 1fr',
                    }}
                  >
                    <Chart
                      darkMode={darkMode}
                      title="Entrevistas creadas a lo largo del ??ltimo a??o"
                      aspect={2 / 1}
                      data={setInterviewsPerMonthInSemester(
                        firstAndSecondSemester,
                        interview.stats.createdPerMonth
                      )}
                    />
                    <div>
                      <div
                        className="widgets"
                        style={{
                          display: 'flex',
                          display: 'grid',
                          flexWrap: 'nowrap',
                          flexDirection: 'column',
                          gap: '10px',
                          marginBottom: '5px',
                          gridTemplateColumns: '1fr',
                        }}
                      >
                        {widgets2.map((item) => (
                          <Widget
                            key={item.widgetTitle}
                            darkMode={darkMode}
                            widgetTitle={item.widgetTitle}
                            counter={item.counter}
                            link={item.link}
                            linkLabel={item.linkLabel}
                            percentage={item.percentage}
                            icon={item.icon}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="charts"
                  style={{
                    display: 'flex',
                    display: 'grid',
                    flexWrap: 'nowrap',
                    flexDirection: 'column',
                    gap: '10px',
                    marginBottom: '5px',
                    gridTemplateColumns: '1fr 1fr',
                  }}
                >
                  {interviewsCharts.map((item) => (
                    <Chart
                      darkMode={darkMode}
                      title={item.title}
                      aspect={2 / 1}
                      data={item.data}
                    />
                  ))}
                </div>

                <div className="charts">
                  <div
                    className={
                      darkMode
                        ? 'featured border app dark'
                        : 'featured border app light'
                    }
                  >
                    {' '}
                    <div className="top">
                      <h1 className="title">
                        Estad??sticas generales de las entrevistas
                      </h1>
                    </div>
                    {interview.interviews.length === 0 ? (
                      <div className="bottom">
                        <p className="title">
                          Actualmente no hay entrevistas creadas, por lo que no
                          hay estad??sticas de las mismas que mostrar.
                        </p>
                      </div>
                    ) : (
                      <div className="bottom">
                        <p className="title">
                          Entrevistas por tipo de departamento de remisi??n,
                          tipo/categor??a o tema, capell??n y/o a??o. Es importate
                          tener en cuenta que las categor??as o filtros que no
                          aparecen es porque no tienen informaci??n, es decir,
                          todav??a no hay entrevistas con esas categor??as.
                        </p>
                        {/* <p className="amount">{pendingInterviews}</p> */}
                        <div className="stats">
                          {interviewswStats.map((item) => (
                            <div className="summary">
                              <div className="details">
                                <div className="itemTitle2">{item.title}:</div>
                                {item.stats &&
                                  item.stats.map((item, index) => (
                                    <div className="itemResult" key={index}>
                                      <div className="resultAmount">
                                        {item._id}: {item.count}, con un
                                        porcentaje del{' '}
                                        {Math.round(
                                          (item.count * 100) /
                                            setInterviewsPerStatus()
                                              .interviewsCounter
                                        )}
                                        %
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}

                {/* <div className="charts">
                  <div
                    style={{
                      display: 'flex',
                      display: 'grid',
                      flexWrap: 'wrap',
                      gap: '10px',
                      marginBottom: '5px',
                      gridTemplateColumns: '3fr 1fr',
                    }}
                  >
                    <Chart
                      darkMode={darkMode}
                      title="Beneficiarios creados a lo largo del ??ltimo a??o"
                      aspect={2 / 1}
                      data={setInterviewsPerMonthInSemester(
                        firstAndSecondSemester,
                        customer.stats.createdPerMonth
                      )}
                    />
                    <div>
                      <div
                        className="widgets"
                        style={{
                          display: 'flex',
                          display: 'grid',
                          flexWrap: 'nowrap',
                          flexDirection: 'column',
                          gap: '10px',
                          marginBottom: '5px',
                          gridTemplateColumns: '1fr',
                        }}
                      >
                        {widgets3.map((item) => (
                          <Widget
                            key={item.widgetTitle}
                            darkMode={darkMode}
                            widgetTitle={item.widgetTitle}
                            counter={item.counter}
                            link={item.link}
                            linkLabel={item.linkLabel}
                            percentage={item.percentage}
                            icon={item.icon}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="charts">
                  <div
                    style={{
                      display: 'flex',
                      display: 'grid',
                      flexWrap: 'wrap',
                      gap: '10px',
                      marginBottom: '5px',
                      gridTemplateColumns: '4fr 1fr',
                    }}
                  >
                    <Chart
                      darkMode={darkMode}
                      title="Beneficiarios creados a lo largo del ??ltimo a??o"
                      aspect={2 / 1}
                      data={setInterviewsPerMonthInSemester(
                        firstAndSecondSemester,
                        customer.stats.createdPerMonth
                      )}
                    />
                    <div>
                      <div
                        className="widgets"
                        style={{
                          display: 'flex',
                          display: 'grid',
                          flexWrap: 'nowrap',
                          flexDirection: 'column',
                          gap: '10px',
                          marginBottom: '5px',
                          gridTemplateColumns: '1fr',
                        }}
                      >
                        {widgets3.map((item) => (
                          <Widget
                            key={item.widgetTitle}
                            darkMode={darkMode}
                            widgetTitle={item.widgetTitle}
                            counter={item.counter}
                            link={item.link}
                            linkLabel={item.linkLabel}
                            percentage={item.percentage}
                            icon={item.icon}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="charts"
                  style={{
                    display: 'flex',
                    display: 'grid',
                    flexWrap: 'nowrap',
                    flexDirection: 'column',
                    gap: '10px',
                    marginBottom: '5px',
                    gridTemplateColumns: '1fr 1fr',
                  }}
                >
                  {beneficiariesCharts.map((item) => (
                    <Chart
                      darkMode={darkMode}
                      title={item.title}
                      aspect={2 / 1}
                      data={item.data}
                    />
                  ))}
                </div>

                <div className="charts">
                  <div
                    className={
                      darkMode
                        ? 'featured border app dark'
                        : 'featured border app light'
                    }
                  >
                    {' '}
                    <div className="top">
                      <h1 className="title">
                        Estad??sticas generales de los beneficiarios
                      </h1>
                    </div>
                    {interview.interviews.length === 0 ? (
                      <div className="bottom">
                        <p className="title">
                          Actualmente no hay beneficiarios creados, por lo que
                          no hay estad??sticas de los mismos que mostrar.
                        </p>
                      </div>
                    ) : (
                      <div className="bottom">
                        <p className="title">
                          Empleados por tipo de departamento de remisi??n,
                          tipo/categor??a o tema, capell??n y/o a??o. Es importate
                          tener en cuenta que las categor??as o filtros que no
                          aparecen es porque no tienen informaci??n, es decir,
                          todav??a no hay beneficiarios con esas categor??as.
                        </p>
                        <div className="stats">
                          {beneficiariesStats.map((item) => (
                            <div className="summary">
                              <div className="details">
                                <div className="itemTitle2">{item.title}:</div>
                                {item.stats &&
                                  item.stats.map((item, index) => (
                                    <div className="itemResult" key={index}>
                                      <div className="resultAmount">
                                        {item._id}: {item.count}, con un
                                        porcentaje del{' '}
                                        {Math.round(
                                          (item.count * 100) /
                                            customer.customers.length
                                        )}{' '}
                                        %
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </DashboardSection>
    </DashboradLayout>
  )
}

export default Dashboard
