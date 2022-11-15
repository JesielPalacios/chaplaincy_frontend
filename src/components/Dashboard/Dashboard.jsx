import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DarkModeContext } from '../../core/context/darkModeContext'
import { useUser } from '../../core/hooks/useUser'
import { Container } from '../beneficiary/BeneficiariesList.styles'
// import { Container } from '../beneficiary/Beneficiary.styles'
import { getAllCustomersService } from '../beneficiary/beneficiaryService'
import { getAllInterviewsService } from '../interview/interviewService'
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
  const {
    customer: { customers, loading, error },
    interview: { interviews },
  } = useSelector((state) => state)
  const dispatch = useDispatch()

  const widgets = [
    {
      widgetTitle: 'Beneficiarios',
      counter: customers.length,
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
      counter: interviews.length,
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
      counter: interviews.length,
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
      counter: interviews.length,
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

  useEffect(() => {
    getAllCustomersService(dispatch, isAuth)
    getAllInterviewsService(dispatch, isAuth)
  }, [])

  return (
    <DashboradLayout className={darkMode ? 'app dark' : 'app ligth'}>
      <DashboardSection title={'Panel de control'}>
        <Container>
          <div className="scroll">
            <div className="home">
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
                  <Featured darkMode={darkMode} />
                  <Chart
                    darkMode={darkMode}
                    title="Entevistas de los últimos 6 meses"
                    aspect={2 / 1}
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
                  <Table />
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
