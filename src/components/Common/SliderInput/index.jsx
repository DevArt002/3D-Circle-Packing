import React from 'react'
// Import style
import './style.css'

const SliderInput = ({ id, name, value, min, max, step, onMouseUp }) => {
  return (
    <div className="slider-input">
      <input
        type="range"
        id={id}
        name={name}
        min={min}
        max={max}
        step={step}
        defaultValue={value}
        onMouseUp={onMouseUp}
      />
      {value}
    </div>
  )
}

export default SliderInput
