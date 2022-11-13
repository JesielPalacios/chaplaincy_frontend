import SaveIcon from '@mui/icons-material/Save'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import Swal from 'sweetalert2'
import { getAllCustomersService } from '../beneficiary/beneficiaryService'
import { createCustomerService } from './beneficiaryService'

export default function CustomerAddOrEditForm(props) {
  const [topic, setTopic] = useState()
  const [topicDescription, setTopicDescription] = useState()
  const [actionsDescription, setActionsDescription] = useState()
  const [referralDepartment, seRreferralDepartment] = useState()
  const [status, setStatus] = useState()
  const [beneficiary, setBeneficiary] = useState()
  const [cities, setCities] = useState([])
  const navigate = useNavigate()
  const {
    isAuth,
    // dispatch,
    customer,
    // customers,
    title,
    beneficiaryId,
    beneficiaryPhoto,
  } = props

  const { customers } = useSelector((state) => state.customer)
  const dispatch = useDispatch()

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

  const topicOptions = [
    'Academico_Universitario',
    'Problemas_y_o_conflictos_familiares',
    'Auxilio_matricula',
    'Auxilio_manutencion',
    'Auxilio_plan_de_trabajo',
    'Bautismo_por_primera_vez_en_la_IASD',
    'Bautismo_por_segunda_vez_en_la_IASD',
    'Toma_de_profesion_de_posesion_en_la_IASD',
    'Toma_de_estudios_biblicos_para_bautismo_en_la_IASD',
    'Desercion_de_la_IASD',
    'Salud',
    'Deportes',
    'Clubes_adventistas',
    'Especiales_de_cantos_musicas_conciertos',
    'Ministerios_Adventistas',
    'Violacion',
  ]

  const referralDepartmentOptions = [
    'No_necesita_remision',
    'Centro_de_Psicologia',
    'Centro_de_Pediatria',
    'Respectivo_decano_de_la_facultad',
    'Pastor',
  ]

  const statusOptions = ['Pendiente', 'Completa', 'Cancelada']

  function checkDataValidation() {
    if (
      topic != null &&
      topicDescription != null &&
      actionsDescription != null &&
      referralDepartment != null &&
      status != null &&
      beneficiary != null
    ) {
      return true
    } else {
      return false
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (checkDataValidation()) {
      if (beneficiaryPhoto != null) {
        if (
          !(
            beneficiaryPhoto.name.endsWith('.png') ||
            beneficiaryPhoto.name.endsWith('.jpg') ||
            beneficiaryPhoto.name.endsWith('.jpeg')
          )
        ) {
          Swal.fire({
            title: '<strong>Error de archivo</strong>',
            icon: 'error',
            html: 'No se puede aceptar este tipo de archivo, elija una imágen del tipo indicado!',
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: 'Aceptar',
            confirmButtonAriaLabel: 'Aceptar',
          })
        }
      }

      createCustomerService(dispatch, isAuth, title, beneficiaryId, {
        topic: topic,
        topicDescription: topicDescription,
        actionsDescription: actionsDescription,
        referralDepartment: referralDepartment,
        status: status,
        beneficiary: beneficiary,
      }).then((id) => navigate('/beneficiario/' + id))
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
        cancelButtonAriaLabel: 'Cancelar',
      })
    }
  }

  useEffect(() => {
    title === 'Crear nuevo beneficiario' &&
      getAllCustomersService(dispatch, isAuth)
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <FormItem id="topic" title="Tipo de problemática / tema" important={true}>
        <Select
          inputId="topic"
          options={topicOptions.sort().map((item) => ({
            label: item,
            value: item,
          }))}
          placeholder={'Seleccione el tipo problemática/tema/categoría aquí'}
          isClearable={true}
          hideSelectedOptions={true}
          isSearchable={false}
          styles={customStyles}
          onChange={({ value }) => setTopic(value)}
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
        id="topicDescription"
        title="Descripción de la entrevista - informe"
        important={true}
      >
        <textarea
          id="topicDescription"
          placeholder="Información y conclusiones de la entrevista - informe aquí"
          onChange={(e) => setTopicDescription(e.target.value)}
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

      <FormItem
        id="actionsDescription"
        title="Descripción de acciones"
        important={true}
      >
        <textarea
          id="actionsDescription"
          placeholder="Acciones a tomar a partir de las concluciones aquí"
          onChange={(e) => setTopicDescription(e.target.value)}
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

      <FormItem
        id="referralDepartment"
        title="Departamento de remisión"
        important={true}
      >
        <Select
          inputId="referralDepartment"
          options={referralDepartmentOptions.sort().map((item) => ({
            label: item,
            value: item,
          }))}
          placeholder={'Departamento al cual se remite el caso aquí'}
          isClearable={true}
          hideSelectedOptions={true}
          isSearchable={false}
          styles={customStyles}
          onChange={({ value }) => setTopic(value)}
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

      <FormItem id="status" title="Estado de la entrevista" important={true}>
        <Select
          inputId="status"
          options={statusOptions.sort().map((item) => ({
            label: item,
            value: item,
          }))}
          placeholder={'Estado actual de la entrevista aquí'}
          isClearable={true}
          hideSelectedOptions={true}
          isSearchable={false}
          styles={customStyles}
          onChange={({ value }) => setTopic(value)}
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
        id="beneficiary"
        title="Beneficiario de la entrevista"
        important={true}
      >
        <Select
          inputId="beneficiary"
          options={customers.sort().map((item) => ({
            label:
              item.firsttName &&
              item.firsttName[0].toUpperCase() +
                item.firsttName.slice(1).toLowerCase() +
                // -----------------------------------------
                item.secondName &&
              item.secondSurname == 'null'
                ? ''
                : item.secondName &&
                  item.secondName[0].toUpperCase() +
                    item.secondName.slice(1).toLowerCase() +
                    // -----------------------------------------
                    item.firstSurnName &&
                  item.firstSurnName[0].toUpperCase() +
                    item.firstSurnName.slice(1).toLowerCase(),
            value: item._id,
          }))}
          placeholder={'Seleccione el beneficiario de la entrevista aquí'}
          isClearable={true}
          hideSelectedOptions={true}
          isSearchable={false}
          styles={customStyles}
          onChange={({ value }) => setTopic(value)}
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
        {console.log('customers', customers)}
      </FormItem>

      <button>
        Guardar entrevista <SaveIcon className="icon" />
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
