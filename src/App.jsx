import { useEffect, useState } from 'react'
import { checkForUser, createUser, signIn, signOut } from '../lib/appwrite'
import { useAuth } from './store'
import RouteContainer from './components/RouteContainer'
import CustomRoutes from './components/CustomRoutes'
import { Container } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Container style={{
      position: 'absolute',
      padding: '0',
      maxWidth: '100%',
      height: '100%',
      backgroundColor: 'black'
    }}>
      <CustomRoutes/>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Container>
    
  )
}

export default App
