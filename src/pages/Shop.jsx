import React, { useEffect, useState } from 'react'
import '../styles/Shop.css'
import {Container} from '@mui/material'
import {useAuth, useItems} from '../store'
import { getAllItems, createNewItem, getAllCarItems, getCarItemsCategory, getCarItemsSearch } from '../../lib/appwrite'
import ItemCard from '../components/ItemCard'
import LoadingAnimation from '../components/LoadingAnimation'
import CustomInput from '../components/CustomInput'

function Shop() {

  /*let [items, setItems] = useState([])*/

  let items = useItems((state) => state.items)
  let [loading, setLoading] = useState(true)

  const handleGetAllItems = () => {
    setLoading(true)
    getAllCarItems().finally(() => setLoading(false))
  }

  useEffect(() => { 
    //getAllItems()
    handleGetAllItems()
  }, []) 

  const handleGetItemsCategory = (cat) => {
    setLoading(true)
    getCarItemsCategory(cat).finally(() => setLoading(false))
  }

  const handleSearchItems = (string) => {
    getCarItemsSearch(string)
  }

  const {label} = useAuth((state) => state)

  const categories = ['Filters', 'Belts', 'Oil', 'Brakes', 'Livery', 'Electronics', 'Wheels', 'Suspension', 'Miscellaneous'];
  
  return (
    <Container className='armoryCont'>
      
      <Container className='categoriesCont'>
      <CustomInput placeholder={'Search'} onChange={(e) => handleSearchItems(e.target.value)} className='searchInput'/>
      <Container className='categoriesLinksCont'>
      <h3 className='categoryBtn' onClick={handleGetAllItems}>All</h3>
        {categories.map((cat) => {
          return (<h3 className='categoryBtn' key={cat} onClick={() => handleGetItemsCategory(cat)}>{cat}</h3>)
        })}
      </Container>
      </Container>
      <Container className='itemsCont'>
        { !loading ? (items.length > 0 ? items.map((item) => {
            return (<ItemCard name={item.name} chamber={item.chamber} imageUrl={item.imageUrl} price={(item.price).toFixed(2)} quantity={item.quantity} key={item.name} itemId={item.$id} publisher={item.users.username} productCode={item.productCode}/>)
        }) : <h3 >No items match your search</h3>)  : <LoadingAnimation classname='loadingAnimShopCont'/>}
        
      </Container>
      
    </Container>
  )
}

export default Shop