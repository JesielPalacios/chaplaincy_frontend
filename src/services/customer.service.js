import axios from 'axios'
import {
  loading,
  error,
  getAllCustomers,
  getCustomer
} from '../core/redux/customerSlice'

export async function getAllCustomersService(dispatch, token) {
  dispatch(loading())

  try {
    const res = await axios.get('http://localhost:3001/api/customers', {
      headers: {
        Authorization: token
      }
    })

    dispatch(getAllCustomers(res.data))
  } catch (error) {
    console.log('error', error)
    dispatch(error())
  }
}

export async function getCustomerService(dispatch, token, id) {
  dispatch(loading())

  try {
    const res = await axios.get('http://localhost:3001/api/customer/' + id, {
      headers: {
        Authorization: token
      }
    })

    dispatch(getCustomer(res.data))
  } catch (error) {
    dispatch(getCustomer({}))
    console.log('error', error)
    dispatch(error())
  }
}

export async function getUserPhotoService(id) {
  return await axios.get('http://localhost:3001/api/photo/' + id, {
    headers: {
      Authorization: token
    }
  })
}
