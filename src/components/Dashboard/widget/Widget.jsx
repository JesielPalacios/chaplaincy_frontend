import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Link } from 'react-router-dom'
import './widget.scss'

const Widget = (props) => {
  return (
    <div
      className={
        props.darkMode ? 'widget border app dark' : 'widget border app light'
      }
    >
      <div className="left">
        <span className="widgetTitle">{props.widgetTitle}</span>
        <span className="counter">{props.counter}</span>
        <Link to={props.link}>
          <span className="link">{props.linkLabel}</span>
        </Link>
      </div>
      <div className="right">
        {props.percentage && (
          <div className="percentage positive">
            <KeyboardArrowUpIcon />
            {Math.round(props.percentage)} %
          </div>
        )}
        {!props.percentage && (
          <div className="percentage positive">
          </div>
        )}
        {props.icon}
      </div>
    </div>
  )
}

export default Widget
