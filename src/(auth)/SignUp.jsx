import React from 'react'
import { useState } from 'react';
import { createUser } from '../../lib/appwrite';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Container, CircularProgress } from '@mui/material';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

function SignUp() {
  let navigate = useNavigate()

  const [credentials, setCredentials] = useState({email: '', password: '', username:''})

  const [loading, setLoading] = useState(false);

  const handleSetCredentials = (e) => {
    const { id, value } = e.target;
    setCredentials({...credentials, [id]: value});
  }

  const handleSignUp = () => {
    setLoading(true)
    createUser(credentials.email, credentials.password, credentials.username).then((res) => {
      navigate(-1)
    }).catch((error) => console.error(error)).finally(() => {
      setLoading(false)
    })
  }
  return (
    <Container className='signInCont'>
    <Container className='signInHeader'>
      <h3 className='headerSmall'>New to</h3>
      <h1 className='headerBig'>Liberty Lockbox?</h1>
    </Container>
    <Container className='inputCont'>
      <CustomInput placeholder='Username' id='username' onChange={handleSetCredentials}/>
      <CustomInput placeholder='Email' id='email' onChange={handleSetCredentials}/>
      <CustomInput placeholder='Password' id='password' onChange={handleSetCredentials} type='password'/>
    </Container>
    
    <CustomButton onClick={handleSignUp} text={loading ? <CircularProgress style={{color: 'white', scale: '0.5'}} /> : 'Create an Account'} width='10rem'/>
    <Container className='signUpLinkCont'>
      <p className='signUpQuestion'>Already have an Account?</p>
      <Link to='/' className='signUpLink'>Sign In</Link>
    </Container>
    
    <Outlet />
  </Container>
  )
}

export default SignUp