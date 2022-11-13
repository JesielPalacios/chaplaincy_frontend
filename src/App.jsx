import { HelmetProvider } from 'react-helmet-async'
import { AppRouter } from './AppRouter'
import { DarkModeContextProvider } from './core/context/darkModeContext'

export function App() {
  return (
    <HelmetProvider>
      <DarkModeContextProvider>
        <AppRouter />
      </DarkModeContextProvider>
    </HelmetProvider>
  )
}
