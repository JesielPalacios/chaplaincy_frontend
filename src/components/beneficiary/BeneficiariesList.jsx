import { DataGrid } from '@mui/x-data-grid'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../core/hooks/useUser'
import { getAllCustomersService } from './beneficiaryService'
import { AddUser, Container } from './BeneficiariesList.styles'
import { DashboardSection, DashboradLayout } from '../layout/Layout'
import { Seo } from '../layout/Seo'

export default function CustomersList() {
  let navigate = useNavigate()
  const { isAuth } = useUser()

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Acciones',
      width: 135,
      description: 'Acciones de beneficiario',
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={'/beneficiarios/' + params.row._id}
              style={{ textDecoration: 'none' }}
            >
              <div className="viewButton">Ver</div>
            </Link>
            {/* <div className="deleteButton" onClick={() => handleDelete(params.row.id)}> */}
            <div className="deleteButton">Borrar</div>
          </div>
        )
      },
    },
  ]

  const userColumns = [
    {
      field: 'fullName',
      headerName: 'Nombre',
      description: 'Nombre de beneficiario',
      sortable: false,
      width: 320,
      // valueGetter: (params) =>
      // `${params.row.firstName || ""} ${params.row.lastName || ""}`,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {/* <img className="cellImg" src={params.row.img} alt="avatar" /> */}
            <img
              className="cellImg"
              src="https://via.placeholder.com/520x460"
              alt="avatar"
            />
            {params.row.firstName} {params.row.firstSurname}
          </div>
        )
      },
    },
    {
      field: 'email',
      headerName: 'Correo',
      description: 'Correo electrónico de beneficiarios',
      sortable: false,
      width: 320,
    },

    {
      field: 'cellPhoneNumber',
      headerName: 'Teléfono',
      description: 'Número celular de beneficiario',
      width: 120,
    },
    {
      field: 'address',
      headerName: 'Género',
      description: 'Género del beneficiarios',
      sortable: false,
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

  const { customers, loading, error } = useSelector((state) => state.customer)
  const dispatch = useDispatch()

  useEffect(() => {
    getAllCustomersService(dispatch, isAuth)
  }, [])

  return (
    <DashboradLayout>
      <Seo title="Beneficiarios" subtitle="Administración de beneficiarios" />

      <DashboardSection title={'Beneficiarios'}>
        <Container>
          <AddUser onClick={() => navigate('/beneficiarios/nuevo')}>
            Crear nuevo beneficiario
          </AddUser>

          {loading && 'cargando'}

          {error ? (
            'Hubo un error'
          ) : (
            <DataGrid
              className="datagrid"
              rows={customers}
              columns={userColumns.concat(actionColumn)}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection={false}
              getRowId={(row) => row.citizenshipNumberId}
              loading={loading}
              rowHeight={38}
              disableSelectionOnClick
            />
          )}
        </Container>
      </DashboardSection>
    </DashboradLayout>
  )
}
