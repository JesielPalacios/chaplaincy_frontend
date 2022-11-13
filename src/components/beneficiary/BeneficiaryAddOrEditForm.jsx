import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import SaveIcon from '@mui/icons-material/Save'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'

import { createCustomerService } from './beneficiaryService'
import { demographic } from './cities'
import { countries } from './countries'
import { states } from './states'

export default function CustomerAddOrEditForm(props) {
  const [firstName, setFirstName] = useState('Pepito')
  const [secondName, setSecondName] = useState(null)
  const [firstSurname, setFirstSurname] = useState('Pérez')
  const [secondSurname, setSecondSurname] = useState(null)
  const [gender, setGender] = useState('Masculino')
  const [typeCitizenshipNumberId, setTypeCitizenshipNumberId] = useState(
    'Cédula de ciudadanía'
  )
  const [citizenshipNumberId, setCitizenshipNumberId] = useState('4567890123')
  const [academicProgram, setAcademicProgram] = useState('No aplica')
  const [studentCode, setStudentCode] = useState('No aplica')
  const [semester, setSemester] = useState('No aplica')
  const [email, setEmail] = useState(null)
  const [cellPhoneNumber, setCellPhoneNumber] = useState(null)
  const [address, setAddress] = useState(
    'Carrera 84#33aa-01 La Castellana /Medellin-Colombia'
  )
  const [birthDate, setBirthDate] = useState('2018-01-01')
  const [birthCountry, setBirthCountry] = useState('Colombia')
  const [birthDepartment, setBirthDepartment] = useState('Antioquia')
  const [birthCity, setBirthCity] = useState('Medellín')
  // --------------------------------------------------------------------------
  // const [firstName, setFirstName] = useState()
  // const [secondName, setSecondName] = useState()
  // const [firstSurname, setFirstSurname] = useState()
  // const [secondSurname, setSecondSurname] = useState()
  // const [gender, setGender] = useState()
  // const [typeCitizenshipNumberId, setTypeCitizenshipNumberId] = useState()
  // const [citizenshipNumberId, setCitizenshipNumberId] = useState()
  // const [academicProgram, setAcademicProgram] = useState()
  // const [studentCode, setStudentCode] = useState()
  // const [semester, setSemester] = useState()
  // const [email, setEmail] = useState()
  // const [cellPhoneNumber, setCellPhoneNumber] = useState()
  // const [address, setAddress] = useState()
  // const [birthDate, setBirthDate] = useState()
  // const [birthCountry, setBirthCountry] = useState()
  // const [birthDepartment, setBirthDepartment] = useState()
  // const [birthCity, setBirthCity] = useState()
  const [cities, setCities] = useState([])
  const navigate = useNavigate()
  const {
    isAuth,
    dispatch,
    customer,
    title,
    beneficiaryId,
    beneficiaryPhoto,
    setBeneficiaryPhoto,
  } = props

  const customStyles = {
    control: () => ({
      // none of react-select's styles are passed to <Control />
      display: 'flex',
      width: '100%',
      border: 'none',
      borderBottom: '1px solid gray',
      fontSize: '14px',
      cursor: 'pointer',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1
      const transition = 'opacity 300ms'
      const cursor = 'pointer'

      return { ...provided, opacity, transition, cursor }
    },
  }

  const genderOptions = [
    { value: 'Masculino', label: 'Masculino' },
    { value: 'Femenino', label: 'Femenino' },
    { value: 'No binario', label: 'No binario' },
  ]

  const typeCitizenshipNumberIdOptions = [
    { value: 'Cédula de ciudadanía', label: 'Cédula de ciudadanía' },
    { value: 'Tarjeta de identidad', label: 'Tarjeta de identidad' },
    { value: 'Cédula de extranjería', label: 'Cédula de extranjería' },
    { value: 'Visa', label: 'Visa' },
    { value: 'Pasaporte', label: 'Pasaporte' },
    { value: 'Registro Civil', label: 'Registro Civil' },
  ]

  const academicProgramOptions = [
    { value: 'No aplica', label: 'No aplica' },
    {
      value: 'Licenciatura en Educación Infantil',
      label: 'Licenciatura en Educación Infantil',
    },
    {
      value: 'Licenciatura en Español e Inglés',
      label: 'Licenciatura en Español e Inglés',
    },
    {
      value: 'Licenciatura en Matemáticas',
      label: 'Licenciatura en Matemáticas',
    },
    { value: 'Licenciatura en Música', label: 'Licenciatura en Música' },
    {
      value: 'Administración de Empresas',
      label: 'Administración de Empresas',
    },
    { value: 'Contaduría Pública', label: 'Contaduría Pública' },
    { value: 'Tecnología en Mercadeo', label: 'Tecnología en Mercadeo' },
    { value: 'Enfermería Profesional', label: 'Enfermería Profesional' },
    {
      value: 'Tecnología en Atención Prehospitalaria - Medellín',
      label: 'Tecnología en Atención Prehospitalaria - Medellín',
    },
    {
      value: 'Tecnología en Atención Prehospitalaria - Bucaramanga',
      label: 'Tecnología en Atención Prehospitalaria - Bucaramanga',
    },
    { value: 'Ingeniería Industrial', label: 'Ingeniería Industrial' },
    { value: 'Ingeniería de Sistemas', label: 'Ingeniería de Sistemas' },
    {
      value: 'Licenciatura en Educaión Religiosa',
      label: 'Licenciatura en Educaión Religiosa',
    },
    { value: 'Teología', label: 'Teología' },
  ]

  const semesterOptions = [
    { value: 'No aplica', label: 'No aplica' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
  ]

  function formatDate(date) {
    if (date) {
      let splitDate = date.split('-')
      return splitDate[0] + '-' + splitDate[1] + '-' + splitDate[2].slice(0, 2)
    }
  }

  function birthCityOptions() {
    let _cities = []
    for (let i = 0; i < demographic.length; i++) {
      _cities = _cities.concat(demographic[i].ciudades)
    }

    setCities(_cities)
  }

  function checkDataValidation() {
    if (
      firstName != null &&
      firstSurname != null &&
      gender != null &&
      typeCitizenshipNumberId != null &&
      citizenshipNumberId != null &&
      address != null &&
      birthDate != null &&
      birthCountry != null &&
      birthDepartment != null &&
      birthCity != null
    ) {
      return true
    } else {
      return false
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    // if (checkDataValidation()) {
    //   if (beneficiaryPhoto != null) {
    //     if (
    //       !(
    //         beneficiaryPhoto.name.endsWith('.png') ||
    //         beneficiaryPhoto.name.endsWith('.jpg') ||
    //         beneficiaryPhoto.name.endsWith('.jpeg')
    //       )
    //     ) {
    //       Swal.fire({
    //         title: '<strong>Error de archivo</strong>',
    //         icon: 'error',
    //         html: 'No se puede aceptar este tipo de archivo, elija una imágen del tipo indicado!',
    //         showCloseButton: true,
    //         showCancelButton: false,
    //         focusConfirm: false,
    //         confirmButtonText: 'Aceptar',
    //         confirmButtonAriaLabel: 'Aceptar',
    //       })
    //     }
    //   }

    //   createCustomerService(dispatch, isAuth, title, beneficiaryId, {
    //     firstName: firstName,
    //     secondName: secondName,
    //     firstSurname: firstSurname,
    //     secondSurname: secondSurname,
    //     gender: gender,
    //     typeCitizenshipNumberId: typeCitizenshipNumberId,
    //     citizenshipNumberId: citizenshipNumberId,
    //     academicProgram: academicProgram,
    //     studentCode: studentCode,
    //     semester: semester,
    //     email: email,
    //     cellPhoneNumber: cellPhoneNumber,
    //     address: address,
    //     birthDate: birthDate,
    //     birthCountry: birthCountry,
    //     birthDepartment: birthDepartment,
    //     birthCity: birthCity,
    //     beneficiaryPhoto,
    //   }).then((id) => navigate('/beneficiario/' + id))
    // } else {
    //   Swal.fire({
    //     title: '<strong>Faltan datos</strong>',
    //     icon: 'error',
    //     html: 'Verifique la infromación suministrada!',
    //     showCloseButton: true,
    //     showCancelButton: true,
    //     focusConfirm: false,
    //     confirmButtonText: 'Intentar de nuevo',
    //     confirmButtonAriaLabel: 'Intentar de nuevo',
    //     cancelButtonText: 'Cancelar',
    //     cancelButtonAriaLabel: 'Cancelar',
    //   })
    // }

    createCustomerService(dispatch, isAuth, title, beneficiaryId, {
      firstName: firstName,
      secondName: secondName,
      firstSurname: firstSurname,
      secondSurname: secondSurname,
      gender: gender,
      typeCitizenshipNumberId: typeCitizenshipNumberId,
      citizenshipNumberId: citizenshipNumberId,
      academicProgram: academicProgram,
      studentCode: studentCode,
      semester: semester,
      email: email,
      cellPhoneNumber: cellPhoneNumber,
      address: address,
      birthDate: birthDate,
      birthCountry: birthCountry,
      birthDepartment: birthDepartment,
      birthCity: birthCity,
      beneficiaryPhoto,
    })
  }

  useEffect(() => {
    birthCityOptions()
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <div className="formInput">
        <label htmlFor="beneficiaryPhoto" className="button">
          Click aquí para elegir la imágen:{' '}
          <DriveFolderUploadOutlinedIcon className="icon" />
        </label>
        <input
          type="file"
          id="beneficiaryPhoto"
          onChange={(e) => setBeneficiaryPhoto(e.target.files[0])}
          style={{ display: 'none' }}
        />
      </div>

      <FormItem id="firstName" title="Primer nombre" important={true}>
        <input
          type="text"
          id="firstName"
          // required
          placeholder="Primer nombre aquí"
          onChange={(e) => setFirstName(e.target.value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? customer.firstName &&
                customer.firstName[0].toUpperCase() +
                  customer.firstName.slice(1).toLowerCase()
              : ''
          }
        />
      </FormItem>

      <FormItem id="secondName" title="Segundo nombre">
        <input
          type="text"
          id="secondName"
          placeholder="Segundo nombre aquí"
          onChange={(e) => setSecondName(e.target.value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? customer.secondName && customer.secondSurname == 'null'
                ? ''
                : customer.secondName &&
                  customer.secondName[0].toUpperCase() +
                    customer.secondName.slice(1).toLowerCase()
              : ''
          }
        />
      </FormItem>

      <FormItem id="firstSurname" title="Primer apellido" important={true}>
        <input
          type="text"
          id="firstSurname"
          // required
          placeholder="Primer apellido aquí"
          onChange={(e) => setFirstSurname(e.target.value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? customer.firstSurname &&
                customer.firstSurname[0].toUpperCase() +
                  customer.firstSurname.slice(1).toLowerCase()
              : ''
          }
        />
      </FormItem>

      <FormItem id="secondSurname" title="Segundo apellido">
        <input
          type="text"
          id="secondSurname"
          placeholder="Segundo apellido aquí"
          onChange={(e) => setSecondSurname(e.target.value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? customer.secondSurname && customer.secondSurname == 'null'
                ? ''
                : customer.secondSurname &&
                  customer.secondSurname[0].toUpperCase() +
                    customer.secondSurname.slice(1).toLowerCase()
              : ''
          }
        />
      </FormItem>

      <FormItem id="gender" title="Género" important={true}>
        <Select
          inputId="gender"
          options={genderOptions}
          placeholder={'Seleccione el género aquí'}
          isClearable={true}
          hideSelectedOptions={true}
          isSearchable={false}
          styles={customStyles}
          onChange={({ value }) => setGender(value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? {
                  value: customer.gender,
                  label: customer.gender,
                }
              : ''
          }
          required
        />
      </FormItem>

      <FormItem
        id="typeCitizenshipNumberId"
        title="Tipo de documento de identificación"
        important={true}
      >
        <Select
          inputId="typeCitizenshipNumberId"
          options={typeCitizenshipNumberIdOptions}
          placeholder={'Seleccione el tipo de documento aquí'}
          isClearable={true}
          hideSelectedOptions={true}
          isSearchable={false}
          styles={customStyles}
          onChange={({ value }) => setTypeCitizenshipNumberId(value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? {
                  value: customer.typeCitizenshipNumberId,
                  label: customer.typeCitizenshipNumberId,
                }
              : ''
          }
        />
      </FormItem>

      <FormItem
        id="citizenshipNumberId"
        title="Número de identificación"
        important={true}
      >
        <input
          type="number"
          id="citizenshipNumberId"
          placeholder="Número de identificación aquí"
          onChange={(e) => setCitizenshipNumberId(e.target.value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? customer.citizenshipNumberId && customer.citizenshipNumberId
              : ''
          }
        />
      </FormItem>

      <FormItem id="email" title="Correo electrónico">
        <input
          type="text"
          id="email"
          placeholder="Correo electrónico aquí"
          onChange={(e) => setEmail(e.target.value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? customer.email && customer.email == 'null'
                ? ''
                : customer.email && customer.email
              : ''
          }
        />
      </FormItem>

      <FormItem id="cellPhoneNumber" title="Número de teléfono celular">
        <input
          type="number"
          id="cellPhoneNumber"
          placeholder="Teléfono celular aquí"
          onChange={(e) => setCellPhoneNumber(e.target.value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? customer.cellPhoneNumber && customer.cellPhoneNumber == 'null'
                ? ''
                : customer.cellPhoneNumber && customer.cellPhoneNumber
              : ''
          }
        />
      </FormItem>

      <FormItem id="address" title="Dirección de residencia (domicilio)">
        <input
          type="text"
          id="address"
          placeholder="Dirección de residencia aquí"
          onChange={(e) => setAddress(e.target.value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? customer.address && customer.address == 'null'
                ? ''
                : customer.address && customer.address
              : ''
          }
        />
      </FormItem>

      <FormItem id="birthDate" title="Fecha de nacimiento" important={true}>
        <input
          type="date"
          id="birthDate"
          // required
          placeholder="Plant discovery date goes here"
          onChange={(e) => setBirthDate(e.target.value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? formatDate(customer.birthDate)
              : ''
          }
        />
      </FormItem>

      <FormItem id="birthCountry" title="País de nacimiento" important={true}>
        <Select
          inputId="birthCountry"
          options={countries.sort().map(({ name }) => ({
            label: name,
            value: name,
          }))}
          placeholder={'Seleccione el país de nacimiento aquí'}
          isClearable={true}
          hideSelectedOptions={true}
          styles={customStyles}
          onChange={({ value }) => setBirthCountry(value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? {
                  value: customer.birthCountry,
                  label: customer.birthCountry,
                }
              : ''
          }
        />
      </FormItem>

      <FormItem
        id="birthDepartment"
        title="Departamento de nacimiento"
        important={true}
      >
        <Select
          inputId="birthDepartment"
          options={states.sort().map(({ name }) => ({
            label: name,
            value: name,
          }))}
          placeholder={'Click aquí para seleccionar o escribir'}
          isClearable={true}
          hideSelectedOptions={true}
          styles={customStyles}
          onChange={({ value }) => setBirthDepartment(value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? {
                  value: customer.birthDepartment,
                  label: customer.birthDepartment,
                }
              : ''
          }
        />
      </FormItem>

      <FormItem id="birthCity" title="Ciudad de nacimiento" important={true}>
        <Select
          inputId="birthCity"
          options={cities.sort().map((city) => ({
            label: city,
            value: city,
          }))}
          placeholder={'Click aquí para seleccionar o escribir'}
          isClearable={true}
          hideSelectedOptions={true}
          styles={customStyles}
          onChange={({ value }) => setBirthCity(value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? {
                  value: customer.birthCity,
                  label: customer.birthCity,
                }
              : ''
          }
        />
      </FormItem>

      <FormItem id="studentCode" title="Código de estudiante">
        <input
          type="number"
          id="studentCode"
          placeholder="Código de estudiante aquí"
          onChange={(e) => setStudentCode(e.target.value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? customer.studentCode && customer.studentCode == 'null'
                ? ''
                : customer.studentCode && customer.studentCode
              : ''
          }
        />
      </FormItem>

      <FormItem id="academicProgram" title="Programa académico">
        <Select
          inputId="academicProgram"
          options={academicProgramOptions}
          placeholder={'Seleccione el programa académico aquí'}
          isClearable={true}
          hideSelectedOptions={true}
          isSearchable={false}
          styles={customStyles}
          onChange={({ value }) => setAcademicProgram(value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? {
                  value: customer.academicProgram,
                  label: customer.academicProgram,
                }
              : ''
          }
        />
      </FormItem>

      <FormItem id="semester" title="Semestre académico actual">
        <Select
          inputId="semester"
          options={semesterOptions}
          placeholder={'Seleccione el semestre académico actual aquí'}
          isClearable={true}
          hideSelectedOptions={true}
          isSearchable={false}
          styles={customStyles}
          onChange={({ value }) => setSemester(value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? {
                  value: customer.semester,
                  label: customer.semester,
                }
              : ''
          }
        />
      </FormItem>

      <button>
        Guardar beneficiario <SaveIcon className="icon" />
      </button>
    </form>
  )
}

function FormItem({ children, id, title, important }) {
  return (
    <div className="formInput">
      <label htmlFor={id}>
        {title}

        {important && (
          <span>
            *<sup>Requerido</sup>
          </span>
        )}
      </label>

      {children}
    </div>
  )
}
