import React from 'react'
import PropTypes from 'prop-types'
import '../styles/CustomInput.css'

function CustomInput({placeholder, id, onChange, width, color, backgroundColor, border, type, className, value}) {
  return (
    <input className={`customInput ${className}`}
        placeholder={placeholder} id={id} onChange={onChange} type={type}
        style={{
            width: width, color: color, backgroundColor: backgroundColor, border: border
        }}
        value={value}
    />
  )
}

CustomInput.propTypes = {
    placeholder: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
    width: PropTypes.string,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    border: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default CustomInput