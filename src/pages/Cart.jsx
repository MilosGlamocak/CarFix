import React, { useState } from 'react'
import { Container } from '@mui/material'
import '../styles/Cart.css'
import { useItems } from '../store'
import CartItemCard from '../components/CartItemCard'
import CustomButton from '../components/CustomButton'
import CheckoutModal from '../components/CheckoutModal'

function Cart() {

  let [open, setOpen] = useState(false)

    const cartItems = useItems((state) => state.cartItems)
    let totalCost = 0;

    const handleOpenClose = () => {
      setOpen(!open)
    }

  return (
    <Container className='cartCont'>
        <Container className='CartItemsCont'>
        {cartItems.length > 0 ? cartItems.reverse().map((item) => {
            totalCost += item.price*item.units
            return <CartItemCard imageUrl={item.imageUrl} name={item.name} price={item.price} key={item.itemId} itemId={item.itemId} quantity={item.units} productCode={item.productCode}/>
        }) : (<h3>No items in cart</h3>)}
        <p>Total cost: ${(Math.round(totalCost * 100)/100).toFixed(2)}</p>
        <CustomButton text='Proceed to Checkout' border='1px solid #365F22' backgroundColor='#365F22' height='3rem' onClick={handleOpenClose}/>
        <CheckoutModal open={open} handleClose={handleOpenClose} cartItems={cartItems}/>
        </Container>
        
    </Container>
  )
}

export default Cart