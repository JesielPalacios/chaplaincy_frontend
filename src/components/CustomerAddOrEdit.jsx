import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import SaveIcon from '@mui/icons-material/Save'
import { useState } from 'react'
import { Link } from './Customer.styles'
import { Container, customerInputs } from './CustomerAddOrEdit.styles'
import { DashboardSection, DashboradLayout } from './layout/Layout'

export default function CustomerAddOrEdit() {
  const [file, setFile] = useState('')

  return (
    <DashboradLayout>
      <DashboardSection title="Crear nuevo beneficiario">
        <Container>
          <Link to="/beneficiarios" top="-45px" right="40px">
            Ir a beneficiarios
          </Link>

          <div className="newContainer scroll">
            {/* <div className="top"><h1>{title}</h1></div> */}
            <div className="bottom">
              <div className="left">
                <img src={file ? URL.createObjectURL(file) : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'} alt="" />
              </div>
              <div className="right">
                <form>
                  <div className="formInput">
                    <label htmlFor="file" className="button">
                      Click aquí para elegir la imágen: <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: 'none' }} />
                  </div>

                  {customerInputs.map((input, index) => (
                    <div className="formInput" key={index}>
                      {/* <label htmlFor={input.label.replace(/\s+/g, '')}>{input.label}</label>
                      <input type={input.type} id={input.label.replace(/\s+/g, '')}  placeholder={input.placeholder} /> */}
                      <label htmlFor={input.label.split(' ').join('')}>{input.label}</label>
                      <input type={input.type} id={input.label.split(' ').join('')} placeholder={input.placeholder} />
                    </div>
                  ))}
                  <button>
                    Guardar beneficiario <SaveIcon className="icon" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </DashboardSection>
    </DashboradLayout>
  )
}
