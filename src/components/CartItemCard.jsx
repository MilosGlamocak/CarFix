import React, { useState } from 'react'
import '../styles/ItemCard.css'
import { CircularProgress, Container } from '@mui/material'
import CustomButton from './CustomButton'
import { useAuth, useItems } from '../store'
import LoadingAnimation from './LoadingAnimation'
import PropTypes from 'prop-types'

function CartItemCard({name, price, quantity, imageUrl, itemId, publisher, productCode}) {

  const { cartItems, addCartItem, clearCartItems, deleteCartItem } = useItems();

  const [loading, setLoading] = useState(false)

  const handleDeleteItem = () => {
    deleteCartItem(itemId);
  }


const {label} = useAuth((state) => state)

const units = 1

  return (
    <Container className='itemCardCont'>
        <Container className='cardContLeft'>
            <img src={imageUrl} className='itemImg'/>
            <Container className='cardTextLeft'>
                <h2 className='cardName'>{name}</h2>
                <Container className='cardInfoCont'><p className='cardInfo'>Product code:</p><p className='cardInfoBold'>{productCode}</p></Container>
                <Container className='cardInfoCont'><p className='cardInfo'>Price per Unit:</p><p className='cardInfoBold'>${price}</p></Container>
                <Container className='cardInfoCont'><p className='cardInfo'>Total Price:</p><p className='cardInfoBold'>${(Math.round(price * quantity * 100) / 100).toFixed(2)}</p></Container> 
            </Container>
        </Container> 
        <Container className='cardContRight'>
              <p>Units: {quantity}</p>
              <CustomButton text={loading ? <CircularProgress style={{color: 'white', scale: '0.5'}} /> : 'Remove'} border='1px solid #520909' onClick={handleDeleteItem}/>
            
            
        </Container>
    </Container>
  )
}

CartItemCard.propTypes = {
  name: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imageUrl: PropTypes.string,
  itemId: PropTypes.string,
  publisher: PropTypes.string,
  productCode: PropTypes.string
}

export default CartItemCard