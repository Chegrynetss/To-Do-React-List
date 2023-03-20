import React from 'react'
import './TodoStatus.styles.css'

const TodoStatus = ({ value, onChange, options }) => {
  return (
    <div className="TodoStatus">
      {options.map((option) => (
        <button
          key={option.value}
          className={`TodoStatus__button ${
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

export default TodoStatus
