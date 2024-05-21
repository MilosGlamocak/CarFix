import React, { useEffect, useState } from 'react'
import '../styles/Shop.css'
import {Container} from '@mui/material'
import {useAuth, useItems} from '../store'
import { getAllItems, createNewItem, getAllCarItems } from '../../lib/appwrite'
import ItemCard from '../components/ItemCard'
import LoadingAnimation from '../components/LoadingAnimation'

function Shop() {

  /*let [items, setItems] = useState([])*/

  let items = useItems((state) => state.items)

  useEffect(() => {
    //getAllItems()
    getAllCarItems()
  }, [])

  const {label} = useAuth((state) => state)
  
  return (
    <Container className='armoryCont'>
      <Container className='itemsCont'>
        { items.length > 0 ? items.map((item) => {
          return <ItemCard name={item.name} chamber={item.chamber} imageUrl={item.imageUrl} price={item.price} quantity={item.quantity} key={item.name} itemId={item.$id} publisher={item.users.username}/>
        })  : (<LoadingAnimation />)}
        
      </Container>
      
    </Container>
  )
}

export default Shop