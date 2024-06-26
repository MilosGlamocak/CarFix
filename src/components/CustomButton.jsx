import React from 'react'
import '../styles/CustomButton.css'
import PropTypes from 'prop-types'

function CustomButton({width, height, text, onClick, border, color, backgroundColor, className, disabled}) {
  return (
    <button className={`customButton ${className}`}
        style={{
            width: width, height: height, border: border, color: color, backgroundColor: backgroundColor
        }} onClick={onClick} disabled={disabled}>
            {text}
    </button>
  )
}

CustomButton.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    onClick: PropTypes.func,
    border: PropTypes.string,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
}

export default CustomButton