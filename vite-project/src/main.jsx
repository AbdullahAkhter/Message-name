import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Authcontextprovider } from './context/Authcontext.jsx'
import { SocketContextProvider } from './context/socketcontext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Authcontextprovider>
      <SocketContextProvider> 
        <App />
      
      </SocketContextProvider>

    </Authcontextprovider>
  </BrowserRouter>,
)
