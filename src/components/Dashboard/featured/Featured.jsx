import './featured.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'

const Featured = ({ darkMode }) => {
  return (
    <div
      className={
        darkMode ? 'featured border app dark' : 'featured border app light'
      }
    >
      <div className="top">
        <h1 className="title">Estadísticas de las entrevistas</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={'70%'} strokeWidth={5} />
        </div>
        <p className="title">Entrevistas por seguimiento de remisión</p>
        <p className="amount">32</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">En proceso</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Completadas</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Canceladas</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured
