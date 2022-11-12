import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  /* top: -15px; */
  height: 600px;
  height: 92%;
  transform: translateY(25px);
  /* padding: 20px; */

  padding: 10px 10px;
  padding-left: 5px;

  .datagrid {
    background-color: #fff;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
    border-radius: 10px;
  }

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
      width: 37px;
      height: 37px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 20px;
    }

    /* &.Inexistente {
      background-color: #b54b25;
      background-color: #fdf2ee;
      color: #fc8e6a;
    } */
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

    div {
      display: flex;
      align-items: center;
      gap: 5px;
      border-radius: 10px;
    }
  }

  /* .css-1e2bxag-MuiDataGrid-root .MuiDataGrid-row:hover,
  .css-1e2bxag-MuiDataGrid-root .MuiDataGrid-row.Mui-hovered {
    :hover {
      background-color: rgba(9, 255, 0, 0.04);
    }
  } */

  .MuiDataGrid-columnHeaders,
  .css-f3jnds-MuiDataGrid-columnHeaders,
  .MuiDataGrid-columnHeader {
    color: #fff;
    background-color: #0f1141;
    background-color: #0f1141da;
    background-color: #2a5784;
    /* background-color: #072340; */
    /* background-color: rgba(9, 255, 0, 0.04); */
    font-weight: 600;
    font-size: 100px;
  }

  .MuiDataGrid-cell--textCenter,
  .MuiDataGrid-booleanCell,
  .MuiDataGrid-menuIcon,
  .MuiDataGrid-menuIconButton,
  .MuiDataGrid-sortIcon {
    color: #fff;
    /* background-color: #7679c9da; */
    border-radius: 10px;
    text-align: center;
    align-items: center;
    font-size: 40px;
    font-weight: 600;
  }

  .MuiDataGrid-row:hover {
    /* background-color: #000000b1; */
    /* :hover {
      background-color: #0000005d;
      background-color: #0f1141da;
      background-color: #0f114195;
      background-color: #51538b94;
      background-color: #9697af;
    } */
  }
`

export const AddUser = styled.button`
  border: none;
  border-radius: 10px;
  /* padding: 0.5rem 1rem; */
  /* padding: 2px 5px; */
  /* padding: 5px; */
  font-weight: 600;
  border: 1px solid #f5a800;
  /* background: #f5f5f5; */
  /* background: #eeeeee; */
  border: 1px solid #2a5784;
  background: none;
  // color: #f5a800;
  cursor: pointer;
  transition: all 500ms ease 0s;
  /*                                     */
  /* width: 150px; */
  padding: 15px;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;

  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 10px;

  transition: all 500ms ease 0s;
  /* background: none; */
  /* background-color: #fff; */
  color: #000;
  border: 1px solid #f5a800;
  border: 1px solid #2a5784;

  :hover {
    background-color: #f5a800;
    background-color: #2a5784;
    color: #ffffff;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  }
`

export const ButtonsWrapper = styled.div`
  position: absolute;
  /* top: 15px; */
  /* top: 5px; */
  right: 22.5px;
  right: 10px;
  height: 50px;
  display: flex;
  gap: 10px;
  z-index: 2;
`

export function Loading() {
  return (
    <LoadingWrapper>
      <Spinner>
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Spinner>
    </LoadingWrapper>
  )
}

export const LoadingWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 500px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

// const Loading = styled.span`
//   color: #000;
//   padding: 0.5em;
//   font-size: 2em;
// `

export const Spinner = styled.div`
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
