import { createTheme, ThemeProvider } from '@mui/material/styles'
import html2canvas from 'html2canvas'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
// import { DataGrid, bgBG } from '@mui/x-data-grid'
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'
import PostAddIcon from '@mui/icons-material/PostAdd'
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { esES as coreBgBG } from '@mui/material/locale'
import { DataGrid, esES } from '@mui/x-data-grid'
import Swal from 'sweetalert2'

import { useUser } from '../../core/hooks/useUser'
import { DashboardSection, DashboradLayout } from '../layout/Layout'
import { Seo } from '../layout/Seo'
import {
  AddUser,
  ButtonsWrapper,
  Container,
  Loading,
} from './BeneficiariesList.styles'
import {
  deleteBeneficiaryService,
  getAllCustomersService,
} from './beneficiaryService'

export default function CustomersList() {
  let navigate = useNavigate()
  const { isAuth } = useUser()
  const { customers, loading, error } = useSelector((state) => state.customer)
  const dispatch = useDispatch()

  function handleDelete(id) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta acción no se podrá revertir.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--first)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar.',
      cancelButtonText: 'No, cancelar.',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteBeneficiaryService(dispatch, isAuth, id)
        getAllCustomersService(dispatch, isAuth)

        !(loading && error) &&
          Swal.fire(
            'Beneficiario eliminado',
            'El beneficiario ha sido eliminado exitosamente.',
            'success'
          )
        navigate('/beneficiarios')
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
              to={'/beneficiarios/' + params.row._id}
              style={{ textDecoration: 'none' }}
            >
              <div className="viewButton">
                Ver
                <VisibilityIcon className="productListDelete" />
              </div>
            </Link>
            <Link
              to={'/beneficiarios/' + params.row._id + '/editar'}
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
              onClick={() => handleDelete(params.row._id)}
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
        return (
          <div className="cellWithImg">
            {params.row.beneficiaryPhoto != 'null' ? (
              <img
                crossOrigin="anonymous"
                crossorigin="anonymous"
                className="cellImg"
                src={'http://localhost:3001' + params.row.beneficiaryPhoto}
                alt="avatar"
              />
            ) : (
              <img
                className="cellImg"
                src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                alt="avatar"
              />
            )}
          </div>
        )
      },
    },

    {
      field: 'fullName',
      headerName: 'Beneficiario',
      description: 'Nombre y apellido del beneficiario',
      width: 160,
      valueGetter: (params) =>
        `${
          params.row.firstName[0].toUpperCase() +
            params.row.firstName.slice(1).toLowerCase() || ''
        }
        ${
          params.row.firstSurname[0].toUpperCase() +
            params.row.firstSurname.slice(1).toLowerCase() || ''
        }
        `,
    },

    {
      field: 'email',
      headerName: 'Descripción de la entrevista',
      description: 'Correo electrónico de beneficiarios',
      width: 250,
      valueGetter: (params) =>
        `${params.row.email != 'null' ? params.row.email : 'Inexistente'}`,
    },
    {
      field: 'citizenshipNumberId',
      headerName: 'Categoría',
      description: 'Número de identificación del beneficiario',
      width: 132,
      valueGetter: (params) =>
        `${
          params.row.cellPhoneNumber != 'null'
            ? params.row.citizenshipNumberId
            : 'Inexistente'
        }`,
    },
    {
      field: 'cellPhoneNumber',
      headerName: 'Capellán',
      description: 'Número celular de beneficiario',
      width: 120,
      valueGetter: (params) =>
        `${
          params.row.cellPhoneNumber != 'null'
            ? params.row.cellPhoneNumber
            : 'Inexistente'
        }`,
    },
    {
      field: 'genre',
      headerName: 'Estado',
      description: 'Género del beneficiarios',
      // sortable: false,
      width: 110,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.gender}`}>
            {params.row.gender}
          </div>
        )
      },
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
          getAllCustomersService(dispatch, isAuth)
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
    getAllCustomersService(dispatch, isAuth)
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
                rows={customers}
                columns={userColumns.concat(actionColumn)}
                pageSize={50}
                rowsPerPageOptions={[50]}
                // checkboxSelection={true}
                showColumnRightBorder={true}
                getRowId={(row) => row.citizenshipNumberId}
                loading={loading}
                // rowHeight={38}
                rowHeight={65}
                disableSelectionOnClick
                // localeText={
                //   //   {
                //   //   MuiTablePagination: {
                //   //     labelDisplayedRows: ({ from, to, count }) =>
                //   //       `${from} - ${to} de más de ${count}`,
                //   //   },
                //   //   // toolbarDensity: 'Size',
                //   //   // toolbarDensityLabel: 'Size',
                //   //   // toolbarDensityCompact: 'Small',
                //   //   // toolbarDensityStandard: 'Medium',
                //   //   // toolbarDensityComfortable: 'Large',

                //   // }
                //   localizedTextsMap
                // }
              />
            )}
          </ThemeProvider>
        </Container>
      </DashboardSection>
    </DashboradLayout>
  )
}
