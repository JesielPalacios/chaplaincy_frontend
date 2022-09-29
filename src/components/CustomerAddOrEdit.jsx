import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import SaveIcon from '@mui/icons-material/Save'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useInputValue } from '../core/hooks/useInputValue'
import { useUser } from '../core/hooks/useUser'
import { resetCustomer } from '../core/redux/customerSlice'
import { getCustomerService } from '../services/customer.service'
import { Link } from './Customer.styles'
import { Container, customerInputs } from './CustomerAddOrEdit.styles'
import { DashboardSection, DashboradLayout } from './layout/Layout'

export default function CustomerAddOrEdit({ title }) {
  const firstName = useInputValue('')
  const secondName = useInputValue('')
  const firstSurname = useInputValue('')
  const secondSurname = useInputValue('')
  const gender = useInputValue('')
  const typeCitizenshipNumberId = useInputValue('')
  const citizenshipNumberId = useInputValue('')
  const academicProgram = useInputValue('')
  const studentCode = useInputValue('')
  const semester = useInputValue('')
  const email = useInputValue('')
  const cellPhoneNumber = useInputValue('')
  const address = useInputValue('')
  const dateOfBirth = useInputValue('')
  const birthCountry = useInputValue('')
  const birthDepartment = useInputValue('')
  const birthCity = useInputValue('')
  const [file, setFile] = useState('')

  const { customerId } = useParams()
  const dispatch = useDispatch()
  const { customer, loading, error } = useSelector((state) => state.customer)
  const { isAuth } = useUser()

  let nameRef

  function referenceComparator(reference) {
    switch (reference) {
      case 'firstName':
        nameRef = firstName
        break
      case 'secondName':
        nameRef = secondName
        break
      case 'firstSurname':
        nameRef = firstSurname
        break
      case 'secondSurname':
        nameRef = secondSurname
        break
      case 'gender':
        nameRef = gender
        break
      case 'typeCitizenshipNumberId':
        nameRef = typeCitizenshipNumberId
        break
      case 'citizenshipNumberId':
        nameRef = citizenshipNumberId
        break
      case 'academicProgram':
        nameRef = academicProgram
        break
      case 'studentCode':
        nameRef = studentCode
        break
      case 'semester':
        nameRef = semester
        break
      case 'email':
        nameRef = email
        break
      case 'cellPhoneNumber':
        nameRef = cellPhoneNumber
        break
      case 'address':
        nameRef = address
        break
      case 'dateOfBirth':
        nameRef = dateOfBirth
        break
      case 'birthCountry':
        nameRef = birthCountry
        break
      case 'birthDepartment':
        nameRef = birthDepartment
        break
      case 'birthCity':
        nameRef = birthCity
        break
      default:
        nameRef = secondName
        break
    }
  }

  useEffect(() => {
    // title === 'Editar beneficiario' && getCustomerService(dispatch, isAuth, customerId) && firstName.setValue( customer.firstName)
    title === 'Crear nuevo beneficiario' && dispatch(resetCustomer())
    title === 'Editar beneficiario' &&
      getCustomerService(dispatch, isAuth, customerId)
        .then
        // firstName.SetValue(customer.firstName),
        // firstName.setValue(customer.firstName)
        ()
    // firstName.setValue(customer.firstName)
    firstName.value = customer.firstName
  }, [])

  return (
    <DashboradLayout>
      <DashboardSection title={title === 'Crear nuevo beneficiario' ? title : title + ': ' + customerId}>
        <Container>
          <Link to="/beneficiarios" top="-45px" right="40px">
            Ir a beneficiarios
          </Link>

          <div className="newContainer scroll">
            <div className="bottom">
              <div className="left">
                <img src={file ? URL.createObjectURL(file) : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'} alt="" />
              </div>
              <div className="right">
                <form>
                  <div className="formInput">
                    <label htmlFor="file" className="button">
                      Click aquí para elegir la imágen: <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: 'none' }} />
                  </div>

                  {customerInputs.map((input, index) => {
                    referenceComparator(input.nameRef)

                    console.log('nameRef', nameRef)
                    return (
                      <div className="formInput" key={index}>
                        <label htmlFor={input.label.split(' ').join('')}>{input.label}</label>
                        <input
                          type={input.type}
                          id={input.label.split(' ').join('')}
                          placeholder={input.placeholder}
                          {...nameRef}

                          // value={nameRef.value}
                          // onChange={(e) => nameRef.setValue(e.target.value)}
                          //
                        />
                      </div>
                    )
                  })}
                  <button>
                    Guardar beneficiario <SaveIcon className="icon" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </DashboardSection>
    </DashboradLayout>
  )
}
