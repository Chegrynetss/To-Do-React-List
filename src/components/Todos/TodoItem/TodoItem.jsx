import React, { useEffect, useRef, useState } from 'react'
import './TodoItem.styles.css'
import CheckMark from '../../Icons/CheckMark/CheckMark'

const TodoItem = ({ todo, onEdit, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [localText, setLocalText] = useState(todo.text)

  const ref = useRef(null)

  const handleComplete = () => {
    onEdit({ ...todo, completed: !todo.completed })
  }

  const handleEdit = () => {
    setIsEditing(true)
    setTimeout(() => {
      ref.current?.focus()
    })
  }

  const handleChangeLocalText = (event) => {
    setLocalText(event.target.value)
  }

  const handleRemove = () => {
    onRemove(todo.id)
  }

  const handleSaveText = () => {
    if (!localText) {
      onRemove(todo.id)
      return
    }
    onEdit({ ...todo, text: localText })
    setIsEditing(false)
  }

  const handleMouseUp = (event) => {
    if (event.key === 'Enter') {
      handleSaveText()
    }
  }

  useEffect(() => {
    const handler = (event) => {
      if (event.target !== ref.current && isEditing) {
        handleSaveText()
      }
    }
    document.addEventListener('click', handler)
    return () => {
      document.removeEventListener('click', handler)
    }
  }, [localText, isEditing])

  return (
    <li className="TodoItem__list-items">
      <div
        className={
          !isEditing
            ? 'TodoItem__item'
            : 'TodoItem__item' + '  TodoItem__item--editing'
        }
      >
        <div className="TodoItem__box-value">
          <button className="TodoItem__checkbox" onClick={handleComplete}>
            {todo.completed ? <CheckMark fill="#3cb371" /> : null}
          </button>
          {isEditing ? (
            <input
              ref={ref}
              onKeyUp={handleMouseUp}
              onChange={handleChangeLocalText}
              value={localText}
              className="TodoItem__input--editing TodoItem__item--editing"
              style={{ outline: 'none' }}
            />
          ) : (
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#d9d9d9' : 'inherit',
                userSelect: 'none',
              }}
              onDoubleClick={handleEdit}
            >
              {todo.text}
            </span>
          )}
        </div>
        {isEditing || (
          <button
            className="TodoItem__button-deleting"
            onClick={handleRemove}
          ></button>
        )}
      </div>
    </li>
  )
}

export default TodoItem
