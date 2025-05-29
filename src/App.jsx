import './App.css'
import AppRouter from './router/AppRouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
        <AppRouter />
    </QueryClientProvider>
  )
}

export default App
