import React, { useState } from 'react'
import '../styles/ItemCard.css'
import { CircularProgress, Container } from '@mui/material'
import CustomButton from './CustomButton'
import CustomInput from './CustomInput'
import { useAuth, useItems } from '../store'
import { deleteItem, getAllItems, getAllCarItems, deleteCarItem, updateCarItem } from '../../lib/appwrite'
import LoadingAnimation from './LoadingAnimation'

function ItemCard({name, price, quantity, imageUrl, itemId, publisher, productCode}) {

  const { cartItems, addCartItem, clearCartItems } = useItems();

  let [inputValue, setInputValue] = useState({
    inputProductCode: productCode,
    inputPrice: price,
    inputQuantity: quantity
  })

  const [disabled, setDisabled] = useState(true)

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

  const handleChangeInput = (e) => {
    const {value, id} = e.target;
    setInputValue({...inputValue, [`input${id.charAt(0).toUpperCase() + id.slice(1)}`]: value});
    if (inputValue.inputPrice !== price || inputValue.inputProductCode !== productCode || inputValue.inputQuantity !== quantity) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }

  const handleUpdateItem = (e) => {
    updateCarItem(itemId, inputValue.inputProductCode, inputValue.inputPrice, parseFloat(inputValue.inputQuantity))
    .then(() => {
      setDisabled(true)
  })
  }


  const handleCancelUpdate = () => {
    setInputValue({
      inputProductCode: productCode,
      inputPrice: price,
      inputQuantity: quantity
    });
    setDisabled(true)
  }

 

  const itemInfo = [
    {title: 'Product Code: ', id: 'productCode', value: inputValue.inputProductCode, type: 'text', className: 'productCode'},
    {title: 'Price per Unit ($): ', id: 'price', value: inputValue.inputPrice, type: 'number', step: '0.01'},
    {title: 'In Stock: ', id: 'quantity', value: inputValue.inputQuantity, type: 'number'},
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
                      <>
                      <CustomInput id={item.id} value={item.value} className={`adminItemInput ${item.className}`} onChange={handleChangeInput} type={item.type} step={item.step}
                      />         
                      </>   
                    ): (<p className='cardInfoBold'>{item.value}</p>)}</Container>
                  )
                })}
                <Container className='cardInfoCont'><p className='cardInfo'>Added by: </p><p className='cardInfoBold'>{publisher}</p></Container>
                {label === 'admin' && (
                  <Container className='adminButtonCont'>
                    <CustomButton text='Update' className={`adminItemButton ${disabled && 'disabled'}`} onClick={handleUpdateItem} disabled={disabled}/>
                    <CustomButton text='Cancel' className={`adminItemButton cancel ${disabled && 'disabled'}`} onClick={handleCancelUpdate} disabled={disabled}/>
                  </Container>  
                )}
                
            </Container>
        </Container> 
        <Container className='cardContRight'>
            {label === 'admin' && (
              <>
              <CustomButton text={loading ? <CircularProgress style={{color: 'white', scale: '0.5'}} /> : 'Delete item'} border='1px solid #520909' onClick={handleDeleteItem} />
              </>      
            )}
            <p>Units: 1</p>
            <CustomButton text='Add to Cart' border='1px solid #365F22' onClick={handleAddItem}/>
        </Container>
    </Container>
  )
}

export default ItemCard