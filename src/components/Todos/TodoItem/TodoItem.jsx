import React, { useEffect, useRef, useState } from 'react'
import './TodoItem.styles.css'
import checkIcon from '../../../assets/icons/check.png'

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
    <li className="List__items">
      <div className={!isEditing ? 'Item' : 'Item' + '  Item--isEdited'}>
        <div className="Box__value">
          <button className="Box__checkbox" onClick={handleComplete}>
            {todo.completed ? (
              <img src={checkIcon} className="Box__icon--isChecked" />
            ) : null}
          </button>
          {isEditing ? (
            <input
              ref={ref}
              onKeyUp={handleMouseUp}
              onChange={handleChangeLocalText}
              value={localText}
              className="Item__input--isEdited"
            />
          ) : (
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
              onDoubleClick={handleEdit}
            >
              {todo.text}
            </span>
          )}
        </div>
        {isEditing || (
          <button className="Item__button-isDeleted" onClick={handleRemove}>
            &#10060;
          </button>
        )}
      </div>
    </li>
  )
}

export default TodoItem
