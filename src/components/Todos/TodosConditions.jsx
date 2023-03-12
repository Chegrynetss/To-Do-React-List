import React from 'react'
import { TODO_STATUS } from './Todos.constants'

const TodosConditions = ({ value, onChange }) => {
  return (
    <div>
      <button
        className={`${value === TODO_STATUS.ALL ? 'Active' : ''}`}
        onClick={() => {
          onChange(TODO_STATUS.ALL)
        }}
      >
        All
      </button>
      <button
        className={`${value === TODO_STATUS.ACTIVE ? 'Active' : ''}`}
        onClick={() => {
          onChange(TODO_STATUS.ACTIVE)
        }}
      >
        Active
      </button>
      <button
        className={`${value === TODO_STATUS.COMPLETED ? 'Active' : ''}`}
        onClick={() => {
          onChange(TODO_STATUS.COMPLETED)
        }}
      >
        Completed
      </button>
    </div>
  )
}

export default TodosConditions
