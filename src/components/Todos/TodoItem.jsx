import React, { useState } from 'react'
import './TodoStyles/TodoList.css'

const TodoItem = ({ todo, onEdit, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false)

  const [localText, setLocalText] = useState(todo.text)

  const handleComplete = () => {
    onEdit({ ...todo, completed: !todo.completed })
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleChangeLocalText = (event) => {
    setLocalText(event.target.value)
  }

  const handleRemove = () => {
    onRemove(todo.id)
  }

  const handleSaveText = () => {
    onEdit({ ...todo, text: localText })
    setIsEditing(false)
  }

  return (
<<<<<<< Updated upstream
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleComplete}
      />
      <span
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      >
        {todo.text}
      </span>
      <button className="buttonDelete" onClick={handleRemove}>
        &#10060;
      </button>
      <button className="buttonEdit" onClick={handleEdit}>
        Edit
      </button>
      {isEditing ? (
        <div>
          <input onChange={handleChangeLocalText} value={localText} />
          <button onClick={handleSaveText}> Save </button>
        </div>
      ) : null}
=======
    <li className="TodoList__item">
      <div className="Todo__Item">
        <input
          className="round input"
          type="checkbox"
          checked={todo.completed}
          onChange={handleComplete}
        />
        <span
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        >
          {todo.text}
        </span>
        <button className="button__Delete" onClick={handleRemove}>
          &#10060;
        </button>
        <button className="button__Edit" onClick={handleEdit}>
          Edit
        </button>
        {isEditing ? (
          <div>
            <input onChange={handleChangeLocalText} value={localText} />
            <button onClick={handleSaveText}> Save </button>
          </div>
        ) : null}
      </div>
>>>>>>> Stashed changes
    </li>
  )
}

export default TodoItem
