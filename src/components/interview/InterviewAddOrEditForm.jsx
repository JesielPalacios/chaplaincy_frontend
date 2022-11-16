import SaveIcon from '@mui/icons-material/Save'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import Swal from 'sweetalert2'
import { createInterviewService } from './interviewService'

export default function CustomerAddOrEditForm(props) {
  let navigate = useNavigate()
  const [topic, setTopic] = useState()
  const [topicDescription, setTopicDescription] = useState()
  const [actionsDescription, setActionsDescription] = useState()
  const [referralDepartment, setReferralDepartment] = useState()
  const [status, setStatus] = useState()
  const [beneficiary, setBeneficiary] = useState()
  // -------------------------------------------------------------------------
  // const [topic, setTopic] = useState('Academico_Universitario')
  // const [topicDescription, setTopicDescription] = useState(
  //   'El estudiante está pasando por un mal momento de su vida debido a...'
  // )
  // const [actionsDescription, setActionsDescription] = useState(
  //   'Se le han dado una serie de indiaciones para...'
  // )
  // const [referralDepartment, setReferralDepartment] = useState(
  //   'Centro_de_Psicologia'
  // )
  // const [status, setStatus] = useState('Pendiente')
  // const [beneficiary, setBeneficiary] = useState()
  // -------------------------------------------------------------------------
  const { isAuth, dispatch, interview, customers, title, interviewId } = props

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

  const statusOptions = ['Pendiente', 'Completada', 'Cancelada']

  function checkDataValidationForNewInterview() {
    if (
      topic === undefined ||
      topicDescription === undefined ||
      actionsDescription === undefined ||
      referralDepartment === undefined ||
      status === undefined ||
      beneficiary === undefined
    )
      return true
  }

  function checkDataValidationForOldInterview() {
    if (
      interview.topic === 'null' ||
      interview.topicDescription === 'null' ||
      interview.actionsDescription === 'null' ||
      interview.referralDepartment === 'null' ||
      interview.status === 'null' ||
      interview.beneficiary === 'null'
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

  function createOrEditInterview() {
    createInterviewService(dispatch, isAuth, title, interviewId, {
      topic: topic,
      topicDescription: topicDescription,
      actionsDescription: actionsDescription,
      referralDepartment: referralDepartment,
      status: status,
      beneficiary: beneficiary,
    })
    // .then((id) => navigate('/entrevistas/' + id))
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (title === 'Agregar nueva entrevista') {
      if (checkDataValidationForNewInterview()) {
        showError()
      } else {
        createOrEditInterview()
      }
    } else if (title === 'Editar entrevista') {
      if (checkDataValidationForOldInterview()) {
        showError()
      } else {
        createOrEditInterview()
      }
    }
  }

  const fields = [
    {
      id: 'beneficiary',
      title: 'Beneficiario de la entrevista',
      important: true,
      element: (
        <Select
          inputId="beneficiary"
          options={customers.map((item) => ({
            label:
              // -----------------------------------------
              item.firstName &&
              item.firstName[0].toUpperCase() +
                item.firstName.slice(1).toLowerCase() +
                // -----------------------------------------
                ' ' +
                (item.secondName && item.secondName == 'null'
                  ? ''
                  : item.secondName &&
                    item.secondName[0].toUpperCase() +
                      item.secondName.slice(1).toLowerCase()) +
                ' ' +
                // -----------------------------------------
                (item.firstSurname &&
                  item.firstSurname[0].toUpperCase() +
                    item.firstSurname.slice(1).toLowerCase()) +
                ' ' +
                // -----------------------------------------
                (item.secondSurname && item.secondSurname == 'null'
                  ? ''
                  : item.secondSurname &&
                    item.secondSurname[0].toUpperCase() +
                      item.secondSurname.slice(1).toLowerCase()) +
                // -----------------------------------------
                ' - ' +
                (item.email && item.email == 'null'
                  ? ''
                  : item.email && item.email) +
                ' - ' +
                // -----------------------------------------
                (item.citizenshipNumberId &&
                  item.citizenshipNumberId &&
                  item.citizenshipNumberId) +
                ' - ' +
                // -----------------------------------------
                (item.cellPhoneNumber && item.cellPhoneNumber == 'null'
                  ? ''
                  : item.cellPhoneNumber && item.cellPhoneNumber) +
                ' - ' +
                // -----------------------------------------
                (item.address && item.address == 'null'
                  ? ''
                  : item.address && item.address),
            // -----------------------------------------

            value: item.citizenshipNumberId,
          }))}
          placeholder={'Seleccione el beneficiario de la entrevista aquí'}
          isClearable={true}
          hideSelectedOptions={true}
          styles={customStyles}
          onChange={({ value }) => setBeneficiary(value)}
          defaultValue={
            title === 'Editar entrevista'
              ? customers.map((item) => {
                  if (interview.beneficiary)
                    if (item.citizenshipNumberId == interview.beneficiary) {
                      // setBeneficiary(item.citizenshipNumberId)

                      return {
                        label:
                          // -----------------------------------------
                          item.firstName &&
                          item.firstName[0].toUpperCase() +
                            item.firstName.slice(1).toLowerCase() +
                            // -----------------------------------------
                            ' ' +
                            (item.secondName && item.secondName == 'null'
                              ? ''
                              : item.secondName &&
                                item.secondName[0].toUpperCase() +
                                  item.secondName.slice(1).toLowerCase()) +
                            ' ' +
                            // -----------------------------------------
                            (item.firstSurname &&
                              item.firstSurname[0].toUpperCase() +
                                item.firstSurname.slice(1).toLowerCase()) +
                            ' ' +
                            // -----------------------------------------
                            (item.secondSurname && item.secondSurname == 'null'
                              ? ''
                              : item.secondSurname &&
                                item.secondSurname[0].toUpperCase() +
                                  item.secondSurname.slice(1).toLowerCase()) +
                            // -----------------------------------------
                            ' - ' +
                            (item.email && item.email == 'null'
                              ? ''
                              : item.email && item.email) +
                            ' - ' +
                            // -----------------------------------------
                            (item.citizenshipNumberId &&
                              item.citizenshipNumberId &&
                              item.citizenshipNumberId) +
                            ' - ' +
                            // -----------------------------------------
                            (item.cellPhoneNumber &&
                            item.cellPhoneNumber == 'null'
                              ? ''
                              : item.cellPhoneNumber && item.cellPhoneNumber) +
                            ' - ' +
                            // -----------------------------------------
                            (item.address && item.address == 'null'
                              ? ''
                              : item.address && item.address),
                        // -----------------------------------------

                        value: item.citizenshipNumberId,
                      }
                    }
                })
              : ''
          }
          required
        />
      ),
    },
    {
      id: 'topic',
      title: 'Tipo de problemática / tema',
      important: true,
      element: (
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
            title === 'Editar entrevista'
              ? {
                  value: interview.topic,
                  label: interview.topic,
                }
              : ''
          }
          required
        />
      ),
    },
    {
      id: 'referralDepartment',
      title: 'Departamento de remisión',
      important: true,
      element: (
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
          onChange={({ value }) => setReferralDepartment(value)}
          defaultValue={
            title === 'Editar entrevista'
              ? {
                  value: interview.referralDepartment,
                  label: interview.referralDepartment,
                }
              : ''
          }
          required
        />
      ),
    },
    {
      id: 'status',
      title: 'Estado de la entrevista',
      important: true,
      element: (
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
          onChange={({ value }) => setStatus(value)}
          defaultValue={
            title === 'Editar entrevista'
              ? {
                  value: interview.status,
                  label: interview.status,
                }
              : ''
          }
          required
        />
      ),
    },
    {
      id: 'topicDescription',
      title: 'Descripción de la entrevista - informe',
      important: true,
      element: (
        <textarea
          id="topicDescription"
          // required
          placeholder="Información y conclusiones de la entrevista - informe aquí"
          onChange={(e) => setTopicDescription(e.target.value)}
          defaultValue={
            title === 'Editar entrevista' ? interview.topicDescription : ''
          }
        />
      ),
    },
    {
      id: 'actionsDescription',
      title: 'Descripción de acciones',
      important: true,
      element: (
        <textarea
          id="actionsDescription"
          // required
          placeholder="Acciones a tomar a partir de las concluciones aquí"
          onChange={(e) => setActionsDescription(e.target.value)}
          defaultValue={
            title === 'Editar entrevista' ? interview.actionsDescription : ''
          }
        />
      ),
    },
  ]

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((item) => (
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
