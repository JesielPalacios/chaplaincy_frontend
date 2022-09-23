import { actionType } from '../store/types/usersTypes'

const initialState = {
  users: [],
  userProfile: {},
  userFromAcademicProcess: {},
  error: false,
  loading: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: false
      }

    case actionType.ERROR:
      return { ...state, error: action.payload, loading: false }

    case actionType.LOADING:
      return { ...state, loading: true }

    case actionType.GET_USER_FROM_ACADEMIC_PROCESS:
      return {
        ...state,
        userFromAcademicProcess: action.payload,
        loading: false
      }

    default:
      return initialState
  }
}
