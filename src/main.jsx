import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {Toaster} from "react-hot-toast";
import { CartProvider } from './contex/CartContex.jsx';
import { UserProvider } from './contex/userContex.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Toaster/>
    <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserProvider>
  </BrowserRouter>
)
