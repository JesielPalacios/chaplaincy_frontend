import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import SaveIcon from '@mui/icons-material/Save'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useInputValue } from '../core/hooks/useInputValue'
import { useUser } from '../core/hooks/useUser'
import { getCustomerService } from '../services/customer.service'
import { Link } from './Customer.styles'
import { Container, customerInputs } from './CustomerAddOrEdit.styles'
import { DashboardSection, DashboradLayout } from './layout/Layout'

export default function CustomerAddOrEdit({ title }) {
  const firstName = useInputValue('firstName')
  const secondName = useInputValue('secondName')
  const firstSurname = useInputValue('')
  const secondSurname = useInputValue('')
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
      case 'firstName': nameRef = firstName
      case 'secondName': nameRef = secondName
      case 'firstSurname': nameRef = firstSurname
      case 'secondSurname': nameRef = secondSurname
      case 'typeCitizenshipNumberId': nameRef = typeCitizenshipNumberId
      case 'citizenshipNumberId': nameRef = citizenshipNumberId
      case 'academicProgram': nameRef = academicProgram
      case 'studentCode': nameRef = studentCode
      case 'semester': nameRef = semester
      case 'email': nameRef = email
      case 'cellPhoneNumber': nameRef = cellPhoneNumber
      case 'address': nameRef = address
      case 'dateOfBirth': nameRef = dateOfBirth
      case 'birthCountry': nameRef = birthCountry
      case 'birthDepartment': nameRef = birthDepartment
      case 'birthCity': nameRef = birthCity
      default:
        nameRef = firstName
    }
  }
  
  useEffect(() => {
    // title === 'Editar beneficiario' && getCustomerService(dispatch, isAuth, customerId) && firstName.setValue( customer.firstName)
    title === 'Editar beneficiario' && getCustomerService(dispatch, isAuth, customerId) 

    // if (title === 'Editar beneficiario') {
      // await getCustomerService(dispatch, isAuth, customerId)
      // firstName.value = customer.firstName
    // }
    // console.log('customer.firstName', customer.firstName)
    
  }, [])

  return (
    <DashboradLayout>
      <DashboardSection title={title + ': ' + customerId}>
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
                    // referenceComparator(input.nameRef)
                    // console.log('input.nameRef', input.nameRef)

                    if (input.nameRef === 'firstName') nameRef = firstName
                    else if (input.nameRef === 'secondName') nameRef = secondName

                    return (
                      <div className="formInput" key={index}>
                        <label htmlFor={input.label.split(' ').join('')}>{input.label}</label>
                        <input type={input.type} id={input.label.split(' ').join('')} placeholder={input.placeholder}
                          // value={nameRef.value}
                          {...nameRef}
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
