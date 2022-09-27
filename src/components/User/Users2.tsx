// import * as React from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import styled from "styled-components";
// import { DashboardSection, DashboradLayout } from "./layout/Layout";

// const columns = [
//   { field: "id", headerName: "ID", width: 90 },

//   {
//     field: "fullName",
//     headerName: "Nombres completos",
//     // description: "This column has a value getter and is not sortable.",
//     // sortable: false,
//     sortable: true,
//     // width: 170,
//     width: 220,
//     valueGetter: (params) =>
//       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
//   },

//   {
//     field: "email",
//     headerName: "Correo electrónico",
//     sortable: true,
//     //  width: 155
//     width: 210,
//   },

//   { field: "cellPhoneNumber", headerName: "Número celular", width: 190 },

//   {
//     field: "gender",
//     headerName: "Género",
//     // type: "number",
//     width: 125,
//   },
// ];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
//   // //
//   // { id: 10, lastName: "Snow", firstName: "Jon", age: 35 },
//   // { id: 11, lastName: "Snow", firstName: "Jon", age: 35 },
//   // { id: 12, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   // { id: 13, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   // { id: 14, lastName: "Stark", firstName: "Arya", age: 16 },
//   // { id: 15, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   // { id: 16, lastName: "Melisandre", firstName: null, age: 150 },
//   // { id: 17, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   // { id: 18, lastName: "Frances", firstName: "Rossini", age: 36 },
//   // { id: 19, lastName: "Roxie", firstName: "Harvey", age: 65 },
//   // { id: 20, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

// export default function Users() {
//   return (
//     <DashboradLayout>
//       <DashboardSection title={"Usuarios"}>
//         {/*  */}
//         <Container>
//           <div style={{ height: 450, width: "100%" }}>
//             <DataGrid
//               rows={rows}
//               columns={columns}
//               pageSize={10}
//               rowsPerPageOptions={[5]}
//               checkboxSelection
//             />
//           </div>
//         </Container>
//         {/*  */}
//       </DashboardSection>
//     </DashboradLayout>
//   );
// }

// const Container = styled.div`
//   background-color: #fff;
//   width: 90%;
//   border-radius: 10px;
// `;
