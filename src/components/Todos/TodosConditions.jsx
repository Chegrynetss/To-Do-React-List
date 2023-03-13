import React from 'react'
import './TodoStyles/Footer.css'

const TodosConditions = ({ value, onChange, options }) => {
  return (
    <div>
      {options.map((option) => (
        <button
          key={option.value}
          className={`Footer Footer__filter${
            value === option.value ? 'Active' : ''
          }`}
          onClick={() => {
            onChange(option.value)
          }}
        >
          {option.name}
        </button>
      ))}
    </div>
  )
}

export default TodosConditions
