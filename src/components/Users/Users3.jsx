import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { DashboardSection, DashboradLayout } from '../layout/Layout'
import { useState } from 'react'
import { userColumns, userRows } from './datatablesource'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCustomersService } from '../../services/customer.service'
import { useUser } from '../../core/hooks/useUser'
import { useEffect } from 'react'

export default function Users() {
  const [data, setData] = useState(userRows)
  const { isAuth } = useUser()

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id))
  }

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Acciones',
      width: 125,
      description: 'Acciones de beneficiario',
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={'/usuarios/' + params.row._id}
              style={{ textDecoration: 'none' }}
            >
              <div className="viewButton">Ver</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Borrar
            </div>
          </div>
        )
      }
    }
  ]

  const { customers, loading, error } = useSelector((state) => state.customer)
  console.log('customers, loading, error', customers, loading, error)
  const dispatch = useDispatch()

  useEffect(() => {
    getAllCustomersService(dispatch, isAuth)
  }, [])

  return (
    <DashboradLayout>
      <DashboardSection title={'Usuarios'}>
        {/*  */}
        <Container>
          {/* <div className="datatableTitle">
            Add New User
            <Link to="/users/new" className="link">
              Add New
            </Link>
          </div> */}

          <AddUser>Añadir usuario</AddUser>

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
              getRowId={(row) => row.customerCitizenshipNumberId}
              // NoRowsOverlay={() => 'No hay beneficiarios'}
              // components={{
              //   // noRowsOverlay: 'No hay beneficiarios'
              //   noRowsOverlay: () => 'No hay beneficiarios'
              // }}

              // NoRowsOverlay={() => 'hgygguh'}
              // noRowsOverlay={() => 'hgygguh'}
              loading={loading}
              rowHeight={38}
              // checkboxSelection
              disableSelectionOnClick
            />
          )}
        </Container>
        {/*  */}
      </DashboardSection>
    </DashboradLayout>
  )
}

const Container = styled.div`
  background-color: #fff;
  width: 90%;
  border-radius: 10px;

  /* height: 600px; */
  /* top: -15px; */
  height: 85%;
  transform: translateY(20px);
  /* padding: 20px; */

  .datatableTitle {
    width: 100%;
    font-size: 24px;
    color: gray;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .link {
      text-decoration: none;
      color: green;
      font-size: 16px;
      font-weight: 400;
      border: 1px solid green;
      padding: 5px;
      border-radius: 5px;
      cursor: pointer;
    }
  }

  .cellWithImg {
    display: flex;
    align-items: center;

    .cellImg {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 20px;
    }
  }

  .cellWithStatus {
    padding: 5px;
    border-radius: 5px;

    &.active {
      background-color: rgba(0, 128, 0, 0.05);
      color: green;
    }
    &.pending {
      background-color: rgba(255, 217, 0, 0.05);
      color: goldenrod;
    }
    &.passive {
      background-color: rgba(255, 0, 0, 0.05);
      color: crimson;
    }
    &.Masculino {
      background-color: #eff4ff;
      color: #5b93ff;
    }
    &.Femenino {
      background-color: #fdf2ee;
      color: #fc8e6a;
    }
  }

  .cellAction {
    display: flex;
    align-items: center;
    gap: 15px;

    .viewButton {
      padding: 2px 5px;
      border-radius: 5px;
      color: darkblue;
      border: 1px dotted rgba(0, 0, 139, 0.596);
      cursor: pointer;
    }

    .deleteButton {
      padding: 2px 5px;
      border-radius: 5px;
      color: crimson;
      border: 1px dotted rgba(220, 20, 60, 0.6);
      cursor: pointer;
    }
  }
`

const AddUser = styled.button`
  position: absolute;
  top: -50px;
  right: 5px;

  border: none;
  // height: 100%;
  margin: 0px;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 600;
  border: 1px solid #f5a800;
  /* background: #f5f5f5; */
  /* background: #eeeeee; */
  background: none;
  // color: #f5a800;
  cursor: pointer;
  transition: all 500ms ease 0s;

  :hover {
    background-color: #f5a800;
    color: #ffffff;
  }
`
