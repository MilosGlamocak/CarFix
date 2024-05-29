import React from 'react'
import { signOut } from '../../lib/appwrite'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import {Container} from '@mui/material'
import '../styles/RouteContainer.css'
import { useAuth } from '../store'

function RouteContainer() {

  const username = useAuth((state) => state.username)
  const avatar = useAuth((state) => state.avatar)
  const label = useAuth((state) => state.label)
  /*let navigate = useNavigate()

  const handleSignOut = () => {
    signOut().then((res) => console.log(res))
    navigate('/')
  }*/
  return (
    <>
      <Container className='routeCont'>
          <Container className='logoCont'>
            <h1 className='logo'>CarFix</h1>
            <p>Fueled by passion, driven by purpose</p>
          </Container>
          
          <Container className='linkCont'>
          <Link to='/' className='link'><h3>Shop</h3></Link>
          <Link to='cart' className='link'><h3>Cart</h3></Link>
          { label === 'admin' &&  (<Link to='itemCreation' className='link'><h3>Create Item</h3></Link>)}
          <Link to='profile' className='link'>
            <img src={avatar} className='avatarSmall'></img>
            <h3>{username}</h3>
          </Link>
        </Container>
        
        <Outlet />
      </Container>
      
    </>
    
   
  )
}

export default RouteContainer