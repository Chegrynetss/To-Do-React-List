import React from 'react'
import { useStyles } from './TodoStatus.styles'

interface TodoStatusProps {
  value: string
  onChange: (value: string) => void
  options: { value: string; name: string }[]
}

const TodoStatus = ({ value, onChange, options }: TodoStatusProps) => {
  const { classes } = useStyles()
  return (
    <div>
      {options.map((option) => (
        <button
          key={option.value}
          className={`${classes.button} ${
            value === option.value ? '--active' : ''
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
