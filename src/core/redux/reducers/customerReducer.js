import { actionType } from '../store/types/customersTypes'

const initialState = {
  customers: [],
  customerProfile: {},
  error: false,
  loading: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_ALL_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
        loading: false,
        error: false
      }

    case actionType.ERROR:
      return { ...state, error: action.payload, loading: false }

    case actionType.LOADING:
      return { ...state, loading: true }

    case actionType.GET_CUSTOMER_PROFILE:
      return {
        ...state,
        customerProfile: action.payload,
        loading: false
      }

    default:
      return initialState
  }
}
