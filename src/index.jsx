import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react'

import Context from './core/context/UserContext'

import { App } from './App'

// import { persistor, store } from './core/redux/store'
import { store } from './core/redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Context.Provider>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <App />
      {/* </PersistGate> */}
    </Provider>
  </Context.Provider>
)
