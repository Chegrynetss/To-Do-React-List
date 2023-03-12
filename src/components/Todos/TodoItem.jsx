import React, { useState } from 'react'

const TodoItem = ({ todo, onToggle, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleToggle = () => {
    onToggle(todo.id)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleRemove = () => {
    onRemove(todo.id)
  }

  return (
    <li>
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      <span
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      >
        {todo.text}
      </span>
      <button className="buttonDelete" onClick={handleRemove}>
        {' '}
        &#10060;{' '}
      </button>
      <button className="buttonEdit" onClick={handleEdit}>
        {' '}
        Edit{' '}
      </button>
    </li>
  )
}

export default TodoItem
