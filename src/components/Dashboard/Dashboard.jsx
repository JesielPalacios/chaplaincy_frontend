import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useUser } from '../../core/hooks/useUser'
// import { Container } from '../beneficiary/BeneficiariesList.styles'
import { Container } from '../beneficiary/Beneficiary.styles'
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
  const {
    customer: { customers, loading, error },
    interview: { interviews },
  } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    getAllCustomersService(dispatch, isAuth)
    getAllInterviewsService(dispatch, isAuth)
  }, [])

  return (
    <DashboradLayout>
      <DashboardSection title={'Panel de control'}>
        <Container>
          <div className="scroll">
            <div className="home">
              {/* <Sidebar /> */}
              <div className="homeContainer">
                {/* <Navbar /> */}
                <div className="widgets">
                  <div className="widget">
                    <div className="left">
                      <span className="widgetTitle">Beneficiarios</span>
                      <span className="counter">
                        {customers && customers.length}
                      </span>
                      {/* <span>
                        <Link to="/beneficiarios" className="link">
                          Ver todos los beneficiarios
                        </Link>
                      </span> */}
                      <Link to="/beneficiarios">
                        <span className="link">
                          Ver todos los beneficiarios
                        </span>
                      </Link>
                    </div>
                    <div className="right">
                      <div className="percentage positive">
                        <KeyboardArrowUpIcon />
                        20 %
                      </div>
                      <PersonOutlinedIcon
                        className="icon"
                        style={{
                          color: 'blue',
                          backgroundColor: 'rgba(0, 115, 255, 0.2)',
                        }}
                      />
                    </div>
                  </div>
                  <div className="widget">
                    <div className="left">
                      <span className="widgetTitle">Entrevistas</span>
                      <span className="counter">
                        {interviews && interviews.length}
                      </span>
                      {/* <span>
                        <Link to="/beneficiarios" className="link">
                          Ver todos los beneficiarios
                        </Link>
                      </span> */}
                      <Link to="/entrevistas">
                        <span className="link">Ver todas las entrevistas</span>
                      </Link>
                    </div>
                    <div className="right">
                      <div className="percentage positive">
                        <KeyboardArrowUpIcon />
                        20 %
                      </div>
                      <AccountBalanceWalletOutlinedIcon
                        className="icon"
                        style={{
                          // backgroundColor: 'rgba(128, 0, 128, 0.2)',
                          // color: 'purple',
                          backgroundColor: 'rgba(218, 165, 32, 0.2)',
                          color: 'goldenrod',
                        }}
                      />
                    </div>
                  </div>
                  {/* <Widget type="user" /> */}
                  {/* <Widget type="order" /> */}
                  <Widget type="earning" />
                  <Widget type="balance" />
                </div>
                <div className="charts">
                  <Featured />
                  <Chart
                    title="Entevistas de los últimos 6 meses"
                    aspect={2 / 1}
                  />
                </div>
                <div className="listContainer">
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
