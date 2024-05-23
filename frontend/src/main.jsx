import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AppContextProvider } from './context/AppContext.jsx'

import { Toaster } from 'react-hot-toast'
const queryClient = new QueryClient({
  defaultOptions: {
    queries : {
      retry : 0
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <QueryClientProvider client = {queryClient}>
      <AppContextProvider>
          <BrowserRouter>
            <App />
            <Toaster />
          </BrowserRouter>
        </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
