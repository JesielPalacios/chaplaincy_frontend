import axios from 'axios'
import { getAllUsers, loading, error } from '../components/user/userSlice.js'

export function loginService({ email, password }) {
  return fetch(process.env.REACT_APP_API_HOST + '/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) throw new Error('La respuesta es NO ok')
      return res.json()
    })
    .then((res) => {
      const { accessToken } = res
      return accessToken
    })
}

export async function getAllUsersService(dispatch, token) {
  dispatch(loading())

  try {
    const res = await axios.get(process.env.REACT_APP_API_HOST + '/api/users', {
      headers: {
        Authorization: token,
      },
    })

    // console.log('res', res)
    dispatch(getAllUsers(res.data))
  } catch (err) {
    console.log('error', err)
    dispatch(error())
  }
}

export async function getUserService(token, id) {
  return await axios.get(process.env.REACT_APP_API_HOST + '/api/user/' + id, {
    headers: {
      Authorization: token,
    },
  })
}

// export async function getUserPhotoService(id) {
//   return await axios.get('http://localhost:3001/api/photo/' + id, {
//     headers: {
//       Authorization: token
//     }
//   })
// }
