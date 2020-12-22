import React from 'react'
// Import style
import './style.css'

const SliderInput = ({ id, name, value, min, max, step, onChange }) => {
  return (
    <div className="slider-input">
      <input
        type="range"
        id={id}
        name={name}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
      {value}
    </div>
  )
}

export default SliderInput
