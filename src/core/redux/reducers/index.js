import { combineReducers } from 'redux'
import usersReducers from '../reducers/usersReducers'
import matterCancellationsReducers from '../reducers/matterCancellationsReducers'

export default combineReducers({
  usersReducers,
  matterCancellationsReducers,
})
