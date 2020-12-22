import React from 'react'
// Import style
import './style.css'

const RadioInput = ({ id, name, value, label, checked, onChange }) => {
  return (
    <label className="radio-input">
      <input type="radio" id={id} name={name} value={value} checked={checked} onChange={onChange} />
      {label}
    </label>
  )
}

export default RadioInput
