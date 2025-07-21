import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Chat from './pages/Chat'
import { UserProvider } from './context/UserContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <Chat />
    </UserProvider>
  </React.StrictMode>
)
