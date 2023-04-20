import React, { useEffect, useRef, useState } from 'react'
import './TodoItem.styles.css'
import CheckMark from '../../Icons/CheckMark/CheckMark'
import { Todo } from 'types'

type TodoItemProps = {
  todo: Todo
  onEdit: (todo: Todo, onEditEnd?: () => void) => void
  onRemove: (id: string) => void
  className?: string
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onEdit,
  onRemove,
  className,
}) => {
  const [isEditing, setIsEditing] = useState(false)

  const [localText, setLocalText] = useState<string>(todo.text)

  const ref = useRef<HTMLInputElement>(null)

  const handleComplete = () => {
    onEdit({ ...todo, completed: !todo.completed })
  }

  const handleEdit = () => {
    setIsEditing(true)
    setTimeout(() => {
      ref.current?.focus()
    })
  }

  const handleChangeLocalText = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
    onEdit({ ...todo, text: localText }, () => {
      setIsEditing(false)
    })
  }

  const handleMouseUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSaveText()
    }
  }

  useEffect(() => {
    const handler = (event: MouseEvent) => {
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
    <li className={`TodoItem__list-items ${className ? className : ''}`}>
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
