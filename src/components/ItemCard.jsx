import React, { useState } from 'react'
import '../styles/ItemCard.css'
import { CircularProgress, Container } from '@mui/material'
import CustomButton from './CustomButton'
import CustomInput from './CustomInput'
import { useAuth, useItems } from '../store'
import { deleteItem, getAllItems, getAllCarItems, deleteCarItem } from '../../lib/appwrite'
import LoadingAnimation from './LoadingAnimation'

function ItemCard({name, price, quantity, imageUrl, itemId, publisher, productCode}) {

  const { cartItems, addCartItem, clearCartItems } = useItems();

  const [loading, setLoading] = useState(false)

  const handleDeleteItem = () => {
    setLoading(true)
    deleteCarItem(itemId).then(() => {
      getAllCarItems().then(() => setLoading(false))
    })
  }

  const handleAddItem = () => {
    const newItem = { name, price, imageUrl, itemId, publisher, productCode};
    addCartItem(newItem);
};

  const handleUpdateItem = (e) => {
    const {value, id} = e.target;
    console.log(value, id)
  }

  const itemInfo = [
    {title: 'Product Code: ', id: 'productCode', value: productCode, type: 'text', className: 'productCode'},
    {title: 'Price per Unit ($): ', id: 'price', value: price, type: 'number'},
    {title: 'In Stock: ', id: 'quantity', value: quantity, type: 'number'},
  ]

const {label} = useAuth((state) => state)

  return (
    <Container className='itemCardCont'>
        <Container className='cardContLeft'>
            <img src={imageUrl} className='itemImg'/>
            <Container className='cardTextLeft'>
                <h2 className='cardName'>{name}</h2>
                {itemInfo.map((item) => {
                  return (
                    <Container className='cardInfoCont' key={item.id}><p className='cardInfo'>{item.title} </p>{label === 'admin' ? (
                      <CustomInput id={item.id} value={item.value} className={`adminItemInput ${item.className}`} onChange={handleUpdateItem} type={item.type}/>
                    ): (<p className='cardInfoBold'>{item.value}</p>)}</Container>
                  )
                })}
                <Container className='cardInfoCont'><p className='cardInfo'>Added by: </p><p className='cardInfoBold'>{publisher}</p></Container>  
            </Container>
        </Container> 
        <Container className='cardContRight'>
            {label === 'admin' && (
              <>
              <CustomButton text={loading ? <CircularProgress style={{color: 'white', scale: '0.5'}} /> : 'Delete item'} border='1px solid #520909' onClick={handleDeleteItem}/>
              </>      
            )}
            <p>Units: 1</p>
            <CustomButton text='Add to Cart' border='1px solid #365F22' onClick={handleAddItem}/>
        </Container>
    </Container>
  )
}

export default ItemCard