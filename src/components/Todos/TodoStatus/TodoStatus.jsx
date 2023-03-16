import React from 'react'
import './TodoStatus.styles.css'

const TodoStatus = ({ value, onChange, options }) => {
  return (
    <div className="Footer__buttons--isDisplayed">
      {options.map((option) => (
        <button
          key={option.value}
          className={`Footer__button ${value === option.value ? 'Active' : ''}`}
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
