import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  /* width: 95%; */
  height: 85%;

  transform: translateY(10px);

  display: flex;

  .scroll {
    border-radius: 10px;
    overflow: hidden;
    overflow-y: scroll;
    width: 100%;
    /* height: 100%; */
  }

  .newContainer {
    flex: 6;

    .top,
    .bottom {
      background-color: #fff;
      border-radius: 10px;

      -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
      box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
      /* padding: 10px; */
      /* margin: 20px; */
      /* margin: 0 20px 20px 20px; */
      margin: 10px 20px;
      display: flex;

      h1 {
        color: lightgray;
        font-size: 20px;
      }

      .left {
        padding-top: 30px;
        flex: 1;
        text-align: center;

        img {
          width: 300px;
          height: 300px;
          /* border-radius: 50%; */
          border-radius: 10px;
          object-fit: cover;
        }
      }

      .right {
        padding-top: 30px;
        padding-bottom: 30px;
        flex: 2;

        form {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          justify-content: space-around;

          .formInput {
            width: 40%;

            label {
              display: flex;
              align-items: center;
              gap: 10px;
              cursor: pointer;

              .icon {
                cursor: pointer;
              }

              span {
                color: #f00;
              }

              sup {
                font-size: 10px;
              }
            }

            input {
              width: 100%;
              padding: 5px;
              border: none;
              border-bottom: 1px solid gray;
            }
          }

          button {
            /* width: 150px; */
            padding: 10px;
            border: none;
            color: white;
            font-weight: bold;
            cursor: pointer;
            margin-top: 10px;

            display: flex;
            align-items: center;
            gap: 5px;
            border-radius: 5px;

            transition: all 500ms ease 0s;
            /* background: none; */
            background-color: #fff;
            color: #000;
            border: 1px solid #f5a800;

            :hover {
              background-color: #f5a800;
              color: #ffffff;
            }
          }
        }
      }
    }
  }

  .button {
    /* position: absolute; */
    /* top: ${({ top }) => (top ? top : '-50px')}; */
    /* right: ${({ right }) => (right ? right : '5px')}; */

    border: none;
    // height: 100%;
    margin: 0px;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-weight: 600;
    border: 1px solid #f5a800;
    /* background: #f5f5f5; */
    /* background: #eeeeee; */
    // color: #f5a800;
    cursor: pointer;
    transition: all 500ms ease 0s;
    background: none;

    :hover {
      background-color: #f5a800;
      color: #ffffff;
    }
  }
`

export const customerInputs = [
  {
    nameRef: 'firstName',
    label: 'Primer nombre',
    type: 'text',
    placeholder: 'Escriba el primer nombre aquí',
    important: true
  },
  {
    nameRef: 'secondName',
    label: 'Segundo nombre',
    type: 'text',
    placeholder: 'Escriba el segundo nombre aquí'
  },
  {
    nameRef: 'firstSurname',
    label: 'Primer apellido',
    type: 'text',
    placeholder: 'Escriba el primer apellido aquí',
    important: true
  },
  {
    nameRef: 'secondSurname',
    label: 'Segundo apellido',
    type: 'text',
    placeholder: 'Escriba el segundo apellido aquí'
  },
  {
    nameRef: 'gender',
    label: 'Género',
    type: 'text',
    placeholder: 'Click para seleccionar el género',
    important: true
  },
  {
    nameRef: 'typeCitizenshipNumberId',
    label: 'Tipo de documento de identidad',
    type: 'text',
    placeholder: 'Click para seleccionar el tipo de documento',
    important: true
  },
  {
    nameRef: 'citizenshipNumberId',
    label: 'Número de identificación',
    type: 'text',
    placeholder: 'Escriba el número de identificación aquí',
    important: true
  },
  {
    nameRef: 'academicProgram',
    label: 'Programa académico (carrera)',
    type: 'text',
    placeholder: 'Escriba la carrera aquí'
  },
  {
    nameRef: 'studentCode',
    label: 'Código estudiantil',
    type: 'text',
    placeholder: 'Escriba el código estudiantil aquí'
  },
  {
    nameRef: 'semester',
    label: 'Semestre académico actual',
    type: 'text',
    placeholder: 'Escriba el semestre académico aquí'
  },
  {
    nameRef: 'email',
    label: 'Correo',
    type: 'text',
    placeholder: 'Escriba el correo electrónico aquí'
  },
  {
    nameRef: 'cellPhoneNumber',
    label: 'Número celular',
    type: 'text',
    placeholder: 'Escriba el número celular aquí'
  },
  {
    nameRef: 'address',
    label: 'Dirección de residencia (domicilio)',
    type: 'text',
    placeholder: 'Escriba la dirección aquí'
  },
  {
    nameRef: 'dateOfBirth',
    label: 'Fecha de nacimiento',
    type: 'text',
    placeholder: 'Escriba la fecha de nacimiento aquí',
    important: true
  },
  {
    nameRef: 'birthCountry',
    label: 'País de nacimiento',
    type: 'text',
    placeholder: 'Escriba el país de nacimiento aquí',
    important: true
  },
  {
    nameRef: 'birthDepartment',
    label: 'Departamento de nacimiento',
    type: 'text',
    placeholder: 'Escriba el departamento de nacimiento aquí',
    important: true
  },
  {
    nameRef: 'birthCity',
    label: 'Ciudad de nacimiento',
    type: 'text',
    placeholder: 'Escriba la ciudad de nacimiento aquí',
    important: true
  }
]
