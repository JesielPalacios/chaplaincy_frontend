import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useUser } from '../../../core/hooks/useUser'
import { getAllCustomersService } from '../../beneficiary/beneficiaryService'
import './widget.scss'
const Widget = ({ type }) => {
  const { isAuth } = useUser()
  const { customers, loading, error } = useSelector((state) => state.customer)
  const dispatch = useDispatch()

  let data

  //temporary
  const amount = 100
  const diff = 20

  switch (type) {
    case 'user':
      data = {
        title: 'Beneficiarios',
        isMoney: false,
        link: (
          <Link to="/beneficiarios" className="link">
            Ver todos los beneficiarios
          </Link>
        ),
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: 'crimson',
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
            }}
          />
        ),
      }
      break
    case 'order':
      data = {
        title: 'Entrevistas',
        isMoney: false,
        link: 'View all orders',
        icon: (
          //   <ShoppingCartOutlinedIcon
          //     className="icon"
          //     style={{
          //       backgroundColor: 'rgba(218, 165, 32, 0.2)',
                // color: 'goldenrod',
          //     }}
          //   />
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              // backgroundColor: 'rgba(128, 0, 128, 0.2)',
              // color: 'purple',
              backgroundColor: 'rgba(218, 165, 32, 0.2)',
              color: 'goldenrod',
            }}
          />
        ),
      }
      break
    case 'earning':
      data = {
        title: 'Remisiones',
        isMoney: true,
        link: 'View net earnings',
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)', color: 'green' }}
          />
        ),
      }
      break
    case 'balance':
      data = {
        title: 'BALANCE',
        isMoney: true,
        link: 'See details',
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: 'rgba(128, 0, 128, 0.2)',
              color: 'purple',
            }}
          />
        ),
      }
      break
    default:
      break
  }

  useEffect(() => {
    getAllCustomersService(dispatch, isAuth)
  }, [])

  return (
    <div className="widget">
      <div className="left">
        <span className="widgetTitle">{data.title}</span>
        <span className="counter">
          {data.isMoney && '$'} {amount}
        </span>
        <span>{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  )
}

export default Widget
