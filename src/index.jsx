import React from 'react'
import ReactDOM from 'react-dom/client'

import Context from './core/context/UserContext'
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Context.Provider>
      <App />
    </Context.Provider>
  </React.StrictMode>
)
