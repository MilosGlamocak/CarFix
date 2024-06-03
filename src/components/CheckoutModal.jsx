import React, { useEffect } from 'react'
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { Container } from '@mui/material';
import '../styles/CheckoutModal.css';
import CustomInput from './CustomInput'
import CustomButton from './CustomButton'
import CartItemCard from './CartItemCard';
import CheckoutItemCard from './CheckoutItemCard'
import { updateCarItem } from '../../lib/appwrite';
import { toastSuccess, toastWarning } from './Toast';
import { useItems } from '../store';

function CheckoutModal({open, handleClose, cartItems, totalCost}) {

    const clearCartItems = useItems((state) => state.clearCartItems)

    const checkoutForm = [
        {id: 'fullName', placeholder: 'Full Name', type: 'text'},
        {id: 'phone', placeholder: 'Phone Number', type: 'tel'},
        {id: 'city', placeholder: 'City', type: 'text'},
        {id: 'address', placeholder: 'House Address', type: 'text'}
    ]

    const handlePlaceOrder = () => {
        Promise.all(cartItems.map((item) => {
            updateCarItem(item.itemId, item.productCode, item.price, item.quantity - item.units).catch((err) => toastWarning(err))
        })).then(() => {
            clearCartItems()
            toastWarning('Updated items, didnt send order')
            handleClose()
        })
    }

    return (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Container className='checkoutModalCont'>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Checkout
                </Typography>
                <Container className='modalLeftCont'>
                    {cartItems && cartItems.map((item) => {
                        return (<CheckoutItemCard imageUrl={item.imageUrl} key={item.itemId} name={item.name} price={item.price} quantity={item.units} productCode={item.productCode}/>)
                    })}
                    {/**this uses cart.css */}
                    <Container className='totalCostCont'>
                        <p>Total cost:</p> <p className='totalCostValue'>${(Math.round(totalCost * 100)/100).toFixed(2)}</p>
                    </Container>
                </Container>
                <Container className='modalContRight'>
                    <Typography id="modal-modal-description" >
                        Fill out the checkout form.
                    </Typography>
                    <Container className='checkoutFormCont'>
                        {checkoutForm.map((field) => {
                            return (
                            <Container className='checkoutInputSingle' key={field.id}>
                                <label>{field.placeholder}</label>
                                <CustomInput type={field.type}/>
                            </Container>)
                        })}
                    </Container>
                    <CustomButton text='Place order' onClick={handlePlaceOrder}/>
                </Container>
                
                
                <CloseIcon className='closeBtnModal' onClick={handleClose}/>
            </Container>
          </Modal>
      );
}

export default CheckoutModal