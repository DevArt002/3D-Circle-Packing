import React from 'react'
// Import style
import './style.css'

const CheckInput = ({ id, name, label, checked, onChange }) => {
  return (
    <label className="check-input">
      <input type="checkbox" id={id} name={name} checked={checked} onChange={onChange} />
      {label}
    </label>
  )
}

export default CheckInput
