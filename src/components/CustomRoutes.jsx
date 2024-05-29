import {Routes, Route, BrowserRouter} from 'react-router-dom';
import { checkForUser, createUser, signIn, signOut } from '../../lib/appwrite'
import { useAuth } from '../store'
import Shop from '../pages/Shop'
import Profile from '../pages/Profile'
import { useEffect, useState } from 'react';
import SignUp from '../(auth)/SignUp';

import React from 'react'
import SignIn from '../(auth)/SignIn';
import RouteContainer from './RouteContainer';
import ItemCreation from './ItemCreation';
import LoadingAnimation from './LoadingAnimation';
import Cart from '../pages/Cart';

function CustomRoutes() {

    const {sessionId, username} = useAuth((state) => state)
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        checkForUser().finally(() => {
          setLoading(false);
        })//checks who is logged in, then updates the zustand
      }, [])


  return (
    <>
      <BrowserRouter basename="CarFix" >
      <Routes>
          <Route path='/' element={<RouteContainer/>}>
            <Route path={!username ? '/' : 'signin'} index={!username && true} element={<SignIn/>} />
            <Route path='signup' element={<SignUp/>} />
            <Route path='/' index element={<Shop />}/>
            <Route path='profile' element={<Profile/>}/>
            <Route path='itemCreation' element={<ItemCreation/>}/>
            <Route path='cart' element={<Cart/>}/>
          </Route>
      </Routes>
      
      </BrowserRouter>
      {loading && <LoadingAnimation />}
    </>

  )
}

export default CustomRoutes