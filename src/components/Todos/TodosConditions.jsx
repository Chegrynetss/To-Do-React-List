import React from 'react'

const TodosConditions = ({ value, onChange, options }) => {
  return (
    <div>
      {options.map((option) => (
        <button
          key={option.value}
          className={`${value === option.value ? 'Active' : ''}`}
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
