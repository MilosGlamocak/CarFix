import { useEffect, useState } from 'react'
import { checkForUser, createUser, signIn, signOut } from '../lib/appwrite'
import { useAuth } from './store'
import RouteContainer from './components/RouteContainer'
import CustomRoutes from './components/CustomRoutes'
import { Container } from '@mui/material'

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
    </Container>
    
  )
}

export default App
