import React from 'react'
import './TodoStatus.styles.css'

interface TodoStatusProps {
  value: string
  onChange: (value: string) => void
  options: { value: string; name: string }[]
}

const TodoStatus: React.FC<TodoStatusProps> = ({
  value,
  onChange,
  options,
}) => {
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
