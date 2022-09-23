import { AppRouter } from './AppRouter'
import { HelmetProvider } from 'react-helmet-async'

export function App() {
  return (
    <HelmetProvider>
      <AppRouter />
    </HelmetProvider>
  )
}
