import React, { useEffect, useState } from 'react'
import { TODO_STATUS } from './Todos.constants'
import AddTodo from './AddTodo/AddTodo'
import TodoItem from './TodoItem/TodoItem'
import TodoStatus from './TodoStatus/TodoStatus'
import isAllChecked from '../../assets/icons/check-all.svg'
import isAllCheckedActive from '../../assets/icons/check-allActive.svg'
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
        <h1 className="Todos__title "> ToDo List </h1>
      </header>
      <div className="TodoItem__box">
        <div className="AddTodo__form">
          <button
            onClick={handleCheckAll}
            className="AddTodo__mark--isAllCompleted "
          >
            <img
              src={allChecked ? isAllCheckedActive : isAllChecked}
              width="25px"
              height="25px"
              onClick={() => setAllChecked(!allChecked)}
            />
          </button>
          <AddTodo onAdd={handleAdd} />
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
          <div className="TodoStatus__footer ">
            <span className="TodoStatus__button--isCounted">
              {completedTodosCount} Items left
            </span>
            <TodoStatus
              value={status}
              onChange={setStatus}
              options={[
                { name: 'All', value: TODO_STATUS.ALL },
                { name: 'Active', value: TODO_STATUS.ACTIVE },
                { name: 'Completed', value: TODO_STATUS.COMPLETED },
              ]}
            />
            <div className="TodoStatus__button--isCleared">
              {todosAreCompleted ? (
                <button
                  className="TodoStatus__button"
                  onClick={handleClearedTodos}
                >
                  Clear Completed
                </button>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Todos
