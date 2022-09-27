import { useContext } from 'react'
import {
  getUserService,
  getAllUsersService
} from '../../../services/user.service'
import { Context } from '../../context/UserContext'
import { actionType } from '../store/types/usersTypes'

export const fetchAllCustomers = () => async (dispatch) => {
  const { isAuth } = useContext(Context)

  dispatch({
    type: actionType.LOADING
  })

  // await axios
  //   .get('https://jsonplaceholder.typicode.com/users')
  //   .then((users) => {
  //     dispatch({
  //       type: actionType.GET_ALL_USERS,
  //       payload: users.data
  //     })
  //   })
  //   .catch((resp) => {
  //     dispatch({
  //       type: actionType.ERROR,
  //       payload: true
  //     })
  //     console.log(resp.message)
  //   })
  getAllUsersService(isAuth)
    .then((res) => {
      console.log(res)
      dispatch({
        type: actionType.GET_ALL_USERS,
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

export const fetchUserFromAcademicProcess =
  (id) => async (dispatch, getState) => {
    const { isAuth } = useContext(Context)
    // const { user } = getState().usersReducers
    const { matterCancellations } = getState().matterCancellationsReducers

    console.log('isAuth')
    console.log(isAuth)
    console.log('id')
    console.log(id)
    // console.log('user')
    // console.log(user)
    console.log('matterCancellations')
    console.log(matterCancellations)

    // dispatch({
    //   type: actionType.LOADING
    // })

    // getUserService(isAuth, id)
    //   .then((res) => {
    //     console.log(res)
    //     // dispatch({
    //     //   type: actionType.GET_USER_FROM_ACADEMIC_PROCESS,
    //     //   payload: res.data
    //     // })
    //   })
    //   .catch((res) => {
    //     dispatch({
    //       type: actionType.ERROR,
    //       payload: true
    //     })

    //     // console.log(res.message)
    //   })
  }
