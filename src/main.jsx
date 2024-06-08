import '@/styles/animate.css'
import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource-variable/inter'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App.jsx'
import './index.css'

import UserProvider from './context/UserContext'
import theme from './theme'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <UserProvider>
          <App />
        </UserProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
