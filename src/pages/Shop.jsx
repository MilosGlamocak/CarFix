import React, { useEffect, useState } from 'react'
import '../styles/Shop.css'
import {Container} from '@mui/material'
import {useAuth, useItems} from '../store'
import { getAllItems, createNewItem, getAllCarItems, getCarItemsCategory } from '../../lib/appwrite'
import ItemCard from '../components/ItemCard'
import LoadingAnimation from '../components/LoadingAnimation'

function Shop() {

  /*let [items, setItems] = useState([])*/

  let items = useItems((state) => state.items)
  let [loading, setLoading] = useState(true)

  useEffect(() => { 
    //getAllItems()
    getAllCarItems().finally(() => setLoading(false))
  }, []) 

  const handleGetItemsCategory = (cat) => {
    setLoading(true)
    getCarItemsCategory(cat).finally((setLoading(false)))
  }

  const {label} = useAuth((state) => state)

  const categories = ['Filters', 'Belts', 'Oil', 'Brakes', 'Livery', 'Electronics', 'Wheels', 'Suspension', 'Miscellaneous'];
  
  return (
    <Container className='armoryCont'>
      <Container className='categoriesCont'>
        <h3 className='categoryBtn' onClick={() => getAllCarItems()}>All</h3>
        {categories.map((cat) => {
          return (<h3 className='categoryBtn' key={cat} onClick={() => handleGetItemsCategory(cat)}>{cat}</h3>)
        })}
      </Container>
      <Container className='itemsCont'>
        { items.length > 0 ? items.map((item) => {
          return <ItemCard name={item.name} chamber={item.chamber} imageUrl={item.imageUrl} price={(item.price).toFixed(2)} quantity={item.quantity} key={item.name} itemId={item.$id} publisher={item.users.username} productCode={item.productCode}/>
        })  : (loading ? <LoadingAnimation /> : <h2>No items match your search</h2>)}
        
      </Container>
      
    </Container>
  )
}

export default Shop