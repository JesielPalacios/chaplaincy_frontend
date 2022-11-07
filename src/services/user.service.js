import axios from "axios"

export function loginService({ email, password }) {
  return fetch(process.env.REACT_APP_API_HOST+'/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
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

export async function getAllUsersService(token) {
  return await axios.get(process.env.REACT_APP_API_HOST + '/api/users', {
    headers: {
      Authorization: token,
    },
  })
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
