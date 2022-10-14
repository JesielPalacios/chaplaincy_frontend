import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import SaveIcon from '@mui/icons-material/Save'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

import { useInputValue } from '../core/hooks/useInputValue'
import { useUser } from '../core/hooks/useUser'
import { resetCustomer } from '../core/redux/customerSlice'
import { createCustomerService, getCustomerService } from '../services/customer.service'
import { Link } from './Customer.styles'
import { Container, customerInputs } from './CustomerAddOrEdit.styles'
import { DashboardSection, DashboradLayout } from './layout/Layout'
import { Seo } from './layout/Seo'

export default function CustomerAddOrEdit({ title }) {
  const firstName = useInputValue('Pipito')
  const secondName = useInputValue(null)
  const firstSurname = useInputValue('Perez')
  const secondSurname = useInputValue(null)
  const gender = useInputValue('Male')
  const typeCitizenshipNumberId = useInputValue('Cédula de ciudadanía')
  const citizenshipNumberId = useInputValue('4567890123')
  const academicProgram = useInputValue(null)
  const studentCode = useInputValue(null)
  const semester = useInputValue(null)
  const email = useInputValue(null)
  const cellPhoneNumber = useInputValue(null)
  const address = useInputValue(null)
  const dateOfBirth = useInputValue('01-01-2018')
  const birthCountry = useInputValue('Colombia')
  const birthDepartment = useInputValue('Antioquia')
  const birthCity = useInputValue('Medellín')
  const [customerPhoto, setCustomerPhoto] = useState(null)

  const { customerId } = useParams()
  const dispatch = useDispatch()
  const { customer, loading, error } = useSelector((state) => state.customer)
  const { isAuth } = useUser()

  let nameRef

  function referenceComparator(reference) {
    switch (reference) {
      case 'firstName':
        nameRef = firstName
        nameRef.value = customer.firstName
        break
      case 'secondName':
        nameRef = secondName
        nameRef.value = customer.secondName
        break
      case 'firstSurname':
        nameRef = firstSurname
        nameRef.value = customer.firstSurname
        break
      case 'secondSurname':
        nameRef = secondSurname
        nameRef.value = customer.secondSurname
        break
      case 'gender':
        nameRef = gender
        nameRef.value = customer.gender
        break
      case 'typeCitizenshipNumberId':
        nameRef = typeCitizenshipNumberId
        nameRef.value = customer.typeCitizenship
        break
      case 'citizenshipNumberId':
        nameRef = citizenshipNumberId
        nameRef.value = customer.citizenshipNumb
        break
      case 'academicProgram':
        nameRef = academicProgram
        nameRef.value = customer.academicProgram
        break
      case 'studentCode':
        nameRef = studentCode
        nameRef.value = customer.studentCode
        break
      case 'semester':
        nameRef = semester
        nameRef.value = customer.semester
        break
      case 'email':
        nameRef = email
        nameRef.value = customer.email
        break
      case 'cellPhoneNumber':
        nameRef = cellPhoneNumber
        nameRef.value = customer.cellPhoneNumber
        break
      case 'address':
        nameRef = address
        nameRef.value = customer.address
        break
      case 'dateOfBirth':
        nameRef = dateOfBirth
        nameRef.value = customer.dateOfBirth
        break
      case 'birthCountry':
        nameRef = birthCountry
        nameRef.value = customer.birthCountry
        break
      case 'birthDepartment':
        nameRef = birthDepartment
        nameRef.value = customer.birthDepartment
        break
      case 'birthCity':
        nameRef = birthCity
        nameRef.value = customer.birthCity
        break
      default:
        nameRef = firstName
        nameRef.value = customer.firstName
        break
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (firstName != null && firstSurname != null && gender != null && typeCitizenshipNumberId != null && dateOfBirth != null && birthCountry != null && birthDepartment != null && birthCity != null) {
      if (customerPhoto != null) {
        if (!(customerPhoto.name.endsWith('.png') || customerPhoto.name.endsWith('.jpg') || customerPhoto.name.endsWith('.jpeg'))) {
          Swal.fire({
            title: '<strong>Error de archivo</strong>',
            icon: 'error',
            html: 'No se puede aceptar este tipo de archivo, elija una imágen del tipo indicado!',
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: 'Aceptar',
            confirmButtonAriaLabel: 'Aceptar'
          })
        }
      }

      createCustomerService(dispatch, isAuth, {
        firstName: firstName.value,
        secondName: secondName.value,
        firstSurname: firstSurname.value,
        secondSurname: secondSurname.value,
        gender: gender.value,
        typeCitizenshipNumberId: typeCitizenshipNumberId.value,
        citizenshipNumberId: citizenshipNumberId.value,
        academicProgram: academicProgram.value,
        studentCode: studentCode.value,
        semester: semester.value,
        email: email.value,
        cellPhoneNumber: cellPhoneNumber.value,
        address: address.value,
        dateOfBirth: dateOfBirth.value,
        birthCountry: birthCountry.value,
        birthDepartment: birthDepartment.value,
        birthCity: birthCity.value,
        customerPhoto
      })
    } else {
      Swal.fire({
        title: '<strong>Faltan datos</strong>',
        icon: 'error',
        html: 'Verifique la infromación suministrada!',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Intentar de nuevo',
        confirmButtonAriaLabel: 'Intentar de nuevo',
        cancelButtonText: 'Cancelar',
        cancelButtonAriaLabel: 'Cancelar'
      })
    }
  }

  useEffect(() => {
    title === 'Crear nuevo beneficiario' && dispatch(resetCustomer())
    title === 'Editar beneficiario' && getCustomerService(dispatch, isAuth, customerId)
  }, [])

  return (
    <DashboradLayout>
      <Seo
        title={
          title === 'Crear nuevo beneficiario'
            ? 'Nuevo beneficiario'
            : (customer.firstName + ' ' + customer.firstSurname)
                .trim()
                .toLowerCase()
                .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
        }
        subtitle="Formulario de nuevo beneficiario"
      />
      <DashboardSection title={title === 'Crear nuevo beneficiario' ? title : title + ': ' + customerId}>
        <Container>
          <Link to="/beneficiarios" top="-45px" right="40px">
            Ir a beneficiarios
          </Link>

          <div className="newContainer scroll">
            <div className="bottom">
              <div className="left">
                <img src={customerPhoto ? URL.createObjectURL(customerPhoto) : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'} alt="" />
              </div>
              <div className="right">
                <form onSubmit={handleSubmit}>
                  <div className="formInput">
                    <label htmlFor="customerPhoto" className="button">
                      Click aquí para elegir la imágen: <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <input type="file" id="customerPhoto" onChange={(e) => setCustomerPhoto(e.target.files[0])} style={{ display: 'none' }} />
                  </div>

                  {customerInputs.map((input, index) => {
                    if (title === 'Crear nuevo beneficiario') {
                      // input.value = ''
                    } else {
                      referenceComparator(input.nameRef)
                    }

                    return (
                      <div className="formInput" key={index}>
                        <label htmlFor={input.label.split(' ').join('')}>
                          {input.label}
                          {input.important && (
                            <span>
                              *<sup>obligatorio</sup>
                            </span>
                          )}
                        </label>
                        <input type={input.type} id={input.label.split(' ').join('')} placeholder={input.placeholder} {...nameRef} />
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
