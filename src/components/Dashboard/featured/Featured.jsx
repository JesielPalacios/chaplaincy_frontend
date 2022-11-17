import './featured.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'

const Featured = (props) => {
  const {
    setInterviewsPerStatus: {
      fullInterviews,
      pendingInterviews,
      canceledInterviews,
      interviewsCounter,
    },
  } = props
  return (
    <div
      className={
        props.darkMode
          ? 'featured border app dark'
          : 'featured border app light'
      }
    >
      <div className="top">
        <h1 className="title">Porcentaje de entrevistas completadas</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={
              (fullInterviews * 100) / (interviewsCounter - canceledInterviews)
            }
            text={
              (fullInterviews * 100) /
                (interviewsCounter - canceledInterviews) +
              '%'
            }
            strokeWidth={5}
          />
        </div>
        <p className="title">Entrevistas por seguimiento de revisión</p>
        <p className="amount">{pendingInterviews}</p>
        <p className="desc">
          El porcentaje de enrevistas completadas sólo se saca de acuerdo a las
          entrevistas completadas y las pendientes, las entrevistas canceladas
          no se toman en cuenta..
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Canceladas</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">{canceledInterviews}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Completadas</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">{fullInterviews}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">En proceso</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">{pendingInterviews}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured
