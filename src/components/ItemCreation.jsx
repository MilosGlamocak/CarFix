import { Container, CircularProgress } from '@mui/material'
import React from 'react'
import '../styles/ItemCreation.css'
import { useState } from 'react'
import { createNewItem, createNewCarItem } from '../../lib/appwrite'
import CustomButton from '../components/CustomButton'
import { useAuth } from '../store'
import CustomInput from './CustomInput'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




function ItemCreation() {

  const [loading, setLoading] = useState(false)

  const {userId} = useAuth((state) => state)

    let [itemCred, setItemCred] = useState({
        name: '',
        imageUrl: '',
        price: '',
        quantity: '',
        category: 'Filters',
        productCode: ''
      })

    const handleUpdateItemCred = (e) => {
        const { id, value } = e.target;
        setItemCred({...itemCred, [id]: value}); 
    }

      const handleCreateNewCarItem = async () => {
        setLoading(true)
          createNewCarItem(
            itemCred.name,
            itemCred.imageUrl,
            parseFloat(itemCred.price),
            parseInt(itemCred.quantity),
            userId,
            itemCred.category,
            itemCred.productCode
          ).then(() => setItemCred({
            name: '',
          imageUrl: '',
          price: '',
          chamber: '',
          quantity: '',
          category: 'Filters'
          })).catch((error) => console.error(error)).finally(() => setLoading(false))
        }

      const handleCategoryChange = (e) => {
        setItemCred({ ...itemCred, category: e.target.value });
    };

      const inputFields = [
        {type: 'text', id: 'name', placeholder: 'Name', value: itemCred.name},
        {type: 'text', id: 'productCode', placeholder: 'Product Code', value: itemCred.productCode},
        {type: 'url', id: 'imageUrl', placeholder: 'Image Url', value: itemCred.imageUrl},
        {type: 'number', id: 'price', placeholder: 'Price', value: itemCred.price},
        {type: 'number', id: 'quantity', placeholder: 'Quantity', value: itemCred.quantity},
      ]

      const categories = ['Filters', 'Belts', 'Oil', 'Brakes', 'Livery', 'Electronics', 'Wheels', 'Suspension'];


  return (
    <Container className='itemCreationCont'>
        <h2>Create new item</h2>
        {inputFields.map((item) => {
            return  <CustomInput type={item.type} id={item.id} placeholder={item.placeholder} key={item.id} onChange={handleUpdateItemCred} value={item.value}/>
               
        })}
      <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth variant='filled' sx={{
        backgroundColor: '#141414',
        border: '1px solid #343434',
        borderRadius: '10px',
        overflow: 'hidden',
    }}>
        <InputLabel id="demo-simple-select-label" sx={{ color: 'white' }}>Category</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={itemCred.category}
            label="Category"
            onChange={handleCategoryChange}
            sx={{
                backgroundColor: '#141414',
                color: 'white',
                "&:hover": {
                    backgroundColor: '#343434',
                },
                '& .MuiSelect-icon': {
                    color: 'white',
                },
                '& .MuiSelect-root': {
                    height: '2.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0,  
                },
                '& .MuiSelect-select:focus': {
                    backgroundColor: '#141414',
                },
            }}
            MenuProps={{
              sx: {
                "&& .Mui-selected": {
                  backgroundColor: "#343434",
                }, 
                '&& .Mui-hover': {
                  backgroundColor: '#343434'
                }
              }
            }}
        >
            {categories.map((category) => (
                <MenuItem
                    value={category}
                    key={category}
                    sx={{
                        backgroundColor: '#141414',
                        '&:hover': {
                            backgroundColor: '#343434',
                        },
                        color: 'white',
                    }}
                >
                    {category}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
</Box>


        <CustomButton onClick={handleCreateNewCarItem} text={loading ? <CircularProgress style={{color: 'white', scale: '0.5'}} /> : 'Publish Item'}/>
    </Container>
  )
}

export default ItemCreation