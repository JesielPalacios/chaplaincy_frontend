import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Context and custom hooks
import { DarkModeContext } from '../../core/context/darkModeContext'
import { useUser } from '../../core/hooks/useUser'

// Services
import { getAllUsersService } from '../../services/user.service'
import {
  getAllCustomersService,
  getBeneficiaryStatsService,
} from '../beneficiary/beneficiaryService'
import {
  getAllInterviewsService,
  getInterviewStatsService,
  getLatestInterviewsService,
} from '../interview/interviewService'

// Components
import { DashboardSection, DashboradLayout } from '../layout/Layout'
import Chart from './chart/Chart'
import Featured from './featured/Featured'
import { List as Table } from './table/Table'
import Widget from './widget/Widget'

// Styles
import { Container } from '../beneficiary/BeneficiariesList.styles'
import './home.scss'

const Dashboard = () => {
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

  const widgets = [
    {
      widgetTitle: 'Beneficiarios',
      counter: customer.customers.length,
      link: '/beneficiarios',
      linkLabel: 'Ver todos los beneficiarios',
      percentage: '20',
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
      percentage: '20',
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
        { counter: true, description: 'No necesita remisión' }
      ),
      link: '/entrevistas',
      linkLabel: 'Ver todas las entrevistas',
      percentage: '20',
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
      counter: interview.interviews.length,
      link: '/administradores',
      linkLabel: 'Ver todos los administradores',
      percentage: '20',
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
        (setInterviewsPerStatus().completedInterviews * 100) /
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
        (setInterviewsPerStatus().pendingInterviews * 100) /
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
        (setInterviewsPerStatus().canceledInterviews * 100) /
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
      widgetTitle: 'Entrevistas sin remisión a otros departamentos',
      counter:
        findByCategoryFilter(interview.stats.interviewsPerReferralDepartment, {
          counter: true,
          description: 'No necesita remisión',
        }) - interview.interviews.length,
      link: '/entrevistas',
      linkLabel: 'Ver todas las entrevistas',
      percentage:
        ((findByCategoryFilter(
          interview.stats.interviewsPerReferralDepartment,
          { counter: true, description: 'No necesita remisión' }
        ) -
          interview.interviews.length) *
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
        (findByCategoryFilter(customer.stats.categoryOrTypeOfOcupation, {
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
        (findByCategoryFilter(customer.stats.religion, {
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
        (findByCategoryFilter(customer.stats.createdPerMonth, {
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
      widgetTitle: 'Registrados este año',
      counter: findByCategoryFilter(customer.stats.createdPerYear, {
        description: date.getFullYear(),
      }),
      link: '/beneficiarios',
      linkLabel: 'Ver todos los beneficiarios',
      percentage:
        (findByCategoryFilter(customer.stats.createdPerYear, {
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
      title: 'Por departamento de remisión',
      stats: interview.stats.interviewsPerReferralDepartment,
    },
    {
      title: 'Por estado de entrevista',
      stats: interview.stats.interviewsPerStatus,
    },
    {
      title: 'Por año de creación',
      stats: interview.stats.createdPerYear,
    },
  ]

  const beneficiariesStats = [
    {
      title: 'Por tipo de género',
      stats: customer.stats.gender,
    },
    {
      title: 'Por tipo de documento de identificación',
      stats: customer.stats.typeCitizenshipNumberId,
    },
    {
      title: 'Por tipo de programa académico',
      stats: customer.stats.academicProgram,
    },
    {
      title: 'Por número de semestre académico',
      stats: customer.stats.semester,
    },
    {
      title: 'Por país de orígen',
      stats: customer.stats.birthCountry,
    },
    {
      title: 'Por departamento de orígen',
      stats: customer.stats.birthDepartment,
    },
    {
      title: 'Por ciudad de orígen',
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
      title: 'Por religión',
      stats: customer.stats.religion,
    },
    {
      title: 'Por tipo de beneficiario',
      stats: customer.stats.categoryOrTypeOfOcupation,
    },
  ]

  const interviewsCharts = [
    {
      title: 'Entrevistas creadas los primeros 6 meses del año',
      data: setInterviewsPerMonthInSemester(
        firstSemester,
        interview.stats.createdPerMonth
      ),
    },
    {
      title: 'Entrevistas creadas los últimos 6 meses del año"',
      data: setInterviewsPerMonthInSemester(
        secondSemester,
        interview.stats.createdPerMonth
      ),
    },
  ]

  const beneficiariesCharts = [
    {
      title: 'Beneficiarios creados los primeros 6 meses del año',
      data: setInterviewsPerMonthInSemester(
        firstSemester,
        customer.stats.createdPerMonth
      ),
    },
    {
      title: 'Beneficiarios creados los últimos 6 meses del año',
      data: setInterviewsPerMonthInSemester(
        secondSemester,
        customer.stats.createdPerMonth
      ),
    },
  ]

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
      <DashboardSection title={'Panel de control'}>
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
                    title="Entrevistas de los últimos 6 meses del año"
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
                  <div className="listTitle">Últimas entrevistas</div>
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
                          <span className="itemKey">Código estudiantil:</span>
                          <span className="itemValue">sdvsdvsdvs</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Código estudiantil:</span>
                          <span className="itemValue">sdvsdvsdvs</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Código estudiantil:</span>
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
                      title="Entrevistas creadas a lo largo del último año"
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
                        Estadísticas generales de las entrevistas
                      </h1>
                    </div>
                    <div className="bottom">
                      <p className="title">
                        Entrevistas por tipo de departamento de remisión,
                        tipo/categoría o tema, capellán y/o año. Es importate
                        tener en cuenta que las categorías o filtros que no
                        aparecen es porque no tienen información, es decir,
                        todavía no hay entrevistas con esas categorías.
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
                                      {(item.count * 100) /
                                        setInterviewsPerStatus()
                                          .interviewsCounter}
                                      %
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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
                      title="Beneficiarios creados a lo largo del último año"
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
                      title="Beneficiarios creados a lo largo del último año"
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
                        Estadísticas generales de los beneficiarios
                      </h1>
                    </div>
                    <div className="bottom">
                      <p className="title">
                        Empleados por tipo de departamento de remisión,
                        tipo/categoría o tema, capellán y/o año. Es importate
                        tener en cuenta que las categorías o filtros que no
                        aparecen es porque no tienen información, es decir,
                        todavía no hay beneficiarios con esas categorías.
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
                                      {(item.count * 100) /
                                        customer.customers.length}{' '}
                                      %
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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
