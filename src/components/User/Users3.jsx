import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as LinkRouter, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useUser } from '../../core/hooks/useUser'
import { getCustomerService } from '../../services/customer.service'
import Chart from '../Chart'
import { DashboardSection, DashboradLayout } from '../layout/Layout'

export default function Users() {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const { customer, loading, error } = useSelector((state) => state.customer)
  const { isAuth } = useUser()

  useEffect(() => {
    getCustomerService(dispatch, isAuth, userId)
  }, [])

  return (
    <DashboradLayout>
      <DashboardSection title={'ID: ' + customer._id}>
        {/*  */}
        <Container>
          <Link to="/usuarios">Ir a beneficiarios</Link>
          <AddUser>Eliminar beneficiario</AddUser>

          {loading && (
            <LoadingWrapper>
              {/* <Loading>Cargando información de usuario...</Loading> */}
              <Spinner>
                <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </Spinner>
            </LoadingWrapper>
          )}

          <div className="scroll">
            {error ? (
              'Hubo un error'
            ) : (
              <div>
                <div className="top">
                  <div className="left">
                    <div className="editButton">Editar</div>
                    <h1 className="title">Información académica</h1>
                    <div className="item">
                      <img
                        src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                        alt={'Imágen del usuario ' + customer.firstName + ' ' + customer.firstSurname}
                        className="itemImg"
                      />
                      <div className="details">
                        <h1 className="itemTitle">
                          {(customer.firstName + ' ' + customer.firstSurname)
                            .trim()
                            .toLowerCase()
                            .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
                        </h1>
                        {customer.academicProgram && (
                          <div className="detailItem">
                            <span className="itemValue">Estudiante de {customer.academicProgram}</span>
                          </div>
                        )}
                        {customer.studentCode && (
                          <div className="detailItem">
                            <span className="itemKey">Código estudiantil:</span>
                            <span className="itemValue">{customer.studentCode}</span>
                          </div>
                        )}
                        {customer.semester && (
                          <div className="detailItem">
                            <span className="itemKey">Semestre académico actual:</span>
                            <span className="itemValue">{customer.semester}</span>
                          </div>
                        )}
                        <div className="detailItem">
                          <span className="itemKey">Correo:</span>
                          <span className="itemValue">{customer.email}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Facultad de:</span>
                          <span className="itemValue">{customer.academicProgram}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="left">
                    <div className="editButton">Editar</div>
                    <h1 className="title">Detalles personales</h1>
                    <div className="item">
                      <div className="details">
                        <div className="detailItem">
                          <span className="itemKey">Nombre completo:</span>
                          <span className="itemValue">
                            {(customer.firstName + ' ' + customer.secondName + ' ' + customer.firstSurname + ' ' + customer.secondSurname)
                              .trim()
                              .toLowerCase()
                              .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
                          </span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Tipo de documento de identidad:</span>
                          <span className="itemValue">{customer.typeCitizenshipNumberId}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Número de identificación:</span>
                          <span className="itemValue">{customer.citizenshipNumberId}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Dirección:</span>
                          <span className="itemValue">{customer.address}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Teléfono:</span>
                          <span className="itemValue">{customer.cellPhoneNumber}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Fecha de nacimiento:</span>
                          <span className="itemValue">
                            {customer.dateOfBirth.slice(8, 10)}/{customer.dateOfBirth.slice(6, 7)}/{customer.dateOfBirth.slice(0, 4)}
                          </span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">País de nacimiento:</span>
                          <span className="itemValue">{customer.countryOfBirth}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="right">
                  <Chart aspect={3 / 1} title="Cantidad de entrevistas ( Últimos 6 meses)" />
                </div>
              </div>
            )}
          </div>
        </Container>
        {/*  */}
      </DashboardSection>
    </DashboradLayout>
  )
}

const Container = styled.div`
  width: 95%;
  height: 85%;

  transform: translateY(20px);
  /* background-color: #fff; */
  /* border-radius: 10px; */
  /* padding: 20px; */
  /* height: 600px; */
  /* top: -15px; */
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: center; */

  position: relative;

  .scroll {
    overflow: hidden;
    overflow-y: scroll;
    width: 100%;
    height: 100%;
    padding-right: 15px;
  }

  .top {
    /* padding: 20px; */
    /* padding: 0 0 0 60px; */
    display: flex;
    gap: 20px;
    /* align-items: stretch; */
    /* flex-grow: 1; */
    /* flex-wrap: nowrap; */

    .left {
      background-color: #fff;
      border-radius: 10px;
      /* overflow: hidden; */

      flex: 1;
      -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
      box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
      padding: 20px;
      position: relative;

      .editButton {
        position: absolute;
        top: 0;
        right: 0;
        padding: 5px;
        font-size: 12px;
        color: #7451f8;
        background-color: #7551f818;
        cursor: pointer;
        border-radius: 0px 0px 0px 5px;
      }

      .item {
        display: flex;
        gap: 20px;

        .itemImg {
          width: 200px;
          height: 200px;
          border-radius: 10px;
          object-fit: cover;
        }

        .details {
          .itemTitle {
            margin-bottom: 10px;
            color: #555;

            display: block;
            font-size: 2em;
            /* margin-block-start: 0.67em; */
            margin-block-start: 0.27em;
            /* margin-block-end: 0.67em; */
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            font-weight: bold;

            padding-bottom: 10px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.25);
          }

          .detailItem {
            margin-bottom: 10px;
            font-size: 14px;

            .itemKey {
              font-weight: bold;
              color: gray;
              margin-right: 5px;
            }

            .itemValue {
              font-weight: 300;
            }
          }
        }
      }
    }

    .right {
      flex: 2;
    }
  }

  .bottom {
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
    padding: 20px;
    margin: 10px 20px;
  }

  .title {
    font-size: 16px;
    color: lightgray;
    margin-bottom: 20px;
  }
`

const Link = styled(LinkRouter)`
  position: absolute;
  top: -50px;
  right: 200px;
  text-decoration: none;

  border: none;
  // height: 100%;
  margin: 0px;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 600;
  border: 1px solid #f5a800;
  background: none;
  // color: #f5a800;
  cursor: pointer;
  transition: all 500ms ease 0s;
  color: #000;

  :hover {
    background-color: #f5a800;
    color: #ffffff;
  }
`
const AddUser = styled.button`
  position: absolute;
  top: ${({ top }) => (top ? top : '-50px')};
  right: ${({ right }) => (right ? right : '5px')};

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

const LoadingWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 500px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Loading = styled.span`
  color: #000;
  padding: 0.5em;
  font-size: 2em;
`
const Spinner = styled.div`
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #000;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #000 transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
