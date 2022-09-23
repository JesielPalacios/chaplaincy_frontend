// import { createStore, applyMiddleware } from 'redux'
import { applyMiddleware } from 'redux'
import { legacy_createStore as createStore } from 'redux'
import reducers from '../reducers'
import reduxThunk from 'redux-thunk'

export const store = createStore(
  reducers,
  {},
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(reduxThunk)
)
