import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import AppContextProvider from './context/Appcontext.jsx'
import AdminContextProvider from './context/AdminContext.jsx'
import VendorContextProvider from './context/VendorContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <VendorContextProvider>
        <AppContextProvider>

          <App />
        </AppContextProvider>
      </VendorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>,
)
