import axios from 'axios'
import {
  loading,
  error,
  getAllCustomers,
  getCustomer,
  resetFlags,
  getBeneficiaryPhoto,
  getBeneficiaryStats,
} from './beneficiarySlice.js'

export async function getAllCustomersService(dispatch, token) {
  dispatch(loading())

  try {
    const res = await axios.get(
      process.env.REACT_APP_API_HOST + '/api/beneficiaries',
      {
        headers: {
          // crossOriginIsolated:"anonymous",
          // crossOrigin: 'anonymous',

          Authorization: token,
        },
      }
    )

    dispatch(getAllCustomers(res.data))
  } catch (err) {
    console.log('error', err)
    dispatch(error())
  }
}

export async function getCustomerService(dispatch, token, id) {
  dispatch(loading())

  try {
    const res = await axios.get(
      process.env.REACT_APP_API_HOST + '/api/beneficiary/' + id,
      {
        headers: {
          Authorization: token,
        },
      }
    )

    dispatch(getCustomer(res.data))
  } catch (err) {
    dispatch(getCustomer({}))
    console.log('error', err)
    dispatch(error())
  }
}

export async function createCustomerService(
  dispatch,
  token,
  title,
  id,
  beneficiaryData
) {
  console.log('beneficiaryData', beneficiaryData)
  dispatch(loading())

  const formData = new FormData()

  formData.append('firstName', beneficiaryData.firstName)
  formData.append('secondName', beneficiaryData.secondName)
  formData.append('firstSurname', beneficiaryData.firstSurname)
  formData.append('secondSurname', beneficiaryData.secondSurname)
  formData.append('gender', beneficiaryData.gender)
  formData.append(
    'typeCitizenshipNumberId',
    beneficiaryData.typeCitizenshipNumberId
  )
  formData.append('citizenshipNumberId', beneficiaryData.citizenshipNumberId)
  formData.append('email', beneficiaryData.email)
  formData.append('cellPhoneNumber', beneficiaryData.cellPhoneNumber)
  formData.append('academicProgram', beneficiaryData.academicProgram)
  formData.append('studentCode', beneficiaryData.studentCode)
  formData.append('semester', beneficiaryData.semester)
  formData.append('address', beneficiaryData.address)
  formData.append('birthDate', beneficiaryData.birthDate)
  formData.append('birthCountry', beneficiaryData.birthCountry)
  formData.append('birthDepartment', beneficiaryData.birthDepartment)
  formData.append('birthCity', beneficiaryData.birthCity)
  formData.append('beneficiaryPhoto', beneficiaryData.beneficiaryPhoto)

  try {
    const res =
      title === 'Crear nuevo beneficiario'
        ? await axios.post(
            process.env.REACT_APP_API_HOST + '/api/beneficiaries',
            formData,
            {
              headers: {
                Authorization: token,
                // crossOriginIsolated:"anonymous",
                crossOrigin: 'anonymous',
                'Content-Type': 'multipart/form-data',
              },
            }
          )
        : await axios.put(
            process.env.REACT_APP_API_HOST + '/api/beneficiary/' + id,
            formData,
            {
              headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data',
              },
            }
          )

    dispatch(resetFlags())
    // return res
    console.log('res', res)

    return res.data._id
  } catch (err) {
    dispatch(getCustomer({}))
    console.log('error', err.response.data)
    dispatch(error())
  }
}

export async function deleteBeneficiaryService(dispatch, token, id) {
  dispatch(loading())

  try {
    const res = await axios.delete(
      process.env.REACT_APP_API_HOST + '/api/beneficiary/' + id,
      {
        headers: {
          Authorization: token,
        },
      }
    )

    // console.log('res', res)
    dispatch(resetFlags())
  } catch (err) {
    dispatch(getCustomer({}))
    // console.log('error', err)
    dispatch(error())
  }
}

export async function getBeneficiaryImageService(dispatch, id) {
  console.log('id', id)
  dispatch(loading())

  try {
    const res = await axios.get(
      process.env.REACT_APP_API_HOST + '/api/photo/' + id,
      {}
    )

    dispatch(getBeneficiaryPhoto(res.data))
    // console.log('res', res.data)
  } catch (err) {
    dispatch(getBeneficiaryPhoto(''))
    // console.log('error', err)
    dispatch(error())
  }
}

export async function getBeneficiaryStatsService(dispatch, token) {
  dispatch(loading())

  try {
    const res = await axios.get(
      process.env.REACT_APP_API_HOST + '/api/beneficiaryStats',
      {
        headers: {
          Authorization: token,
        },
      }
    )

    // console.log('res', res)
    dispatch(getBeneficiaryStats(res.data))
  } catch (err) {
    dispatch(getBeneficiaryStats({}))
    // console.log('error', err)
    dispatch(error())
  }
}

// export async function getUserPhotoService(id) {
//   return await axios.get('http://localhost:3001/api/photo/' + id, {
//     headers: {
//       Authorization: token
//     }
//   })
// }
