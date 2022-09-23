import { useContext } from 'react'
import {
  getAllMatterCancellationsService,
  getMatterCancellationService
} from '../../../services/matterCancellation.service'
import { getUserService } from '../../../services/user.service'
import { Context } from '../../context/UserContext'
import { actionType } from '../store/types/matterCancellationsTypes'

export const fetchAllMatterCancellations = () => async (dispatch) => {
  const { isAuth } = useContext(Context)

  dispatch({
    type: actionType.LOADING
  })

  getAllMatterCancellationsService(isAuth)
    .then((res) => {
      // console.log(res)
      dispatch({
        type: actionType.GET_ALL_MATTER_CANCELLATIONS,
        payload: res.data
      })
    })
    .catch((res) => {
      dispatch({
        type: actionType.ERROR,
        payload: true
      })

      // console.log(res.message)
    })
}

export const fetchMatterCancellation = (id) => async (dispatch) => {
  const { isAuth } = useContext(Context)

  dispatch({
    type: actionType.LOADING
  })

  getMatterCancellationService(isAuth, id)
    .then((res) => {
      // console.log(res)
      dispatch({
        type: actionType.GET_MATTER_CANCELLATION,
        payload: res.data
      })
    })
    .catch((res) => {
      dispatch({
        type: actionType.ERROR,
        payload: true
      })

      // console.log(res.message)
    })
}
