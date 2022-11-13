import { Link as LinkRouter } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
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
      overflow: hidden;
      flex: 1;
      background-color: #fff;
      border-radius: 10px;
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
            /* margin-block-start: 0.27em; */
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

export const Link = styled(LinkRouter)`
  position: absolute;
  top: ${({ top }) => (top ? top : '-50px')};
  right: ${({ right }) => (right ? right : '200px')};
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

// export const AddUser = styled.button`
//   position: absolute;
//   top: ${({ top }) => (top ? top : '-50px')};
//   right: ${({ right }) => (right ? right : '5px')};

//   border: none;
//   // height: 100%;
//   margin: 0px;
//   border-radius: 0.5rem;
//   padding: 0.5rem 1rem;
//   font-weight: 600;
//   border: 1px solid #f5a800;
//   /* background: #f5f5f5; */
//   /* background: #eeeeee; */
//   background: none;
//   // color: #f5a800;
//   cursor: pointer;
//   transition: all 500ms ease 0s;

//   :hover {
//     background-color: #f5a800;
//     color: #ffffff;
//   }
// `
