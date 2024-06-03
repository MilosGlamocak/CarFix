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

function CheckoutModal({open, handleClose, cartItems, totalCost}) {

    const checkoutForm = [
        {id: 'fullName', placeholder: 'Full Name'},
        {id: 'city', placeholder: 'City'},
        {id: 'address', placeholder: 'House Address'}
    ]

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
                        return (<CheckoutItemCard imageUrl={item.imageUrl} key={item.id} name={item.name} price={item.price} quantity={item.units} productCode={item.productCode}/>)
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
                                <CustomInput/>
                            </Container>)
                        })}
                    </Container>
                    <CustomButton text='Place order'/>
                </Container>
                
                
                <CloseIcon className='closeBtnModal' onClick={handleClose}/>
            </Container>
          </Modal>
      );
}

export default CheckoutModal