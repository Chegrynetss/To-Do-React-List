import React, { useEffect, useRef, useState } from 'react'
import './TodoItem.styles.css'
import checkItem from '../../../assets/icons/check-item.svg'

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
            : 'TodoItem__item' + '  TodoItem__item--isEdited'
        }
      >
        <div className="TodoItem__box-value">
          <button className="TodoItem__checkbox" onClick={handleComplete}>
            {todo.completed ? (
              <img src={checkItem} className="TodoItem__icon--isChecked" />
            ) : null}
          </button>
          {isEditing ? (
            <input
              ref={ref}
              onKeyUp={handleMouseUp}
              onChange={handleChangeLocalText}
              value={localText}
              className="TodoItem__input--isEdited"
            />
          ) : (
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#d9d9d9' : 'inherit',
              }}
              onDoubleClick={handleEdit}
            >
              {todo.text}
            </span>
          )}
        </div>
        {isEditing || (
          <button
            className="TodoItem__button-isDeleted"
            onClick={handleRemove}
          ></button>
        )}
      </div>
    </li>
  )
}

export default TodoItem
