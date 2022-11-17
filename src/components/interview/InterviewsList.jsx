import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'
import PostAddIcon from '@mui/icons-material/PostAdd'
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined'
import VisibilityIcon from '@mui/icons-material/Visibility'
import {
  // bgBG
  esES as coreBgBG,
} from '@mui/material/locale'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { DataGrid, esES } from '@mui/x-data-grid'
import html2canvas from 'html2canvas'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { useUser } from '../../core/hooks/useUser'
import { getAllUsersService } from '../../services/user.service'
import { NoRows } from '../beneficiary/BeneficiariesList'
import { getAllCustomersService } from '../beneficiary/beneficiaryService'
import { DashboardSection, DashboradLayout } from '../layout/Layout'
import { Seo } from '../layout/Seo'
import {
  AddUser,
  ButtonsWrapper,
  Container,
  Loading,
} from './InterviewList.styles'
import {
  deleteInterviewService,
  getAllInterviewsService,
} from './interviewService'

export default function CustomersList() {
  let navigate = useNavigate()
  const { isAuth } = useUser()
  const {
    customer: { customers },
    interview: { interviews, loading, error },
    user: { users },
  } = useSelector((state) => state)
  const dispatch = useDispatch()

  function handleDelete(id, params) {
    let dataFromItemMatched

    customers.map((item) => {
      if (item.citizenshipNumberId === params.row.beneficiary) {
        dataFromItemMatched =
          item.firstName[0].toUpperCase() +
          item.firstName.slice(1).toLowerCase() +
          ' ' +
          item.firstSurname[0].toUpperCase() +
          item.firstSurname.slice(1).toLowerCase()
      }
    })

    Swal.fire({
      title: '¿Está seguro de eliminar?',
      text:
        'Esta acción no se podrá revertir, y se habrá borrado esta entrevista para el usuario ' +
        dataFromItemMatched +
        '.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--first)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar.',
      cancelButtonText: 'No, cancelar.',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteInterviewService(dispatch, isAuth, id)
        getAllInterviewsService(dispatch, isAuth)

        !(loading && error) &&
          Swal.fire(
            'Beneficiario eliminado',
            'El beneficiario ha sido eliminado exitosamente.',
            'success'
          )
        navigate('/entrevistas')
      }
    })
  }

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Acciones',
      width: 280,
      description: 'Acciones de beneficiario',
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={'/entrevistas/' + params.row._id}
              style={{ textDecoration: 'none' }}
            >
              <div className="viewButton">
                Ver
                <VisibilityIcon className="productListDelete" />
              </div>
            </Link>
            <Link
              to={'/entrevistas/' + params.row._id + '/editar'}
              style={{ textDecoration: 'none' }}
            >
              <div className="viewButton">
                Editar
                <EditIcon className="productListDelete" />
              </div>
            </Link>
            {/* <div className="deleteButton" onClick={() => handleDelete(params.row.id)}> */}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id, params)}
            >
              Borrar
              <DeleteOutlinedIcon className="productListDelete" />
            </div>
          </div>
        )
      },
    },
  ]

  const userColumns = [
    {
      field: '_id',
      headerName: '🤴🏾',
      // headerName: () => ' ' + ' ',
      description: 'Imágen del beneficiario',
      sortable: false,
      width: 20,
      renderCell: (params) => {
        let dataFromItemMatched

        customers.map((item) => {
          if (item.citizenshipNumberId === params.row.beneficiary) {
            dataFromItemMatched = item.beneficiaryPhoto
          }
        })

        return (
          <div className="cellWithImg">
            {dataFromItemMatched != 'null' ? (
              <img
                crossOrigin="anonymous"
                crossorigin="anonymous"
                className="cellImg"
                src={'http://localhost:3001' + dataFromItemMatched}
                alt=" "
              />
            ) : (
              <img
                className="cellImg"
                src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                alt=" "
              />
            )}
          </div>
        )
      },
    },

    {
      field: 'beneficiary',
      headerName: 'Beneficiario',
      description: 'Nombre y apellido del beneficiario',
      width: 160,
      valueGetter: ({ row: { beneficiary } }) => {
        let dataFromItemMatched

        customers.map((item) => {
          if (item.citizenshipNumberId === beneficiary) {
            dataFromItemMatched =
              item.firstName[0].toUpperCase() +
              item.firstName.slice(1).toLowerCase() +
              ' ' +
              item.firstSurname[0].toUpperCase() +
              item.firstSurname.slice(1).toLowerCase()
          }
        })
        return dataFromItemMatched
      },
    },

    {
      field: 'topicDescription',
      headerName: 'Descripción de la entrevista',
      description:
        'Descripción e información detallada de la entrevista beneficiarios',
      width: 240,
      valueGetter: ({ row: { topicDescription } }) => topicDescription,
    },

    {
      field: 'topic',
      headerName: 'Categoría',
      description: 'Categoría o tipo de la entrevista',
      width: 145,
      valueGetter: ({ row: { topic } }) => topic,
    },

    {
      field: 'userCreate',
      headerName: 'Capellán',
      description: 'Capellan de la entrevista',
      width: 120,
      valueGetter: ({ row: { userCreate } }) => {
        let dataFromItemMatched

        users.map((item) => {
          if (item.citizenshipNumberId === userCreate) {
            dataFromItemMatched =
              item.firstName[0].toUpperCase() +
              item.firstName.slice(1).toLowerCase() +
              ' ' +
              item.firstSurname[0].toUpperCase() +
              item.firstSurname.slice(1).toLowerCase()
          }
        })
        return dataFromItemMatched
      },
    },

    {
      field: 'status',
      headerName: 'Estado',
      description: 'Estado del proceso de la entrevista',
      width: 110,
      renderCell: ({ row: { status } }) => (
        <div className={`cellWithStatus ${status}`}>{status}</div>
      ),
    },
  ]

  const theme = createTheme(
    {
      palette: {
        primary: { main: '#1976d2' },
      },
    },
    esES, // x-data-grid translations
    // pickersBgBG, // x-date-pickers translations
    coreBgBG // core translations
  )

  const localizedTextsMap = {
    // columnMenuUnsort: 'não classificado',
    // columnMenuSortAsc: 'Classificar por ordem crescente',
    // columnMenuSortDesc: 'Classificar por ordem decrescente',
    // columnMenuFilter: 'Filtro',
    // columnMenuHideColumn: 'Ocultar',
    // columnMenuShowColumns: 'Mostrar colunas',
    columnMenuUnsort: 'Sin clasificación',
    columnMenuSortAsc: 'Clasificar por orden ascendente',
    columnMenuSortDesc: 'Clasificar por orden descendente',
    columnMenuFilter: 'Filtro/búsqueda',
    columnMenuHideColumn: 'Ocultar esta columna',
    columnMenuShowColumns: 'Mostrar/ocultar columnas',
    MuiTablePagination: {
      labelDisplayedRows: ({ from, to, count }) =>
        `${from} - ${to} de más de ${count}`,
    },
  }

  function exportImage() {
    // html2canvas(document.querySelector('#plantList')).then((canvas) => {
    //   var img = canvas.toDataURL('image/png')
    //   var link = document.createElement('a')
    //   link.download = 'export.png'
    //   link.href = img
    //   link.click()
    // })

    html2canvas(document.body).then((canvas) => {
      // html2canvas(document.querySelector('#plantList')).then((canvas) => {
      // html2canvas(document.getElementById("plantsList")).then((canvas) => {
      let img = canvas.toDataURL('image/png')
      let link = document.createElement('a')
      link.download = 'export.png'
      link.href = img
      link.click()
      link.remove()
    })
  }

  function handleUpdate() {
    Swal.fire({
      title: 'Actualizar lista',
      text: '¿Está seguro que quiere actualizar la lista de los beneficiarios?',
      icon: 'warning',
      showCancelButton: true,
      // confirmButtonColor: '#0f1141',
      confirmButtonColor: 'var(--first)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar.',
      cancelButtonText: 'No, cancelar.',
    }).then((result) => {
      if (result.isConfirmed) {
        let timerInterval
        Swal.fire({
          title: 'Loading..!',
          html: "Fetching your plants, don't worry.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          },
        }).then((result) => {
          getAllInterviewsService(dispatch, isAuth)
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            // console.log('I was closed by the timer')
          }
        })

        // !error && Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
      }
    })
  }

  useEffect(() => {
    getAllInterviewsService(dispatch, isAuth)
    getAllCustomersService(dispatch, isAuth)
    getAllUsersService(dispatch, isAuth)
  }, [])

  return (
    <DashboradLayout>
      <Seo title="Entrevistas" subtitle="Administración de beneficiarios" />
      <ButtonsWrapper>
        <AddUser onClick={exportImage}>
          Imprimir
          <PrintOutlinedIcon className="productListDelete" />
        </AddUser>
        <AddUser onClick={handleUpdate}>
          Actualizar lista
          <CachedOutlinedIcon className="productListDelete" />
        </AddUser>
        <AddUser onClick={() => navigate('/entrevistas/agregar')}>
          Crear nueva entrevista
          <PostAddIcon className="productListDelete" />
        </AddUser>
      </ButtonsWrapper>

      <DashboardSection title={'Entrevistas'}>
        <Container>
          <ThemeProvider theme={theme}>
            {loading && <Loading />}

            {error ? (
              'Hubo un error'
            ) : (
              <DataGrid
                className="datagrid cell--textCenter"
                rows={interviews}
                columns={userColumns.concat(actionColumn)}
                pageSize={50}
                rowsPerPageOptions={[50]}
                showColumnRightBorder={true}
                getRowId={(row) => row._id}
                loading={loading}
                rowHeight={65}
                disableSelectionOnClick
                components={{
                  NoRowsOverlay: () => (
                    <NoRows>
                      <h2>No hay entrevistas</h2>
                    </NoRows>
                  ),
                }}
              />
            )}
          </ThemeProvider>
        </Container>
      </DashboardSection>
    </DashboradLayout>
  )
}
