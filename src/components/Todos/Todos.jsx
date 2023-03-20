import React, { useEffect, useState } from 'react'
import { TODO_STATUS } from './Todos.constants'
import AddTodo from './AddTodo/AddTodo'
import TodoItem from './TodoItem/TodoItem'
import TodoStatus from './TodoStatus/TodoStatus'
import './Todos.styles.css'

const Todos = () => {
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState(TODO_STATUS.ALL)
  const [allChecked, setAllChecked] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const allTodosChecked = todos.every((todo) => todo.completed)
    setAllChecked(allTodosChecked)
  }, [todos])

  const handleAdd = (text) => {
    setTodos([...todos, { id: Date.now(), text }])
    setFormSubmitted(true)
  }

  const handleRemove = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleEdit = (newTodo) => {
    setTodos(todos.map((todo) => (todo.id === newTodo.id ? newTodo : todo)))
  }

  const completedTodosCount = todos.reduce(
    (acc, todo) => (!todo.completed ? acc + 1 : acc),
    0,
  )

  const todosAreCompleted = todos.some((todo) => todo.completed)

  const todosCheckOption = [
    { name: 'All', value: TODO_STATUS.ALL },
    { name: 'Active', value: TODO_STATUS.ACTIVE },
    { name: 'Completed', value: TODO_STATUS.COMPLETED },
  ]

  const handleCheckAll = () => {
    if (allChecked) {
      setTodos((prevTodo) =>
        prevTodo.map((todo) => ({ ...todo, completed: false })),
      )
    } else {
      setTodos((prevTodo) =>
        prevTodo.map((todo) => ({ ...todo, completed: true })),
      )
    }
  }

  const handleClearedTodos = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  const visibleTodos = todos.filter((todo) => {
    if (status === TODO_STATUS.ACTIVE) {
      return !todo.completed
    }
    if (status === TODO_STATUS.COMPLETED) {
      return todo.completed
    }
    return true
  })

  return (
    <div>
      <header className="Todos__header">
        <h1 className="Todos__title "> todos </h1>
      </header>
      <div className="TodoItem__box">
        <div className="AddTodo__form">
          <AddTodo
            onAdd={handleAdd}
            onToggleActive={todosAreCompleted}
            onToggleClick={handleCheckAll}
            showToggle={todos.length}
          />
        </div>
        {formSubmitted && (
          <ul className="TodoItem__box-section">
            {visibleTodos.map((todo) => (
              <TodoItem
                className="List__items"
                key={todo.id}
                todo={todo}
                onEdit={handleEdit}
                onRemove={handleRemove}
              />
            ))}
          </ul>
        )}
        {formSubmitted && (
          <div className="Todos__footer">
            <span className="Todos__button--count">
              {completedTodosCount} Items left
            </span>
            <TodoStatus
              value={status}
              onChange={setStatus}
              options={todosCheckOption}
            />
            <button
              className={`Todos__button--clear ${
                !todosAreCompleted ? 'Todos__button--clear--hidden' : ''
              }`}
              onClick={handleClearedTodos}
            >
              Clear Completed
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
export default Todos
