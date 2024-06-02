import React from 'react'
import { CircularProgress, Container } from '@mui/material'
import '../styles/LoadingAnimation.css'
import PropTypes from 'prop-types'

function LoadingAnimation({classname}) {
  return (
    <Container className={`loadingAnimationCont ${classname}`}>
      <CircularProgress className='loadingAnimation'/>
    </Container>
    
  )
}

LoadingAnimation.propTypes = {
  className: PropTypes.string
}
export default LoadingAnimation