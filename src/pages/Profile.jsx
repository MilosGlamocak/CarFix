import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { signOut } from '../../lib/appwrite'
import {Container, CircularProgress} from '@mui/material'
import '../styles/Profile.css'
import { useAuth } from '../store'
import CustomButton from '../components/CustomButton'


function Profile() {

  const {username, avatar, email, label} = useAuth((state) => state)
  let navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const handleSignOut = () => {
    setLoading(true)
    signOut().then((res) => {
      setLoading(false);
      navigate('/')
    })
    
  }
  return (
    <Container className='profileCont'>
      <img src={avatar} className='avatarBig'></img>
      <Container className='userInfoText'>
        <h1 className='username'>{username}</h1>
        <h2 className='email'>{email}</h2>
        <h3 className='label'>({label})</h3>
      </Container>
      
      <CustomButton onClick={handleSignOut} text={loading ? <CircularProgress style={{color: 'white', scale: '0.5'}} /> : 'Sign Out'}/>
    </Container>
  )
}

export default Profile