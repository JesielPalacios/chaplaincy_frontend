import './table.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export const List = (props) => {
  const rows = [
    {
      id: 1143155,
      product: 'Acer Nitro 5',
      img: 'https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg',
      customer: 'John Smith',
      date: '1 March',
      amount: 785,
      method: 'Cash on Delivery',
      status: 'Approved',
    },
    {
      id: 2235235,
      product: 'Playstation 5',
      img: 'https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg',
      customer: 'Michael Doe',
      date: '1 March',
      amount: 900,
      method: 'Online Payment',
      status: 'Pending',
    },
    {
      id: 2342353,
      product: 'Redragon S101',
      img: 'https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg',
      customer: 'John Smith',
      date: '1 March',
      amount: 35,
      method: 'Cash on Delivery',
      status: 'Pending',
    },
    {
      id: 2357741,
      product: 'Razer Blade 15',
      img: 'https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg',
      customer: 'Jane Smith',
      date: '1 March',
      amount: 920,
      method: 'Online',
      status: 'Approved',
    },
    {
      id: 2342355,
      product: 'ASUS ROG Strix',
      img: 'https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg',
      customer: 'Harold Carol',
      date: '1 March',
      amount: 2000,
      method: 'Online',
      status: 'Pending',
    },
  ]

  function setBeneficiary(beneficiary) {
    let name
    let matchedBeneficiary

    props.customers &&
      props.customers.map((item) => {
        if (item.citizenshipNumberId === beneficiary) {
          matchedBeneficiary = item
          name =
            item.firstName[0].toUpperCase() +
            item.firstName.slice(1).toLowerCase() +
            ' ' +
            item.firstSurname[0].toUpperCase() +
            item.firstSurname.slice(1).toLowerCase()
        }
      })
    return { name, beneficiaryFound: matchedBeneficiary }
  }

  function setChaplain(chaplain) {
    let name
    let matchedChaplain

    props.users &&
      props.users.map((item) => {
        if (item.citizenshipNumberId === chaplain) {
          matchedChaplain = item
          name =
            item.firstName[0].toUpperCase() +
            item.firstName.slice(1).toLowerCase() +
            ' ' +
            item.firstSurname[0].toUpperCase() +
            item.firstSurname.slice(1).toLowerCase()
        }
      })
    return { name, beneficiaryFound: matchedChaplain }
  }
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Beneficiario</TableCell>
            <TableCell className="tableCell">Categoría</TableCell>
            <TableCell className="tableCell">Descripción</TableCell>
            <TableCell className="tableCell">Capellán</TableCell>
            <TableCell className="tableCell">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.interviews &&
            props.interviews.map((row) => (
              <TableRow key={row._id}>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    {setBeneficiary(row.beneficiary).beneficiaryFound
                      .beneficiaryPhoto != 'null' ? (
                      <img
                        crossOrigin="anonymous"
                        crossorigin="anonymous"
                        className="image"
                        src={
                          'http://localhost:3001' +
                          setBeneficiary(row.beneficiary).beneficiaryFound
                            .beneficiaryPhoto
                        }
                        alt=" "
                      />
                    ) : (
                      <img
                        className="image"
                        src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        alt=" "
                      />
                    )}
                    {setBeneficiary(row.beneficiary).name}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row.topic}</TableCell>
                <TableCell className="tableCell">
                  {row.topicDescription}
                </TableCell>
                <TableCell className="tableCell">
                  {setChaplain(row.userCreate).name}
                </TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${row.status}`}>{row.status}</span>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
