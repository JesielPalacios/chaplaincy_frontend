import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DarkModeContext } from '../../core/context/darkModeContext'
import { useUser } from '../../core/hooks/useUser'
import { getAllUsersService } from '../../services/user.service'
import { Container } from '../beneficiary/BeneficiariesList.styles'
// import { Container } from '../beneficiary/Beneficiary.styles'
import {
  getAllCustomersService,
  getBeneficiaryStatsService,
} from '../beneficiary/beneficiaryService'
import { getAllCustomers } from '../beneficiary/beneficiarySlice'
import {
  getAllInterviewsService,
  getInterviewStatsService,
  getLatestInterviewsService,
} from '../interview/interviewService'
import { DashboardSection, DashboradLayout } from '../layout/Layout'
import Chart from './chart/Chart'
// import Chart from '../Chart'
import Featured from './featured/Featured'
import './home.scss'
import { List as Table } from './table/Table'
import Widget from './widget/Widget'

const Dashboard = () => {
  const { isAuth } = useUser()
  const { darkMode } = useContext(DarkModeContext)
  const { customer, interview, user, beneficiary } = useSelector(
    (state) => state
  )

  const dispatch = useDispatch()

  function setInterviewsReferrals() {
    let interviewsReferrals = 0

    interview.stats.interviewsPerReferralDepartment &&
      interview.stats.interviewsPerReferralDepartment.map((item) => {
        if (item._id != 'No necesita remisión') {
          interviewsReferrals += item.count
        }
      })

    return interviewsReferrals
  }

  function setInterviewsPerStatus() {
    let fullInterviews = 0
    let pendingInterviews = 0
    let canceledInterviews = 0
    let interviewsCounter = 0

    interview.stats.interviewsPerStatus &&
      interview.stats.interviewsPerStatus.map((item) => {
        if (item._id === 'Completada') {
          fullInterviews += item.count
        } else if (item._id === 'Pendiente') {
          pendingInterviews += item.count
        } else if (item._id === 'Cancelada') {
          canceledInterviews += item.count
        }
        interviewsCounter += item.count
      })

    return {
      fullInterviews,
      pendingInterviews,
      canceledInterviews,
      interviewsCounter,
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
  function setInterviewsPerMonthInSemester() {
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

    let parsedData = []

    interview.stats.createdPerMonth &&
      interview.stats.createdPerMonth.map((item) => {
        secondSemester.map((month) => {
          if (item._id === month.number) {
            secondSemester[
              secondSemester.findIndex((object) => {
                return object.number === month.number
              })
            ].Total = item.count
          }
        })
      })

    secondSemester.map((item) => {
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
      counter: setInterviewsReferrals(),
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

  function setBeneficiariesStats() {
    let fullInterviews = 0
    let pendingInterviews = 0
    let canceledInterviews = 0
    let interviewsCounter = 0

    beneficiary.stats.interviewsPerStatus &&
      beneficiary.stats.interviewsPerStatus.map((item) => {
        if (item._id === 'Completada') {
          fullInterviews += item.count
        } else if (item._id === 'Pendiente') {
          pendingInterviews += item.count
        } else if (item._id === 'Cancelada') {
          canceledInterviews += item.count
        }
        interviewsCounter += item.count
      })

    return {
      fullInterviews,
      pendingInterviews,
      canceledInterviews,
      interviewsCounter,
    }
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
                  <Chart
                    darkMode={darkMode}
                    title="Entrevistas de los últimos 6 meses"
                    aspect={2 / 1}
                    setInterviewsPerMonth={setInterviewsPerMonthInSemester()}
                  />
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
                    <div className="item">
                      kjmnbghjmnb
                      <div className="details">
                        <h1 className="itemTitle">sdfgb vfgb vfgv</h1>
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
                        todavía no hay entrevistas con esas categorías.:
                      </p>
                      {/* <p className="amount">{pendingInterviews}</p> */}

                      <div className="summary">
                        <div className="item">
                          <div className="itemTitle">
                            Por tipo/categoría o tema:
                          </div>
                          {interview.stats.interviewsPerTopic &&
                            interview.stats.interviewsPerTopic.map(
                              (item, index) => (
                                <div className="itemResult" key={index}>
                                  <div className="resultAmount">
                                    {item._id}: {item.count}, con un porcentaje
                                    del{' '}
                                    {(item.count * 100) /
                                      setInterviewsPerStatus()
                                        .interviewsCounter}
                                    %
                                  </div>
                                </div>
                              )
                            )}
                        </div>
                      </div>
                      <div className="summary">
                        <div className="item">
                          <div className="itemTitle">
                            Por departamento de remisión:
                          </div>
                          {interview.stats.interviewsPerReferralDepartment &&
                            interview.stats.interviewsPerReferralDepartment.map(
                              (item, index) => (
                                <div className="itemResult" key={index}>
                                  <div className="resultAmount">
                                    {item._id}: {item.count}, con un porcentaje
                                    del{' '}
                                    {(item.count * 100) /
                                      setInterviewsPerStatus()
                                        .interviewsCounter}
                                    %
                                  </div>
                                </div>
                              )
                            )}
                        </div>
                      </div>
                      <div className="summary">
                        <div className="item">
                          <div className="itemTitle">
                            Por estado de entrevista:
                          </div>
                          {interview.stats.interviewsPerStatus &&
                            interview.stats.interviewsPerStatus.map(
                              (item, index) => (
                                <div className="itemResult" key={index}>
                                  <div className="resultAmount">
                                    {item._id}: {item.count}, con un porcentaje
                                    del{' '}
                                    {(item.count * 100) /
                                      setInterviewsPerStatus()
                                        .interviewsCounter}
                                    %
                                  </div>
                                </div>
                              )
                            )}
                        </div>
                      </div>
                      <div className="summary">
                        <div className="item">
                          <div className="itemTitle">Por año:</div>
                          {interview.stats.createdPerYear &&
                            interview.stats.createdPerYear.map(
                              (item, index) => (
                                <div className="itemResult" key={index}>
                                  <div className="resultAmount">
                                    {item._id}: {item.count}, con un porcentaje
                                    del{' '}
                                    {(item.count * 100) /
                                      setInterviewsPerStatus()
                                        .interviewsCounter}
                                    %
                                  </div>
                                </div>
                              )
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}

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
                        todavía no hay beneficiarios con esas categorías.:
                      </p>
                      <div className="summary">
                        <div className="item">
                          <div className="itemTitle">
                            Por categoría o típo de género:
                          </div>
                          {customer.stats.gender &&
                            customer.stats.gender.map((item, index) => (
                              <div className="itemResult" key={index}>
                                <div className="resultAmount">
                                  {item._id}: {item.count}, con un porcentaje
                                  del{' '}
                                  {Math.round(
                                    (item.count * 100) /
                                      customer.customers.length
                                  )}
                                  %
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div className="summary">
                        <div className="item">
                          <div className="itemTitle">
                            Por categoría o típo de documento de identificación:
                          </div>
                          {customer.stats.typeCitizenshipNumberId &&
                            customer.stats.typeCitizenshipNumberId.map(
                              (item, index) => (
                                <div className="itemResult" key={index}>
                                  <div className="resultAmount">
                                    {item._id}: {item.count}, con un porcentaje
                                    del{' '}
                                    {Math.round(
                                      (item.count * 100) /
                                        customer.customers.length
                                    )}
                                    %
                                  </div>
                                </div>
                              )
                            )}
                        </div>
                      </div>

                      <div className="summary">
                        <div className="item">
                          <div className="itemTitle">
                            Por categoría o típo de programa académico:
                          </div>
                          {customer.stats.academicProgram &&
                            customer.stats.academicProgram.map(
                              (item, index) => (
                                <div className="itemResult" key={index}>
                                  <div className="resultAmount">
                                    {item._id}: {item.count}, con un porcentaje
                                    del{' '}
                                    {Math.round(
                                      (item.count * 100) /
                                        customer.customers.length
                                    )}
                                    %
                                  </div>
                                </div>
                              )
                            )}
                        </div>
                      </div>

                      <div className="summary">
                        <div className="item">
                          <div className="itemTitle">
                            Por número de semestre académico:
                          </div>
                          {customer.stats.semester &&
                            customer.stats.semester.map((item, index) => (
                              <div className="itemResult" key={index}>
                                <div className="resultAmount">
                                  {item._id}: {item.count}, con un porcentaje
                                  del{' '}
                                  {Math.round(
                                    (item.count * 100) /
                                      customer.customers.length
                                  )}
                                  %
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div className="summary">
                        <div className="item">
                          <div className="itemTitle">
                            Por país de orígen del beneficiario:
                          </div>
                          {customer.stats.birthCountry &&
                            customer.stats.birthCountry.map((item, index) => (
                              <div className="itemResult" key={index}>
                                <div className="resultAmount">
                                  {item._id}: {item.count}, con un porcentaje
                                  del{' '}
                                  {Math.round(
                                    (item.count * 100) /
                                      customer.customers.length
                                  )}
                                  %
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div className="summary">
                        <div className="item">
                          <div className="itemTitle">
                            Por departamento/provincia de orígen del
                            beneficiario:
                          </div>
                          {customer.stats.birthDepartment &&
                            customer.stats.birthDepartment.map(
                              (item, index) => (
                                <div className="itemResult" key={index}>
                                  <div className="resultAmount">
                                    {item._id}: {item.count}, con un porcentaje
                                    del{' '}
                                    {Math.round(
                                      (item.count * 100) /
                                        customer.customers.length
                                    )}
                                    %
                                  </div>
                                </div>
                              )
                            )}
                        </div>
                      </div>

                      <div className="summary">
                        <div className="item">
                          <div className="itemTitle">
                            Por ciudad de orígen del beneficiario:
                          </div>
                          {customer.stats.birthCity &&
                            customer.stats.birthCity.map((item, index) => (
                              <div className="itemResult" key={index}>
                                <div className="resultAmount">
                                  {item._id}: {item.count}, con un porcentaje
                                  del{' '}
                                  {Math.round(
                                    (item.count * 100) /
                                      customer.customers.length
                                  )}
                                  %
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div className="summary">
                        <div className="item">
                          <div className="itemTitle">
                            Por estado civil:
                          </div>
                          {customer.stats.maritalStatus &&
                            customer.stats.maritalStatus.map((item, index) => (
                              <div className="itemResult" key={index}>
                                <div className="resultAmount">
                                  {item._id}: {item.count}, con un porcentaje
                                  del{' '}
                                  {Math.round(
                                    (item.count * 100) /
                                      customer.customers.length
                                  )}
                                  %
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div className="summary">
                        <div className="item">
                          <div className="itemTitle">
                            Por estrato social:
                          </div>
                          {customer.stats.socialStratum &&
                            customer.stats.socialStratum.map((item, index) => (
                              <div className="itemResult" key={index}>
                                <div className="resultAmount">
                                  {item._id}: {item.count}, con un porcentaje
                                  del{' '}
                                  {Math.round(
                                    (item.count * 100) /
                                      customer.customers.length
                                  )}
                                  %
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div className="summary">
                        <div className="item">
                          <div className="itemTitle">
                            Por religión:
                          </div>
                          {customer.stats.religion &&
                            customer.stats.religion.map((item, index) => (
                              <div className="itemResult" key={index}>
                                <div className="resultAmount">
                                  {item._id}: {item.count}, con un porcentaje
                                  del{' '}
                                  {Math.round(
                                    (item.count * 100) /
                                      customer.customers.length
                                  )}
                                  %
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div className="summary">
                        <div className="item">
                          <div className="itemTitle">
                            Por tipo de beneficiario:
                          </div>
                          {customer.stats.categoryOrTypeOfOcupation &&
                            customer.stats.categoryOrTypeOfOcupation.map((item, index) => (
                              <div className="itemResult" key={index}>
                                <div className="resultAmount">
                                  {item._id}: {item.count}, con un porcentaje
                                  del{' '}
                                  {Math.round(
                                    (item.count * 100) /
                                      customer.customers.length
                                  )}
                                  %
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
          </div>
        </Container>
      </DashboardSection>
    </DashboradLayout>
  )
}

export default Dashboard
