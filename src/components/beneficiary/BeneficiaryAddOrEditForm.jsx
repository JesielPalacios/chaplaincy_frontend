import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import SaveIcon from '@mui/icons-material/Save'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import Swal from 'sweetalert2'
import { createCustomerService } from './beneficiaryService'
import { demographic } from './cities'
import { countries } from './countries'
import { states } from './states'

export default function CustomerAddOrEditForm(props) {
  let navigate = useNavigate()
  // --------------------------------------------------------------------------
  // const [firstName, setFirstName] = useState('Pepito')
  // const [secondName, setSecondName] = useState(undefined)
  // const [firstSurname, setFirstSurname] = useState('Pérez')
  // const [secondSurname, setSecondSurname] = useState(undefined)
  // const [gender, setGender] = useState('Masculino')
  // const [typeCitizenshipNumberId, setTypeCitizenshipNumberId] = useState(
  //   'Cédula de ciudadanía'
  // )
  // const [citizenshipNumberId, setCitizenshipNumberId] = useState('4567890123')
  // const [academicProgram, setAcademicProgram] = useState('No aplica')
  // const [studentCode, setStudentCode] = useState('No aplica')
  // const [semester, setSemester] = useState('No aplica')
  // const [email, setEmail] = useState(undefined)
  // const [cellPhoneNumber, setCellPhoneNumber] = useState(undefined)
  // const [address, setAddress] = useState(
  //   'Carrera 84#33aa-01 La Castellana /Medellin-Colombia'
  // )
  // const [birthDate, setBirthDate] = useState('2018-01-01')
  // const [birthCountry, setBirthCountry] = useState('Colombia')
  // const [birthDepartment, setBirthDepartment] = useState('Antioquia')
  // const [birthCity, setBirthCity] = useState('Medellín')
  // --------------------------------------------------------------------------
  // const [firstName, setFirstName] = useState()
  // const [secondName, setSecondName] = useState()
  // const [firstSurname, setFirstSurname] = useState()
  // const [secondSurname, setSecondSurname] = useState()
  // const [gender, setGender] = useState()
  // const [typeCitizenshipNumberId, setTypeCitizenshipNumberId] = useState()
  // const [citizenshipNumberId, setCitizenshipNumberId] = useState()
  // const [email, setEmail] = useState()
  // const [cellPhoneNumber, setCellPhoneNumber] = useState()
  // const [address, setAddress] = useState()
  // const [religion, setReligion] = useState()
  // const [maritalStatus, setMaritalStatus] = useState()
  // const [socialStratum, setSocialStratum] = useState()
  // const [categoryOrTypeOfOcupation, setCategoryOrTypeOfOcupation] = useState()
  // const [birthDate, setBirthDate] = useState()
  // const [birthCountry, setBirthCountry] = useState()
  // const [birthDepartment, setBirthDepartment] = useState()
  // const [academicProgram, setAcademicProgram] = useState()
  // const [studentCode, setStudentCode] = useState()
  // const [semester, setSemester] = useState()
  // const [birthCity, setBirthCity] = useState()
  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // const [firstName, setFirstName] = useState('Pepito')
  // const [secondName, setSecondName] = useState()
  // const [firstSurname, setFirstSurname] = useState('Pérez')
  // const [secondSurname, setSecondSurname] = useState()
  // const [gender, setGender] = useState('Masculino')
  // const [typeCitizenshipNumberId, setTypeCitizenshipNumberId] = useState(
  //   'Cédula de ciudadanía'
  // )
  // const [citizenshipNumberId, setCitizenshipNumberId] = useState('2345678901')
  // const [email, setEmail] = useState()
  // const [cellPhoneNumber, setCellPhoneNumber] = useState()
  // const [address, setAddress] = useState(
  //   'Carrera 84#33aa-01 La Castellana /Medellin-Colombia'
  // )
  // const [religion, setReligion] = useState('Cristiano')
  // const [maritalStatus, setMaritalStatus] = useState()
  // const [socialStratum, setSocialStratum] = useState()
  // const [categoryOrTypeOfOcupation, setCategoryOrTypeOfOcupation] = useState()
  // const [birthDate, setBirthDate] = useState('2000-01-01')
  // const [birthCountry, setBirthCountry] = useState('Colombia')
  // const [birthDepartment, setBirthDepartment] = useState('Antioquia')
  // const [birthCity, setBirthCity] = useState('Medellín')
  // const [academicProgram, setAcademicProgram] = useState('No aplica')
  // const [studentCode, setStudentCode] = useState()
  // const [semester, setSemester] = useState('No aplica')
  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  const [firstName, setFirstName] = useState()
  const [secondName, setSecondName] = useState()
  const [firstSurname, setFirstSurname] = useState()
  const [secondSurname, setSecondSurname] = useState()
  const [gender, setGender] = useState()
  const [typeCitizenshipNumberId, setTypeCitizenshipNumberId] = useState()
  const [citizenshipNumberId, setCitizenshipNumberId] = useState()
  const [email, setEmail] = useState()
  const [cellPhoneNumber, setCellPhoneNumber] = useState()
  const [address, setAddress] = useState()
  const [religion, setReligion] = useState()
  const [maritalStatus, setMaritalStatus] = useState()
  const [socialStratum, setSocialStratum] = useState()
  const [categoryOrTypeOfOcupation, setCategoryOrTypeOfOcupation] = useState()
  const [birthDate, setBirthDate] = useState()
  const [birthCountry, setBirthCountry] = useState()
  const [birthDepartment, setBirthDepartment] = useState()
  const [birthCity, setBirthCity] = useState()
  const [academicProgram, setAcademicProgram] = useState()
  const [studentCode, setStudentCode] = useState()
  const [semester, setSemester] = useState()
  // --------------------------------------------------------------------------
  const [cities, setCities] = useState([])
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

  const maritalStatusOptions = [
    'Soltero/a',
    'Casado/a',
    'Unión libre o unión de hecho',
    'Separado/a',
    'Divorciado/a',
    'Viudo/a.',
  ]

  const socialStratumOptions = [
    'Estrato 1 - Bajo-bajo',
    'Estrato 2 - Bajo',
    'Estrato 3 - Medio-bajo',
    'Estrato 4 - Medio',
    'Estrato 5 - Medio - Alto',
    'Estrato 6 - Alto',
  ]

  const religionOptions = ['Cristiano', 'Católico', 'Otra denominación']

  const categoryOcupationOptions = [
    'Otro',
    'Estudiante de la UNAC',
    'Estudiante de otra universidad',
    'Profesor - docente de la UNAC',
    'Profesor - docente de otra universidad',
    'Coordinador de la UNAC',
    'Coordinador de otra universidad',
    'Decano de la UNAC',
    'Decano de otra universidad',
    'Rector de la UNAC',
    'Rector de otra universidad',
    'Estudiante de otra universidad',
    'Miembro de la Iglesia Adventista del Séptimo Día (IASD)',
    'Miembro de otra iglesia',
    'Licenciatura en Educación Infantil',
    'Licenciatura en Español e Inglés',
    'Licenciatura en Matemáticas',
    'Licenciatura en Música',
    'Administración de Empresas',
    'Contaduría Pública',
    'Tecnología en Mercadeo',
    'Enfermería Profesional',
    'Tecnología en Atención Prehospitalaria - Medellín',
    'Tecnología en Atención Prehospitalaria - Bucaramanga',
    'Ingeniería Industrial',
    'Ingeniería de Sistemas',
    'Licenciatura en Educaión Religiosa',
    'Teología',
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
      firstName != undefined &&
      firstSurname != undefined &&
      gender != undefined &&
      typeCitizenshipNumberId != undefined &&
      citizenshipNumberId != undefined &&
      address != undefined &&
      birthDate != undefined &&
      birthCountry != undefined &&
      birthDepartment != undefined &&
      birthCity != undefined
    ) {
      return true
    } else {
      return false
    }
  }

  function checkDataValidationForNewBeneficiary() {
    if (
      firstName === undefined ||
      firstSurname === undefined ||
      gender === undefined ||
      typeCitizenshipNumberId === undefined ||
      citizenshipNumberId === undefined ||
      religion === undefined ||
      maritalStatus === undefined ||
      socialStratum === undefined ||
      categoryOrTypeOfOcupation === undefined ||
      birthDate === undefined ||
      birthCountry === undefined ||
      birthDepartment === undefined ||
      academicProgram === undefined ||
      semester === undefined ||
      birthCity === undefined
    )
      return true
  }

  function checkDataValidationForOldBeneficiary() {
    if (
      customer.firstName === 'undefined' ||
      customer.firstSurname === 'undefined' ||
      customer.gender === 'undefined' ||
      customer.typeCitizenshipNumberId === 'undefined' ||
      customer.citizenshipNumberId === 'undefined' ||
      customer.religion === 'undefined' ||
      customer.maritalStatus === 'undefined' ||
      customer.socialStratum === 'undefined' ||
      customer.categoryOrTypeOfOcupation === 'undefined' ||
      customer.birthDate === 'undefined' ||
      customer.birthCountry === 'undefined' ||
      customer.birthDepartment === 'undefined' ||
      customer.academicProgram === 'undefined' ||
      customer.semester === 'undefined' ||
      customer.birthCity === 'undefined'
    )
      return true
  }

  function showError() {
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
      cancelButtonAriaLabel: 'Cancelar',
    })
  }

  function createOrEditBeneficiary() {
    createCustomerService(dispatch, isAuth, title, beneficiaryId, {
      firstName,
      secondName,
      firstSurname,
      secondSurname,
      gender,
      typeCitizenshipNumberId,
      citizenshipNumberId,
      email,
      cellPhoneNumber,
      address,
      religion,
      maritalStatus,
      socialStratum,
      categoryOrTypeOfOcupation,
      birthDate,
      birthCountry,
      birthDepartment,
      birthCity,
      academicProgram,
      studentCode,
      semester,
      beneficiaryPhoto,
    }).then((id) => navigate('/beneficiarios/' + id))
  }

  function handleSubmit(e) {
    e.preventDefault()

    // // checkDataValidationForNewBeneficiary()
    // console.log(
    //   'checkDataValidationForNewBeneficiary()',
    //   checkDataValidationForNewBeneficiary()
    // )
    // if (title === 'Crear nuevo beneficiario') {
    //   if (beneficiaryPhoto != undefined) {
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

    //   if (checkDataValidationForNewBeneficiary()) {
    //     showError()
    //   } else {
    //     createOrEditBeneficiary()
    //   }
    // } else if (title === 'Editar beneficiario') {
    //   // if (!checkDataValidationForOldBeneficiary()) {
    //   //   showError()
    //   // } else {
    //   //   createOrEditBeneficiary()
    //   // }
    //   createOrEditBeneficiary()
    // }

    //
    createOrEditBeneficiary()
    //
  }

  const beneficiaryFields = [
    {
      id: 'firstName',
      title: 'Primer nombre',
      important: true,
      element: (
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
      ),
    },
    {
      id: 'secondName',
      title: 'Segundo nombre',
      element: (
        <input
          type="text"
          id="secondName"
          placeholder="Segundo nombre aquí"
          onChange={(e) => setSecondName(e.target.value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? customer.secondName && customer.secondSurname == 'undefined'
                ? ''
                : customer.secondName &&
                  customer.secondName[0].toUpperCase() +
                    customer.secondName.slice(1).toLowerCase()
              : ''
          }
        />
      ),
    },
    {
      id: 'firstSurname',
      title: 'Primer apellido',
      important: true,
      element: (
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
      ),
    },
    {
      id: 'secondSurname',
      title: 'Segundo apellido',
      element: (
        <input
          type="text"
          id="secondSurname"
          placeholder="Segundo apellido aquí"
          onChange={(e) => setSecondSurname(e.target.value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? customer.secondSurname && customer.secondSurname == 'undefined'
                ? ''
                : customer.secondSurname &&
                  customer.secondSurname[0].toUpperCase() +
                    customer.secondSurname.slice(1).toLowerCase()
              : ''
          }
        />
      ),
    },
    {
      id: 'gender',
      title: 'Género',
      important: true,
      element: (
        <Select
          inputId="gender"
          // required
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
        />
      ),
    },
    {
      id: 'typeCitizenshipNumberId',
      title: 'Tipo de documento de identificación',
      important: true,
      element: (
        <Select
          inputId="typeCitizenshipNumberId"
          // required
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
      ),
    },
    {
      id: 'citizenshipNumberId',
      title: 'Número de identificación',
      important: true,
      element: (
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
      ),
    },
    {
      id: 'email',
      title: 'Correo electrónico',
      element: (
        <input
          type="email"
          id="email"
          placeholder="Correo electrónico aquí"
          onChange={(e) => setEmail(e.target.value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? customer.email && customer.email == 'undefined'
                ? ''
                : customer.email && customer.email
              : ''
          }
        />
      ),
    },
    {
      id: 'cellPhoneNumber',
      title: 'Número de teléfono celular',
      element: (
        <input
          type="number"
          id="cellPhoneNumber"
          placeholder="Teléfono celular aquí"
          onChange={(e) => setCellPhoneNumber(e.target.value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? customer.cellPhoneNumber &&
                customer.cellPhoneNumber == 'undefined'
                ? ''
                : customer.cellPhoneNumber && customer.cellPhoneNumber
              : ''
          }
        />
      ),
    },
    {
      id: 'address',
      title: 'Dirección de residencia (domicilio)',
      element: (
        <input
          type="text"
          id="address"
          placeholder="Dirección de residencia aquí"
          onChange={(e) => setAddress(e.target.value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? customer.address && customer.address == 'undefined'
                ? ''
                : customer.address && customer.address
              : ''
          }
        />
      ),
    },
    {
      id: 'religion',
      title: 'Religión',
      important: true,
      element: (
        <Select
          inputId="religion"
          // required
          options={religionOptions.map((item) => ({
            label: item,
            value: item,
          }))}
          placeholder={'Click aquí para seleccionar o escribir'}
          isClearable={true}
          hideSelectedOptions={true}
          styles={customStyles}
          onChange={({ value }) => setReligion(value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? {
                  value: customer.religion,
                  label: customer.religion,
                }
              : ''
          }
        />
      ),
    },
    {
      id: 'maritalStatus',
      title: 'Estado civil',
      important: true,
      element: (
        <Select
          inputId="maritalStatus"
          // required
          options={maritalStatusOptions.map((item) => ({
            label: item,
            value: item,
          }))}
          placeholder={'Seleccione el estado civil aquí'}
          isClearable={true}
          hideSelectedOptions={true}
          isSearchable={false}
          styles={customStyles}
          onChange={({ value }) => setMaritalStatus(value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? {
                  value: customer.maritalStatus,
                  label: customer.maritalStatus,
                }
              : ''
          }
        />
      ),
    },
    {
      id: 'socialStratum',
      title: 'Estrato social',
      important: true,
      element: (
        <Select
          inputId="socialStratum"
          // required
          options={socialStratumOptions.map((item) => ({
            label: item,
            value: item,
          }))}
          placeholder={'Seleccione el estrato social aquí'}
          isClearable={true}
          hideSelectedOptions={true}
          isSearchable={false}
          styles={customStyles}
          onChange={({ value }) => setSocialStratum(value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? {
                  value: customer.socialStratum,
                  label: customer.socialStratum,
                }
              : ''
          }
        />
      ),
    },
    {
      id: 'categoryOrTypeOfOcupation',
      title: 'Categoría o tipo de beneficiario',
      important: true,
      element: (
        <Select
          inputId="categoryOrTypeOfOcupation"
          // required
          options={categoryOcupationOptions.map((item) => ({
            label: item,
            value: item,
          }))}
          placeholder={'Click aquí para seleccionar o escribir'}
          isClearable={true}
          hideSelectedOptions={true}
          styles={customStyles}
          onChange={({ value }) => setCategoryOrTypeOfOcupation(value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? {
                  value: customer.categoryOrTypeOfOcupation,
                  label: customer.categoryOrTypeOfOcupation,
                }
              : ''
          }
        />
      ),
    },
    {
      id: 'birthDate',
      title: 'Fecha de nacimiento',
      important: true,
      element: (
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
      ),
    },
    {
      id: 'birthCountry',
      title: 'País de nacimiento',
      important: true,
      element: (
        <Select
          inputId="birthCountry"
          // required
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
      ),
    },
    {
      id: 'birthDepartment',
      title: 'Departamento de nacimiento',
      important: true,
      element: (
        <Select
          inputId="birthDepartment"
          // required
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
      ),
    },
    {
      id: 'birthCity',
      title: 'Ciudad de nacimiento',
      important: true,
      element: (
        <Select
          inputId="birthCity"
          // required
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
      ),
    },
    {
      id: 'academicProgram',
      title: 'Programa académico',
      important: true,
      element: (
        <Select
          inputId="academicProgram"
          // required
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
      ),
    },
    {
      id: 'studentCode',
      title: 'Código de estudiante',
      element: (
        <input
          type="number"
          id="studentCode"
          placeholder="Código de estudiante aquí"
          onChange={(e) => setStudentCode(e.target.value)}
          defaultValue={
            title === 'Editar beneficiario'
              ? customer.studentCode && customer.studentCode == 'undefined'
                ? ''
                : customer.studentCode && customer.studentCode
              : ''
          }
        />
      ),
    },
    {
      id: 'semester',
      title: 'Semestre académico actual',
      important: true,
      element: (
        <Select
          inputId="semester"
          // required
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
      ),
    },
  ]

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

      {beneficiaryFields.map((item) => (
        <FormItem
          key={item.id}
          id={item.id}
          title={item.title}
          important={item.important}
        >
          {item.element}
        </FormItem>
      ))}

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
