import React from 'react'
// Import custom components
import { RadioInput } from 'Components/Common'
// Import style
import './style.css'

const RadioInputGroup = ({ id, name, options, value, onChange }) => {
  return (
    <div className="radio-input-group" id={id} name={name}>
      {options.map((option, index) => (
        <RadioInput
          id={`${id}-option-${index}`}
          name={`${name}-option`}
          value={option.value}
          label={option.label}
          checked={value === option.value}
          onChange={onChange}
          key={`${name}-${index}`}
        />
      ))}
    </div>
  )
}

export default RadioInputGroup
