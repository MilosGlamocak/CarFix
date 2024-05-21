import React from 'react'
import { CircularProgress, Container } from '@mui/material'
import '../styles/LoadingAnimation.css'

function LoadingAnimation() {
  return (
    <Container className='loadingAnimationCont'>
      <CircularProgress className='loadingAnimation'/>
    </Container>
    
  )
}

export default LoadingAnimation