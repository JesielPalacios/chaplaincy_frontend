import axios from 'axios'
import { loading, error, getAllCustomers, getCustomer, resetFlags } from '../core/redux/customerSlice.js'

export async function getAllCustomersService(dispatch, token) {
  dispatch(loading())

  try {
    const res = await axios.get('http://localhost:3001/api/customers', {
      headers: {
        Authorization: token
      }
    })

    dispatch(getAllCustomers(res.data))
  } catch (err) {
    console.log('error', err)
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
  } catch (err) {
    dispatch(getCustomer({}))
    console.log('error', err)
    dispatch(error())
  }
}

export async function createCustomerService(dispatch, token, customerData) {
  dispatch(loading())
  const formData = new FormData()
  formData.append('firstName', customerData.firstName.value)
  formData.append('secondName', customerData.secondName.value)
  formData.append('firstSurname', customerData.firstSurname.value)
  formData.append('secondSurname', customerData.secondSurname.value)
  formData.append('gender', customerData.gender.value)
  formData.append('typeCitizenshipNumberId', customerData.typeCitizenshipNumberId.value)
  formData.append('citizenshipNumberId', customerData.citizenshipNumberId.value)
  formData.append('academicProgram', customerData.academicProgram.value)
  formData.append('studentCode', customerData.studentCode.value)
  formData.append('semester', customerData.semester.value)
  formData.append('email', customerData.email.value)
  formData.append('cellPhoneNumber', customerData.cellPhoneNumber.value)
  formData.append('address', customerData.address.value)
  formData.append('dateOfBirth', customerData.dateOfBirth.value)
  formData.append('birthCountry', customerData.birthCountry.value)
  formData.append('birthDepartment', customerData.birthDepartment.value)
  formData.append('birthCity', customerData.birthCity.value)

  try {
    const res = await axios.post('http://localhost:3001/api/customers', formData, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data'
      }
    })

    dispatch(resetFlags())
    // return res
    console.log('res', res)
  } catch (err) {
    dispatch(getCustomer({}))
    console.log('error', err)
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
